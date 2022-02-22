import time
from math import ceil

from updatePage import updatePage
from updateGuild import UpdateGuildRoster, UpdateGuildRuns
import fb


def updatePages():
  for slug, page in fb.getListOfTourn():

    # if the tournament is over or hasnt started
    if  time.time() > page['end-date'] or \
        time.time() < page['start-date']: continue 

    updatePage(slug)


def updateGuild():

  startTuesday = 1628607600
  now = int(time.time())

  weekNumber = ceil((now - startTuesday)/604800)
  startDate = now - ((now - startTuesday) % 604800)
  endDate = startDate + 604800

  lastWeekNumber = weekNumber - 1
  lastWeekStartDate = startDate - 604800
  lastWeekEndDate = startDate

  fb.setWeekNum(weekNumber)

  fb.prepGuildWeek(lastWeekNumber, lastWeekStartDate, lastWeekEndDate)
  UpdateGuildRuns(lastWeekNumber, lastWeekStartDate, lastWeekEndDate)

  fb.prepGuildWeek(weekNumber, startDate, endDate)
  UpdateGuildRuns(weekNumber, startDate, endDate)
  
  return

def updateGuildRoster():
    updateGuild.UpdateGuildRoster()





  
