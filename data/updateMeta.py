from RIO import RIO_GetColorData
from os.path import join
from datetime import datetime
from pytz import timezone
from os.path import join, realpath, dirname
from os import getcwd
import logging
import json

__MetaFolder__ = join(realpath(join(getcwd(), dirname(__file__))),"meta")


def updateAllMeta():
  updateColorData(__MetaFolder__)
  updateRankings(__MetaFolder__)


def updateColorData(folder):
  RIOColorData = RIO_GetColorData()
  
  returnValue = {}
  for scoreColor in RIOColorData:
    returnValue[scoreColor['score']] = scoreColor['rgbHex']
  
  with open(join(folder,'coloring.json'), 'w') as f:
    json.dump(returnValue, f, indent=2)
  
  logging.info("Updated Color data")


def getColorForRunScore(score: float):
  with open(join(__MetaFolder__,'coloring.json'),'r') as f:
    jsonData = json.load(f)
  for colorScore, color in jsonData.items():
    if int(colorScore)/16.0 < score:
      return color



def updateRankings(folder):
  return


def getDungeonTimings():
  with open(join(__MetaFolder__,'dungeontimers.json'),'r') as f:
    return json.load(f)
  





def updateTimeFile(folder: str):
  with open(join(folder,"upDATE"),'w') as f:
    f.write(
      datetime.now(tz=timezone('America/New_York')).strftime("%A, %B %d at %H:%M:%S EDT"))
