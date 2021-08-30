import json
import time
from datetime import date, timedelta, datetime
from logging import DEBUG, basicConfig, INFO, root
from os.path import join, realpath, dirname, exists, isdir
from os import getcwd, mkdir
from sys import argv
from math import ceil

from updatePage import updateAllColors, updatePage
from updateGuild import UpdateGuildRoster, UpdateGuildRuns, PrepFolder
from updateMeta import updateAllMeta



__location__ = realpath(join(getcwd(), dirname(__file__)))
jsonPath = join(__location__, 'pages.json')


def getListofPages():
  with open(jsonPath,'r') as f: return json.load(f)


def updatePages():
  for slug, page in getListofPages().items():

    # if the tournament is over or hasnt started
    if  time.time() > page['end-date'] or \
        time.time() < page['start-date']: continue 

    pageFolder = join(__location__,'pages','t',slug)
    updatePage(pageFolder, page)


def updateGuild():

  startTuesday = 1628607600
  now = int(time.time())

  weekNumber = ceil((now - startTuesday)/604800)
  startDate = now - ((now - startTuesday) % 604800)
  endDate = startDate + 604800

  lastWeekNumber = weekNumber - 1
  lastWeekStartDate = startDate - 604800
  lastWeekEndDate = startDate

  rootFolder = join(__location__,'pages','g')
  rosterFile = join(rootFolder,'roster.json')

  UpdateGuildRoster(rosterFile)

  lastWeekFolder = join(rootFolder,str(lastWeekNumber))
  PrepFolder(lastWeekFolder, lastWeekStartDate, lastWeekEndDate, lastWeekNumber)
  UpdateGuildRuns(lastWeekFolder,rosterFile,lastWeekStartDate,lastWeekEndDate)

  weekFolder = join(rootFolder,str(weekNumber))
  PrepFolder(weekFolder, startDate, endDate, weekNumber)
  UpdateGuildRuns(weekFolder,rosterFile,startDate,endDate)
  
  return




if __name__ == '__main__':

  if '--info' in argv: 
    root.setLevel(INFO)
    basicConfig(level=INFO)
  elif '--debug' in argv: basicConfig(level=DEBUG)
  if '--guild' in argv: updateGuild()
  if '--meta' in argv: updateAllMeta()
  if '--pages' in argv: updatePages()
  
