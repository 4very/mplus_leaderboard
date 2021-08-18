import json
from os.path import join, realpath, dirname
from os import getcwd
from RIO import RIO_GetRecentRuns
from updateMeta import updateTimeFile
from datetime import datetime
import logging

def updatePage(folder: str, pageParams: dict):
  runs = getRuns(folder, pageParams)
  writeRunsToFile(runs, folder)
  updateTimeFile(folder)

def writeRunsToFile(runs: dict, folder: str):
  runsFile = join(folder, 'runs.json')

  with open(runsFile, 'r') as f:
    jsonData = json.load(f)

  jsonData['data'] = {**jsonData['data'], **runs}
  
  with open(runsFile, 'w') as f:
    json.dump(jsonData, f, indent=2)
    logging.info(f'Wrote {len(runs)} new runs to file')


def getRuns(folder: str, pageParams: dict) -> dict:
  runs = getAllRuns(folder, pageParams)
  
  metaFolder = join(realpath(join(getcwd(), dirname(__file__))),"meta")
  addScoreColors(runs, metaFolder)
  addTimeAndPercDiff(runs, metaFolder)

  return runs

def addScoreColors(runs, folder):
  with open(join(folder,'coloring.json'),'r') as f:
    jsonData = json.load(f)
  
  for runId, run in runs.items():
    for score, color in jsonData.items():
      if int(score)/16.0 > run['score']:
        runs[runId]['color'] = color
  
def addTimeAndPercDiff(runs,folder):
  with open(join(folder,'dungeontimers.json'),'r') as f:
    jsonData = json.load(f)

  for runId, run in runs.items():
    runs[runId]['timeDiff'] = run['clearTime'] - jsonData[run['dungeonAbbr']]
    runs[runId]['percDiff'] = run['clearTime'] / jsonData[run['dungeonAbbr']] - 1
    

def getAllRuns(folder: str, pageParams: dict) -> dict:
  teams = getTeams(folder)
  returnValue = {}

  for teamId, team in teams.items():
    validRuns = {}

    for player in team['players']:
      for runId, run in getPlayerRuns(*player.split("-")).items():
        # if isValidRun(runId, run, folder, pageParams): 
          if runId in validRuns.keys(): 
            validRuns[runId]['count'] += 1
          else:
            validRuns[runId] = run
            validRuns[runId]['team'] = teamId
            validRuns[runId]['count'] = 1
          
    validRuns = removeNonFullTeamRuns(validRuns, pageParams)
    returnValue = {**returnValue, **validRuns}
  
  return returnValue
    

def getTeams(folder: str) -> dict:
  with open(join(folder,'teams.json'),'r') as f: return json.load(f)

def getPlayerRuns(name: str, realm: str) -> list:
  return RIO_GetRecentRuns(name, realm)

def isValidRun(id: str, run: object, folder: str, pageParams: object):
  return \
    not isDuplicate(id, folder) and \
        isValidDate(run['dateCompleted'], pageParams['start-date'])

def removeNonFullTeamRuns(validRuns: object, pageParams: object):
  returnValue = {}
  for id, run in validRuns.items():
    if run['count'] < pageParams['players-required']: continue
    returnValue[id] = run
    returnValue[id].pop('count', None)
  
  return returnValue


def isDuplicate(id: str, folder: str) -> bool:
  with open(join(folder,'runs.json'), 'r') as f: 
    jsonData = json.load(f)

  return str(id) in jsonData['data'].keys()

def isValidDate(completeDate: str, pageStart: int) -> bool:
  return \
      datetime.strptime(completeDate, "%Y-%m-%dT%H:%M:%S.000Z") > \
      datetime.utcfromtimestamp(pageStart)