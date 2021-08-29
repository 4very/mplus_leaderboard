from time import strftime
from json import dump, load
from logging import info
from os.path import join, exists
from os import mkdir
from datetime import datetime, timedelta
from requests.api import get
import pytz

from WOW import WOW_getGuildRoster
from RIO import RIO_GetRecentRuns
from updatePage import AddScoreColors, AddTimeAndPercDiff
from updateMeta import updateTimeFile



def UpdateGuildRoster(rosterfile):
  guildData = WOW_getGuildRoster()
  writeObj = {}

  for member in guildData:
    char = member['character']

    if char['level'] == 60:

      writeObj[char['id']] = {
        'name': char['name'],
        'realm': char['realm']['slug'],
        'class': char['playable_class']['id'],
        'race': char['playable_race']['id'],
        'rank': member['rank']
      }
  
  with open(rosterfile,'w') as f:
    dump(writeObj, f, indent=2)
  info("updated guild roster")
  


def UpdateGuildRuns(folder, roster, startDate, endDate):

  rosterData = getRosterData(roster)
  runData = getAllRuns(rosterData)
  runData = removeInvalid(runData, startDate, endDate)

  AddScoreColors(runData)
  AddTimeAndPercDiff(runData)

  runsFile = join(folder, 'runs.json')
  if exists(runsFile):
    with open(runsFile,'r') as f:
      oldRunData = load(f)
  else:
    oldRunData = {'data': {}}
  
  oldRunData['data'] = {**oldRunData['data'], **runData}

  with open(join(folder,'runs.json'),'w') as f:
    dump(oldRunData, f, indent=2)

  updateTimeFile(folder)
  return


def getRosterData(rosterFile):
  with open(rosterFile, 'r') as f:
    return load(f)


def getAllRuns(rosterData):

  retval = {}

  for id, member in rosterData.items():
    playerData = RIO_GetRecentRuns(member['name'], member['realm'])

    for runId, run in playerData.items():
      if runId in retval.keys():
        retval[runId]['members'].append(id)
        retval[runId]['count'] += 1
      else:
        retval[runId] = run
        retval[runId]['members'] = [id]
        retval[runId]['count'] = 1
  

  return retval


def removeInvalid(runs, start, end):

  retval = {}

  for runId, runData in runs.items():
    runDate = datetime.strptime(runData['dateCompleted'], "%Y-%m-%dT%H:%M:%S.000Z")
    startDate = datetime.utcfromtimestamp(start)
    endDate = datetime.utcfromtimestamp(end)

    if startDate < runDate and runDate < endDate and runData['count'] >= 2:
      retval[runId] = runData
  
  return retval
    
def suffix(d):
  return 'th' if 11<=d<=13 else {1:'st',2:'nd',3:'rd'}.get(d%10, 'th')


def PrepFolder(folder,start,end,weekNum):
  if not exists(folder):
    mkdir(folder)

  metaFile = join(folder,'meta.json')
  if exists(metaFile): return

  start = datetime.utcfromtimestamp(start) - timedelta(hours=5)
  end = datetime.utcfromtimestamp(end) - timedelta(hours=5)
  with open(metaFile, 'w') as f:
    dump({
      'num': weekNum,
      #11 am, Tuesday August 17th
      'start': start.strftime(f'%-I %P, %A %B %-d{suffix(start.day)}'),
      'end': end.strftime(f'%-I %P, %A %B %-d{suffix(end.day)}'),
    },f, indent=2)