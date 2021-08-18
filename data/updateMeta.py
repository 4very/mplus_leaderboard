from os.path import join
from datetime import datetime
from pytz import timezone

def updateAllMeta():
  updateColoring()
  updateRankings()


def updateColoring():
  return


def updateRankings():
  return





def updateTimeFile(folder: str):
  with open(join(folder,"upDATE"),'w') as f:
    f.write(
      datetime.now(tz=timezone('America/New_York')).strftime("%A, %B %d at %H:%M:%S EDT"))
