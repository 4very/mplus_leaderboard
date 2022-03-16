from RIO import RIO_GetColorData
from os.path import join
from datetime import datetime
from pytz import timezone
from os.path import join, realpath, dirname
from os import getcwd
import logging
import json

import fb
__MetaFolder__ = join(realpath(join(getcwd(), dirname(__file__))),"meta")


def updateAllMeta():
  updateColorData(__MetaFolder__)
  updateRankings(__MetaFolder__)


def updateColorData(folder):
  RIOColorData = RIO_GetColorData()
  
  returnValue = {}
  for scoreColor in RIOColorData:
    returnValue[scoreColor['score']] = scoreColor['rgbHex']
  
  fb.setColoring(returnValue)
  
  logging.info("Updated Color data")


def getColorForRunScore(score: float):
  return __colorHelper(score, 16)

def getColorForScore(score: float):
  return __colorHelper(score)



def __colorHelper(score, divisor=1):
  try: int(score)
  except: return '#ffffff'

  coloringData = fb.getColoring()
  vals = [int(x) for x in coloringData.keys()]
  vals.sort()

  for colorScore in vals:
    if colorScore/divisor > score:
      return coloringData[str(colorScore)]
  
  return '#ffffff'


def updateRankings(folder):
  return


NumberToClassName = {
  0: 'None',
  1: 'Warrior',
  2: 'Paladin',
  3: 'Hunter',
  4: 'Rogue',
  5: 'Priest',
  6: 'Death Knight',
  7: 'Shaman',
  8: 'Mage',
  9: 'Warlock',
  10: 'Monk',
  11: 'Druid',
  12: 'Demon Hunter'
}

NumberToClassColor = {
  0: '#ffffff',
  1: '#C69B6D',
  2: '#F48CBA',
  3: '#AAD372',
  4: '#FFF468',
  5: '#FFFFFF',
  6: '#C41E3A',
  7: '#0070DD',
  8: '#3FC7EB',
  9: '#8788EE',
  10: '#00FF98',
  11: '#FF7C0A',
  12: '#A330C9'
}
