from RIO import RIO_GetCharRankings, RIO_GetRecentRuns
from updateMeta import NumberToClassColor, NumberToClassName, getColorForRunScore, getColorForScore
from datetime import datetime
from WOW import WOW_GetCharData, WOW_getRenderLink, getRender
from time import time
from operator import attrgetter
import fb

import logging


def updatePage(tourn):
    fb.prepTourn(tourn)
    runs = getRuns(tourn)
    fb.setTournRuns(tourn, runs)
    fb.updateUpdate(u'tdata',tourn)
    updateRosterData(tourn)
    if fb.getTournMeta['collectGraphs']:
        addHistoricalPoints(tourn, fb.getTournMeta['start-date'])


def getRuns(tourn) -> dict:
    runs = getAllRuns(tourn)

    AddScoreColors(runs)
    AddTimeAndPercDiff(runs)

    return runs


def AddScoreColors(runs):
    for runId, run in runs.items():
        runs[runId]['scoreColor'] = getColorForRunScore(run['score'])


def AddTimeAndPercDiff(runs):

    for runId, run in runs.items():
        runs[runId]['timeDiff'] = \
            run['clearTime'] - run['partime']
        runs[runId]['percDiff'] = \
            run['clearTime'] / run['partime'] - 1


def getAllRuns(tourn) -> dict:
    teams = fb.getTournTeams(tourn)
    params = fb.getTournMeta(tourn)
    returnValue = {}

    for teamId, team in teams.items():
        validRuns = {}

        for player in team['players']:
            for runId, run in getPlayerRuns(player['name'].lower(), player['realm'].lower()).items():
                if not isValidRun(runId, run, params):
                  continue
                if runId in validRuns.keys():
                    validRuns[runId]['count'] += 1
                else:
                    validRuns[runId] = run
                    validRuns[runId]['team'] = teamId
                    try:
                        validRuns[runId]['faction'] = player['faction']
                    except:
                        validRuns[runId]['faction'] = 'unknown'
                    validRuns[runId]['count'] = 1

        validRuns = removeNonFullTeamRuns(validRuns, params)
        returnValue = {**returnValue, **validRuns}

    return returnValue



def getPlayerRuns(name: str, realm: str) -> list:
    return RIO_GetRecentRuns(name, realm)


def isValidRun(id: str, run: object, pageParams: object):
    return isValidDate(run['dateCompleted'], pageParams['start-date'])
        # not isDuplicate(id, folder) and \
        


def removeNonFullTeamRuns(validRuns: object, pageParams: object):
    returnValue = {}
    for id, run in validRuns.items():
        if run['count'] < pageParams['players-required']:
            continue
        returnValue[id] = run
        returnValue[id].pop('count', None)

    return returnValue


def isValidDate(completeDate: str, pageStart: int) -> bool:
    return \
        datetime.strptime(completeDate, "%Y-%m-%dT%H:%M:%S.000Z") > \
        datetime.utcfromtimestamp(pageStart)


def updateAllColors(tourn):
    runData = fb.getTournRuns(tourn)
    for runId, run in runData['data'].items():
        runData['data'][runId]['scoreColor'] = getColorForRunScore(run['score'])

    fb.setTournRuns(tourn, runData)


def updateRosterData(tourn):

    runs, teams = attrgetter('runs', 'teams')(fb.getTournData(tourn))

    keyNums = getKeysCompleted(runs,teams)
    highKeys = getHighestKeys(runs,teams)

    for key, team in teams.items():
        team_score = 0
        team_ilvl = 0
        for i in range(len(team['players'])):
            name = team['players'][i]['name']
            realm = team['players'][i]['realm']

            rio_data = RIO_GetCharRankings(name, realm)
            char = WOW_GetCharData(name.lower(), realm.lower())
            renderLink = WOW_getRenderLink(realm.lower(), name.lower())
            try:
                char['faction']
            except:
                print(name, realm)
                continue

            if 'statusCode' not in rio_data.keys():
                rio_link = rio_data['profile_url']
                rio_score = rio_data['mythic_plus_scores_by_season'][0]['scores']['all']
                rio_scoreColor = getColorForScore(rio_score)
            else:
                rio_link = None
                rio_score = 0
                rio_scoreColor = '#ffffff'

            team_score += rio_score
            team_ilvl += char['average_item_level']

            try:
                title = char['active_title']['display_string'].replace(
                    r'{name}', name)
            except:
                title = name

            try:
                cov = char['covenant_progress']['chosen_covenant']['name']
                renown = char['covenant_progress']['renown_level']
            except:
                cov = None
                renown = None

            teams[key]['players'][i] = {
                **teams[key]['players'][i],
                'id': char['id'],
                'name': name,
                'realm': realm,
                'faction': char['faction']['name'],
                'class': char['character_class']['id'],
                'className': NumberToClassName[char['character_class']['id']],
                'classColor': NumberToClassColor[char['character_class']['id']],
                'race': char['race']['id'],
                'level': char['level'],
                'title': title,
                'ilvl': char['average_item_level'],
                'score': rio_score,
                'scoreColor': rio_scoreColor,
                'covenant': cov,
                'renown': renown,
                'render': renderLink,
                'links': {
                    'rio': rio_link,
                    'armory': f'https://worldofwarcraft.com/en-us/character/us/{realm}/{name}',
                    'wcl': f'https://www.warcraftlogs.com/character/us/{realm}/{name}',
                    'rbot': f'https://www.raidbots.com/simbot/quick?region=us&realm={realm}&name={name}'
                }
            }

        teams[key] = {
            **teams[key],
            'score': round(team_score, 2),
            'scoreColor': getColorForScore(team_score/len(team['players'])),
            'avgilvl': round(team_ilvl/len(team['players']), 2),
            'highestkey': {
                **highKeys[key]
            },
            'numkeys': keyNums[key]
        }

    fb.setTournTeams(tourn, teams)


def getKeysCompleted(runs,teams):

    runObj = {}
    for id, _ in teams.items():
        runObj[id] = 0

    for _, run in runs['data'].items():
        runObj[run['team']] += 1

    return runObj


def getHighestKeys(runs, teams):

    highKeyObj = {}
    for tid, _ in teams.items():
        highKeyObj[tid] = {'key': 0, 'per': 0, 'str': 'none'}

    for _, run in runs['data'].items():
        if (run['keyMod'] == 0):
            continue
        if (highKeyObj[run['team']]['key'] < run['keystoneLevel']) or \
           (highKeyObj[run['team']]['key'] == run['keystoneLevel'] and abs(highKeyObj[run['team']]['per']) < abs(run['percDiff'])):

            highKeyObj[run['team']] = {
                'key': run['keystoneLevel'],
                'per': run['percDiff'],
                'dung': run['dungeonAbbr'],
                'link': run['url'],
                'str': f'{run["keystoneLevel"]} {run["dungeonAbbr"]} ({round(abs(run["percDiff"]*100),2)}%)'
            }

    return highKeyObj


def addHistoricalPoints(tourn, start):

  hist, teams = attrgetter('hist', 'teams')(fb.getTournData(tourn))


  cday = (time()-start)/86400
  ilvlobj = {"day": cday}
  scoreobj = {"day": cday}

  for key, item in teams.items():
      ilvlobj[key] = item["avgilvl"]
      scoreobj[key] = item["score"]

  hist['ilvl'].append(ilvlobj)
  hist['tscore'].append(scoreobj)

  fb.setTournHist(tourn, hist)


def getFullRawRender(realm, name):
    return getRender(realm, name)['assets'][4]
