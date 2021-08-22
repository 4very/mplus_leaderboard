import json
import time
from datetime import date, timedelta, datetime
from os.path import join, realpath, dirname
from os import getcwd
from math import ceil

from updatePage import updateAllColors, updatePage


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

  print(endDate)
  return




if __name__ == '__main__':
  updateGuild()
