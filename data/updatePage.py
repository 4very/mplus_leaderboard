from json import dump, load
from os.path import join, realpath, dirname, isdir
from os import getcwd, mkdir
from RIO import RIO_GetCharRankings, RIO_GetRecentRuns
from updateMeta import NumberToClassColor, NumberToClassName, getColorForRunScore, getColorForScore, getDungeonTimings, updateTimeFile
from datetime import datetime
from WOW import WOW_GetCharData, WOW_getRenderLink, getRender
from time import time

import logging


def updatePage(folder: str, pageParams: dict):
    makeFiles(folder)
    runs = getRuns(folder, pageParams)
    writeRunsToFile(runs, folder)
    updateTimeFile(folder)
    updateRosterData(folder)
    if pageParams['collectGraphs']:
        addHistoricalPoints(folder, pageParams['start-date'])


def makeFiles(folder):
    if not isdir(join(folder, 'runs.json')):
        with open(join(folder, 'runs.json'), 'w') as f:
            dump({'data': {}}, f, indent=2)


def writeRunsToFile(runs: dict, folder: str):
    runsFile = join(folder, 'runs.json')

    with open(runsFile, 'r') as f:
        jsonData = load(f)

    jsonData['data'] = {**jsonData['data'], **runs}

    with open(runsFile, 'w') as f:
        dump(jsonData, f, indent=2)
        logging.info(f'Wrote {len(runs)} new runs to file')


def getRuns(folder: str, pageParams: dict) -> dict:
    runs = getAllRuns(folder, pageParams)

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


def getAllRuns(folder: str, pageParams: dict) -> dict:
    teams = getTeams(folder)
    returnValue = {}

    for teamId, team in teams.items():
        validRuns = {}

        for player in team['players']:
            for runId, run in getPlayerRuns(player['name'].lower(), player['realm'].lower()).items():
              # if isValidRun(runId, run, folder, pageParams): TODO
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

        validRuns = removeNonFullTeamRuns(validRuns, pageParams)
        returnValue = {**returnValue, **validRuns}

    return returnValue


def getTeams(folder: str) -> dict:
    with open(join(folder, 'teams.json'), 'r') as f:
        return load(f)


def dumpTeams(folder: str, teamData: object) -> dict:
    with open(join(folder, 'teams.json'), 'w') as f:
        return dump(teamData, f, indent=2, ensure_ascii=False)


def getRunsFromFile(folder: str) -> dict:
    with open(join(folder, 'runs.json'), 'r') as f:
        return load(f)


def getPlayerRuns(name: str, realm: str) -> list:
    return RIO_GetRecentRuns(name, realm)


def isValidRun(id: str, run: object, folder: str, pageParams: object):
    return \
        not isDuplicate(id, folder) and \
        isValidDate(run['dateCompleted'], pageParams['start-date'])


def removeNonFullTeamRuns(validRuns: object, pageParams: object):
    returnValue = {}
    for id, run in validRuns.items():
        if run['count'] < pageParams['players-required']:
            continue
        returnValue[id] = run
        returnValue[id].pop('count', None)

    return returnValue


def isDuplicate(id: str, folder: str) -> bool:
    with open(join(folder, 'runs.json'), 'r') as f:
        jsonData = load(f)

    return str(id) in jsonData['data'].keys()


def isValidDate(completeDate: str, pageStart: int) -> bool:
    return \
        datetime.strptime(completeDate, "%Y-%m-%dT%H:%M:%S.000Z") > \
        datetime.utcfromtimestamp(pageStart)


def updateAllColors(folder: str):
    with open(join(folder, 'runs.json'), 'r') as f:
        jsonData = load(f)

    for runId, run in jsonData['data'].items():
        jsonData['data'][runId]['scoreColor'] = getColorForRunScore(
            run['score'])

    with open(join(folder, 'runs.json'), 'w') as f:
        dump(jsonData, f, indent=2)


def updateRosterData(folder):

    teams = getTeams(folder)

    keyNums = getKeysCompleted(folder)
    highKeys = getHighestKeys(folder)

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

    dumpTeams(folder, teams)


def getKeysCompleted(folder):
    runs = getRunsFromFile(folder)
    teams = getTeams(folder)

    runObj = {}
    for id, _ in teams.items():
        runObj[id] = 0

    for _, run in runs['data'].items():
        runObj[run['team']] += 1

    return runObj


def getHighestKeys(folder):
    runs = getRunsFromFile(folder)
    teams = getTeams(folder)

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


def addHistoricalPoints(folder, start):
    with open(join(folder, 'teams.json'), 'r') as f:
        teams = load(f)

    with open(join(folder, 'historical.json'), 'r') as f:
        hist = load(f)

    cday = (time()-start)/86400
    ilvlobj = {"day": cday}
    scoreobj = {"day": cday}

    for key, item in teams.items():
        ilvlobj[key] = item["avgilvl"]
        scoreobj[key] = item["score"]

    hist['ilvl'].append(ilvlobj)
    hist['tscore'].append(scoreobj)

    with open(join(folder, 'historical.json'), 'w') as f:
        dump(hist, f, indent=2)


def getFullRawRender(realm, name):
    return getRender(realm, name)['assets'][4]
