import requests
from time import sleep
import json
from logging import root, warn
from re import findall

def RIO_GetCharData(name: str, realm, fields: str = ""):
  url = "https://raider.io/api/v1/characters/profile"

  querystring = {"region":"us","realm":realm.lower(),"name":name.lower(),"fields":fields}

  payload = ""
  try: 
    response = requests.request("GET", url, data=payload, params=querystring)
  except:
    return {}

  if response.status_code != 200:
    if response.status_code == 400: return {}
    warn(f'Error code: {response.status_code} with response {response.text}')
    if response.status_code in [429, 502]: 
      sleep(30)
      return RIO_GetCharData(name, realm, fields)

  try: data = json.loads(response.text)
  except: 
    warn("Cannot get RIO Char data")
    sleep(30)
    return RIO_GetCharData(name, realm, fields)
  
  return data


def RIO_GetRecentRuns(name: str, realm: str):
  RIO_Data = RIO_GetCharData(name, realm, "mythic_plus_recent_runs")

  if not 'mythic_plus_recent_runs' in RIO_Data.keys():
    warn(f'{name}-{realm} doesnt have any recent m+ runs')
    return {}
  
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
      'keyMod': run['num_keystone_upgrades'],
      'faction': RIO_Data['faction'],
      'partime': run['par_time_ms']
    }
  
  return returnValue

def RIO_GetColorData():
  url = "https://raider.io/api/v1/mythic-plus/score-tiers"

  payload = ""
  response = requests.request("GET", url, data=payload)

  if error(response): return RIO_GetColorData()

  try: data = json.loads(response.text)
  except:
    if response.status_code == 400: return {}
    warn("Cannot get RIO color data")
    sleep(30)
    return RIO_GetColorData()
  
  return data

def RIO_GetCharRankings(name,realm):
  return RIO_GetCharData(name, realm, 'mythic_plus_scores_by_season:current')


def error(response):
  if response.status_code != 200:
    warn(f'Error code: {response.status_code}')
    sleep(30)
    return True
  return False
