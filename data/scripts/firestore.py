

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from os.path import join, realpath, dirname, isdir, exists
from os import getcwd, listdir, walk
from math import ceil
from json import load




# Use a service account
cred = credentials.Certificate('./auth.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

__location__ = realpath(join(getcwd(), 'data'))


# gref = db.collection(u'gdata')
# gfold = join(__location__, 'pages', 'g')

# for gfolder in listdir(gfold):
#   full = join(gfold, gfolder)
#   if not isdir(full): continue

#   with open(join(full,'meta.json'), 'r') as f:
#     meta = load(f)
  
#   with open(join(full,'runs.json'), 'r') as f:
#     runs = load(f)
  
#   with open(join(full,'upDATE'), 'r') as f:
#     update = f.read()
  
#   data = {
#     'runs': runs,
#     'meta': meta,
#     'update': update
#   }

#   gref.document(gfolder).set(data)


  
# gref = db.collection(u'tdata')
# gfold = join(__location__, 'pages', 't')

# for gfolder in listdir(gfold):
#   full = join(gfold, gfolder)
#   if not isdir(full): continue

#   with open(join(full,'teams.json'), 'r') as f:
#     teams = load(f)
  
#   with open(join(full,'runs.json'), 'r') as f:
#     runs = load(f)
  
#   with open(join(full,'upDATE'), 'r') as f:
#     update = f.read()
  
#   data = {
#     'runs': runs,
#     'teams': teams,
#     'update': update
#   }

#   gref.document(gfolder).set(data)


# with open(join(__location__,'pages.json'), 'r') as f:
#   pages = load(f)


# gref = db.collection(u'tdata')
# for key in pages:

#   gref.document(key).update({'meta':pages[key]})


# gref = db.collection(u'gdata')
# gfold = join(__location__, 'pages', 'g')

# with open(join(gfold, 'meta.json'), 'r') as f:
#   meta = load(f)

# gref.document(u'meta').set(meta)

# with open(join(gfold, 'roster.json'), 'r') as f:
#   roster = load(f)
# gref.document(u'roster').set(roster)

# gref = db.collection(u'tdata')
# gfold = join(__location__, 'pages', 't')

# for gfolder in listdir(gfold):
#   full = join(gfold, gfolder)
#   if not isdir(full) or not exists(join(full,'historical.json')): continue

#   with open(join(full,'historical.json'), 'r') as f:
#     historical = load(f)

  

#   gref.document(gfolder).update({'historical': historical})


db.collection(u'meta').document(u'dungeon-timers').set({
  "DOS": 2580000,
  "HOA": 1920000,
  "MISTS": 1800000,
  "PF": 2280000,
  "SD": 2460000,
  "SOA": 2340000,
  "NW": 2160000,
  "TOP": 2280000
}
)