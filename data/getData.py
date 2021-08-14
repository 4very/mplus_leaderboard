import requests
import json
import csv
import datetime
import os
import pytz as tz
import pandas as pd
from time import sleep

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

def RIO_GetCharData(name: str, realm: str)-> dict:
  url = "https://raider.io/api/v1/characters/profile"

  querystring = {"region":"us","realm":realm.lower(),"name":name.lower(),"fields":"mythic_plus_recent_runs"}

  payload = ""
  response = requests.request("GET", url, data=payload, params=querystring)

  try: data = json.loads(response.text)
  except: 
    print("Cannot get Data, trying again in 30 seconds")
    sleep(30)
    return RIO_GetCharData(name, realm)
  
  return data

def RIO_GetRecentRuns(name: str, realm: str)-> list:

  total_data = RIO_GetCharData(name, realm)
  return_value = []

  if not 'mythic_plus_recent_runs' in total_data.keys():
    print(name,realm)
  else: 
    for run in total_data['mythic_plus_recent_runs']:
      return_value.append({
        'url': run['url'],
        'DungeonName': run['dungeon'],
        'DungeonShortName': run['short_name'],
        'Score': run['score'],
        'MythicLevel': run['mythic_level'],
        'ClearTime': run['clear_time_ms'],
        'CompleteDateTime': run['completed_at'],
        'NumKeystoneUpdateds': run['num_keystone_upgrades']
      })

  return return_value


def joinRuns(members: list):
  
  member_runs = []
  for member in members:
    member_runs.append(RIO_GetRecentRuns(*member.split("-")))
  
  return_value = []

  dictvalues = {}
  run_urls = []

  for member_run in member_runs:
    for run in member_run:
      run_urls.append(run['url'])
      dictvalues[run['url']] = run
  
  data = pd.Series(run_urls).value_counts()

  for key,val in data.iteritems():
    if val < 4: continue
    dictvalues[key]['full'] = val == 5
    return_value.append(dictvalues[key])

  return return_value

def getTeamInformation():
  teams_file = open(os.path.join(__location__, 'teams.csv'),'r')
  teams_file_csv = csv.reader(teams_file)

  info = []

  for line in teams_file_csv:
    info.append(line)
  
  teams_file.close()
  return info

def removeDupes(runs: list):

  runs = removeBefore(runs)

  runs_file = open(os.path.join(__location__, 'runs.csv'),'r')
  runs_file_csv = csv.reader(runs_file)
  runsInFile = []
  for line in runs_file_csv: runsInFile.append(line[1])
  runs_file.close()

  return_value = []

  for run in runs:
    if not any(url == run['url'] for url in runsInFile): return_value.append(run)

  
  return return_value

def removeBefore(runs: list):

  startDate: datetime.datetime = datetime.datetime.strptime("2021-08-10T15:00:00.000Z", "%Y-%m-%dT%H:%M:%S.000Z")
  
  return_value: list = []

  for run in runs:
    if datetime.datetime.strptime(run['CompleteDateTime'], "%Y-%m-%dT%H:%M:%S.000Z") > startDate:
      return_value.append(run)

  return return_value

def addInformationToFile(checkedRuns: list, teamName: str):

  runs_file = open(os.path.join(__location__, 'runs.csv'),'a')
  runs_file_csv = csv.writer(runs_file)

  written = 0

  for checkedRun in checkedRuns:
    run_list: list = list(checkedRun.values())
    written += runs_file_csv.writerow([teamName, *run_list, False, None])

  runs_file.close()
  return written

def writeTeamInformation():

  teamInfo = getTeamInformation()

  written = 0

  for row in teamInfo:
    written += addInformationToFile(removeDupes(joinRuns(row[1:6])),row[0])
  
  return written

def writeDateToFile():
  dateFile = open(os.path.join(__location__, 'upDATES.csv'),'w')
  

  dateFile.write(datetime.datetime.now(tz=tz.timezone('America/New_York')).strftime("%A, %B %d at %H:%M:%S EDT"))

  dateFile.close()

def updateMaxScores():

  teams_file = open(os.path.join(__location__, 'teams.csv'),'r')
  teams_file_csv = csv.reader(teams_file)

  bestFile = open(os.path.join(__location__, 'topRuns.csv'),'w')
  bestFileCsv = csv.writer(bestFile)

  for line in teams_file_csv:

    teamId = line[0]
    best = []

    runsFile = open(os.path.join(__location__, 'runs.csv'),'r')
    runsFileCsv = csv.reader(runsFile)

    for line2 in runsFileCsv:
      if teamId == line2[0] and (best == [] or line2[4] > best[4]):
          best = line2

    if best == []:
      best = [teamId, None, None, None, None, None, None, None, None, None,]
    
    bestFileCsv.writerow(best)
    runsFile.close()

  teams_file.close()
  bestFile.close()

def getTeamScores():

  teamInfo = getTeamInformation()
  
  teams_file = open(os.path.join(__location__, 'teams.csv'),'w')
  teams_file_csv = csv.writer(teams_file)

  for i in range(len(teamInfo)):
    teamScore = 0
    for player in teamInfo[i][1:6]:
      data = RIO_getRankingInfo(*player.split("-"))
      teamScore += data["mythic_plus_scores_by_season"][0]["scores"]['all']
    teams_file_csv.writerow([*teamInfo[i][0:6], round(teamScore), None])

def RIO_getRankingInfo(name: str, realm: str):
  url = "https://raider.io/api/v1/characters/profile"

  querystring = {"region":"us","realm":realm.lower(),"name":name.lower(),"fields":"mythic_plus_scores_by_season:current"}

  payload = ""
  response = requests.request("GET", url, data=payload, params=querystring)

  try: data = json.loads(response.text)
  except: 
    print("Cannot get Data, trying again in 30 seconds")
    sleep(30)
    return RIO_getRankingInfo(name, realm)
  
  return data


def RIO_getColoring():
  url = "https://raider.io/api/v1/mythic-plus/score-tiers"

  payload = ""
  response = requests.request("GET", url, data=payload)

  try: data = json.loads(response.text)
  except: 
    print("Cannot get Data, trying again in 30 seconds")
    sleep(30)
    return RIO_getColoring()
  
  return data


def coloringToFile():

  coloringData = RIO_getColoring()


  coloringFile = open(os.path.join(__location__, 'coloring.csv'),'w')
  coloringFileCSV = csv.writer(coloringFile)


  for value in coloringData:
    coloringFileCSV.writerow([value['score'], value['rgbHex'], None])
  
  coloringFile.close()



if __name__ == '__main__':
  getTeamScores()
  coloringToFile()
  print(writeTeamInformation())
  updateMaxScores()
  writeDateToFile()
