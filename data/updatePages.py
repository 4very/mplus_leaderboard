import json
import time
from os.path import join, realpath, dirname
from os import getcwd

from updatePage import updateAllColors, updatePage


__location__ = realpath(join(getcwd(), dirname(__file__)))
jsonPath = join(__location__, 'pages.json')


def getListofPages():
  with open(jsonPath,'r') as f:
    return json.load(f)


def updatePages():
  data = getListofPages()
  for slug, page in data.items():

    # if the tournament is over or hasnt started
    if  time.time() > page['end-date'] or \
        time.time() < page['start-date']: continue 

    pageFolder = join(__location__,'pages',slug)
    updatePage(pageFolder, page)


def updateGuild():
  #TODO
  return



if __name__ == '__main__':
  updatePages()
  updateGuild()
