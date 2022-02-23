import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from os import environ
from json import dump, loads

with open("./auth.json",'w') as f:
  dump(loads(environ.get('FIREBASE_AUTH_JSON')), f)

cred = credentials.Certificate('./auth.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def setColoring(coloring):
  db.collection(u'meta').document(u'coloring').set(coloring)

def getColoring():
  return db.collection(u'meta').document(u'coloring').get().to_dict()

def getDungeonTimers():
  return db.collection(u'meta').document(u'dungeon-timers').get().to_dict()

def updateUpdate(col, doc):
  db.collection(str(col)).document(str(doc)).update({'update':
    datetime.now(
        tz=datetime.timezone('America/New_York'))
        .strftime("%A, %B %d at %H:%M:%S EDT")
    })




#region guild

def prepGuildWeek(week, start, end):
  if not db.collection(u'gdata').document(str(week)).get().exists:
    db.collection(u'gdata').document(str(week)).set({'meta':{
      'num': week,
      #11 am, Tuesday August 17th
      'start': start.strftime(f'%-I %P, %A %B %-d{suffix(start.day)}'),
      'end': end.strftime(f'%-I %P, %A %B %-d{suffix(end.day)}'),
    }, 'runs':{ 'data': {} }, 'update':""})

def setGuildRoster(roster):
  print(roster)
  db.collection(u'gdata').document(u'roster').set(roster)

def getGuildRoster():
  return db.collection(u'gdata').document(u'roster').get().to_dict()

def updateGuildRuns(week, runs):
  db.collection(u'gdata').document(str(week)).update({'runs': runs})

def setGuildRuns(week, runs):
  db.collection(u'gdata').document(str(week)).update({'runs': runs})

def getGuildRuns(week):
  doc = db.collection(u'gdata').document(str(week)).get()
  if doc.exists and 'runs' in doc.to_dict():
    return doc.to_dict()['runs']
  else:
    return {'data':{}}

def setWeekNum(week):
  db.collection(u'gdata').document(u'meta').update({'weekNum':week})

def suffix(d):
  return 'th' if 11<=d<=13 else {1:'st',2:'nd',3:'rd'}.get(d%10, 'th')

#endregion

# region tourn
def getListOfTourn():
  docs = db.collection(u'tdata').get()
  return [(doc.id, doc.to_dict()['meta']) for doc in docs]

def getTournData(tourn):
  return db.collection(u'tdata').document(str(tourn)).get().to_dict()

def prepTourn(tourn):
  if not db.collection(u'tdata').document(str(tourn)).get().exists:
    db.collection(u'tdata').document(str(tourn)).set({'meta':{}, 'runs':{}, 'teams':{}, 'update': ""})

def __getTourn(tourn, field):
  return db.collection(u'tdata').document(str(tourn)).get().to_dict()[field]

def getTournTeams(tourn):
  return __getTourn(tourn,u'teams')

def getTournRuns(tourn):
  return __getTourn(tourn,u'runs')

def getTournMeta(tourn):
  return __getTourn(tourn,u'meta')

def getTournHist(tourn):
  return __getTourn(tourn,u'historical')

def getTournRunExists(tourn, run):
  return str(run) in db.collection(u'tdata').document(str(tourn)).get().to_dict()['runs']['data'] 


def __setTourn(tourn, field, data):
  db.collection(u'tdata').document(str(tourn)).update({field:data})

def setTournRuns(tourn, runs):
  __setTourn(tourn, u'runs', runs)

def setTournTeams(tourn, teams):
  __setTourn(tourn, u'teams', teams)

def setTournMeta(tourn, meta):
  __setTourn(tourn, u'meta', meta)

def setTournHist(tourn, hist):
  __setTourn(tourn, u'historical', hist)