from requests import request, post
from json import loads
from time import sleep
from logging import error, warn
from os import environ



def WOW_getGuildRoster():
  return [*getRoster('illidan','currently-online')['members'],*getRoster('sargeras','currently-online')['members']]


def getRoster(realm, slug):
  url = f'https://us.api.blizzard.com/data/wow/guild/{realm}/{slug}/roster'

  querystring = {"namespace":"profile-us","locale":"en_US","access_token":getAccessToken()}

  payload = ""
  try: 
    response = request("GET", url, data=payload, params=querystring)
    data = loads(response.text)
  except: 
    warn("Cannot get WOW Roster Data")
    sleep(30)
    return getRoster(realm, slug)

  return data

def getAccessToken():

  data = {
    'grant_type': 'client_credentials'
  }

  

  try: 
    response = post('https://us.battle.net/oauth/token', data=data, auth=getCredentials())
    data = loads(response.text)
  except: 
    warn("Cannot get WOW AccessToken")
    sleep(30)
    return getAccessToken()

  return data['access_token']


def getCredentials():
  client_id = environ.get('WOW_CLIENT_ID')
  client_secret = environ.get('WOW_CLIENT_SECRET')
  if client_id == None or client_secret == None: 
    error("wow client id and secret dont exit in os enviroment")
    return
  return (environ.get('WOW_CLIENT_ID'),environ.get('WOW_CLIENT_SECRET'))

def WOW_GetCharData(name, realm):
  url = f'https://us.api.blizzard.com/profile/wow/character/{realm}/{name}'

  querystring = {"namespace":"profile-us","locale":"en_US","access_token":getAccessToken()}

  payload = ""

  try: 
    response = request("GET", url, data=payload, params=querystring)
    data = loads(response.text)
  except: 
    warn("Cannot get WOW Roster Data")
    sleep(30)
    return getRoster(name, realm)

  return data



if __name__ == '__main__':
  print(WOW_GetCharData('asteraoth','illidan'))
