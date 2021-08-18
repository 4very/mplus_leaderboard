import requests
from time import sleep
import json
import logging
from re import findall

def RIO_GetCharData(name: str, realm, fields: str = ""):
  url = "https://raider.io/api/v1/characters/profile"

  querystring = {"region":"us","realm":realm.lower(),"name":name.lower(),"fields":fields}

  payload = ""
  response = requests.request("GET", url, data=payload, params=querystring)

  try: data = json.loads(response.text)
  except: 
    print("Cannot get Data, trying again in 30 seconds")
    sleep(30)
    return RIO_GetCharData(name, realm)
  
  return data


def RIO_GetRecentRuns(name: str, realm: str):
  RIO_Data = RIO_GetCharData(name, realm, "mythic_plus_recent_runs")

  if not 'mythic_plus_recent_runs' in RIO_Data.keys():
    logging.error(f'{name}-{realm} doesnt have any recent m+ runs')
    return
  
  returnValue = {}
  for run in RIO_Data['mythic_plus_recent_runs']:
    id = findall(r'\/(\d*?)-',run['url'])[0]
    returnValue[id] = {
      'url': run['url'],
      'dunegonName': run['dungeon'],
      'dungeonAbbr': run['short_name'],
      'score': run['score'],
      'keystoneLevel': run['mythic_level'],
      'clearTime': run['clear_time_ms'],
      'dateCompleted': run['completed_at'],
      'keyMod': run['num_keystone_upgrades']
    }
  
  return returnValue

def RIO_GetColorData():
  url = "https://raider.io/api/v1/mythic-plus/score-tiers"

  payload = ""
  response = requests.request("GET", url, data=payload)

  try: data = json.loads(response.text)
  except: 
    print("Cannot get Data, trying again in 30 seconds")
    sleep(30)
    return RIO_GetColorData()
  
  return data







  
