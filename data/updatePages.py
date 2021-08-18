import os
import json
import time

from updatePage import updatePage


__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
jsonPath = os.path.join(__location__, 'pages.json')


#region update pages
def getListofPages():
  with open(jsonPath,'r') as f:
    return json.load(f)


def updatePages():
  data = getListofPages()
  for slug in data:
    page = data[slug]

    # if the tournament is over or hasnt started
    if time.time() > page['end-date'] or time.time() < page['start-date']: continue 

    pageFolder = os.path.join(__location__,page['slug'])
    updatePage(pageFolder, page)

#endregion

def updateGuild():
  #TODO
  return



if __name__ == '__main__':
  print(updatePages())
  updateGuild() 