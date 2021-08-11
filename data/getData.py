import requests
import json
import csv
import datetime
import os
import croniter
import pytz as tz
import pandas as pd

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

def RIO_GetCharData(name: str, realm: str)-> dict:
  url = "https://raider.io/api/v1/characters/profile"

  querystring = {"region":"us","realm":realm.lower(),"name":name.lower(),"fields":"mythic_plus_recent_runs"}

  payload = ""
  response = requests.request("GET", url, data=payload, params=querystring)

  data = json.loads(response.text)
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
    return_value.append(dictvalues[key])
    
  # print(data.value_counts())

  # for member1_run in member_runs[0]:
  #   url = member1_run['url']
  #   for rest_member_run in member_runs[1:]:
  #     if not any(itr['url'] == url for itr in rest_member_run):
  #       url = ''
  #       break
  #   if url!='': return_value.append(member1_run)

  
  return return_value

def getTeamInformation():
  teams_file = open(os.path.join(__location__, 'teams.csv'),'r')
  teams_file_csv = csv.reader(teams_file)

  written = 0

  for row in teams_file_csv:
    written += addInformationToFile(removeDupes(joinRuns(row[1:6])),row[0])
  
  return written

def removeDupes(runs: list):

  runs = removeBefore(runs)

  runs_file = open(os.path.join(__location__, 'runs.csv'),'r')
  runs_file_csv = csv.reader(runs_file)
  return_value = []

  for run in runs:
    if not any(row[1] == run['url'] for row in runs_file_csv): return_value.append(run)

  runs_file.close()
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
    written += runs_file_csv.writerow([teamName, *run_list])

  runs_file.close()
  return written

def writeDateToFile():
  dateFile = open(os.path.join(__location__, 'upDATES.csv'),'w')
  

  dateFile.write(datetime.datetime.now(tz=tz.timezone('America/New_York')).strftime("%A, %B %d at %H:%M:%S %Z"))
  dateFile.write("\n")
  dateFile.write(datetime.datetime.fromtimestamp(croniter.croniter(r'0 0-23 * * *', datetime.datetime.now()).get_next(), tz=tz.timezone('UTC'))
    .replace(tzinfo=tz.timezone('America/New_York')).strftime("%A, %B %d at %H:%M:%S EDT"))
  
  


  dateFile.close()

if __name__ == '__main__':
  print(getTeamInformation())
  writeDateToFile()
