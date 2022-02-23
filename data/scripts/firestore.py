

import json
from sys import stdout
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from os.path import join, realpath, dirname, isdir, exists
from os import getcwd, listdir, walk
from math import ceil
from json import load

import os

# print(os.environ.get('FIREBASE_AUTH_JSON'))

os.environ['firebase']= json.dumps({
  "type": "service_account",
  "project_id": "mplus-leaderboard",
  "private_key_id": "89b538318f94fa2214f3c213e8e15746764f99d7",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7Y71tINXMMONa\nm3BsH0zBKa+8P9PomzwFD/sfj4F5PLpka5Df/KAITMGn1PEAKPBW8vG/gKLBEbKk\nIU7JWm4aNKP5AJJxdBiHsImwsm3/qbT5rTk47qal96ZJ/9vkB+cU7qB+xrGVxqWr\nV+OWVGW97eRIcKIW5k/hXxZiUlbdlUJYULWvkQ4YJ39wLTZgU7tfhhOitOEnBt3c\noZxyqysdWvDNlDhVFv/Dek6SvipG5uJaXH4bQbrP5u+FVOUuvBwC9l/+IiOBlAxD\nki1kTIi6zJFShSSWdzoCShsXFIEqMBOfphwL/br/LNDziQzISgNxePD3n0HXR65k\nHW74vqopAgMBAAECggEAHtd/LW9qkOV4/gg4XCtYpDA6wtaUh6PJIKItOFgTvMMQ\ngIetvBfltQgBFaD4G4khaYYp4NWItBM4Hkh3Ia/XEEwasthzweWURfz55JGxhhNF\n/JQUp3isCAP3JBXO+LyOPYU6+DK2tsqPqOBZznvMlRKK8JtNKky02Aig9ATOVEC8\nfoOa3EQ3L0X0WVXfJ9xNDUiusYvwNfJB7HnMVbCw0xi5zt/9jr2b3eXCd7YpA46c\nCB9Iu0v7VIZXa8IOknyobZQdMqmwzpHNEB3hpTDTS/Z/u0wIvZ4amzn+YUFPy22W\n+Bpa6c8nvfP+4dRkjzoRyfCDuOK6z87UnSeMTSXMCwKBgQD6mGYkKDWSeAj6F+xm\n+DJckOmbnAfOLih94jSE3oyzOQKC6LFIZo5f+jk2J665VLAZVOC9Z3ehowyOboi/\n6MzHzIZMr7NVTCwyIdmmWPT63uFjyNtjM3FF+wWF6znk836c9K2evDECNSZj8a6r\nXhj8cEiC/LNAuK4eXvvxlTXlSwKBgQC/bl22wfD+EHg98qhAle/RMCNPfvQjOGpe\niW0h1/LJZb0SqR5nHYKLvkA4b2mQNa9fVMr3Yc8vpoq1JnlO7JjVrzdGX7+8rOOG\nBcm3VACefUNRqi7yOfrmaNJQ3Fq+2Mhzpi5Bzun73nQyUZo+ZLS/SD1cRwYqbTOO\n89BAY6+p2wKBgQCDBg/Rs9xe2rgG219Vb0wVrgcWv3wtR2EQgKdpGVuDkblIbRXU\nfxrN/+zN7e2jJS518DUZkvGv56p3BkAl5zi69qr5iZxAavVouN4t5bEhQkuierCK\nq6j8KAV5QcYheVaoBh6JMmiFePi7pO/o1ehGhQbExg+LNYSEiLE+XP+zBQKBgCxW\nWJg6pSGDGQZoDHYhBBF0T8lawxrhNym8NK2RAaeJy9flmagSWqkZIHCxxUZkWMEA\nt53CZqVHsnqwdYpFHETptyiyhoshk/T3pDe02gvbQVtJymPJ8AWro4Kc9tubBBpd\nE/uj++edJ1Z8NfhbhM2E4slbnd73uehTKhmvvQDfAoGAZ/34BR8cGMK2dyNtx7oZ\n+8cBY+DYXynC9zl1DaB4eJDofdZFgofscmG8fdZ0SoRCFfOgmHLMRxvRoO8RQEKy\nc2sRtuyo8gpVedWQjqZSpok9QVs5ZGnrpg0/im93XrEs5JW+B3oRObB6FTGbWzt9\nLhiz2PxN5HYymY4ILXiqTMU=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-szzcs@mplus-leaderboard.iam.gserviceaccount.com",
  "client_id": "108136137692758198815",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-szzcs%40mplus-leaderboard.iam.gserviceaccount.com"
})

print(os.environ.get('firebase'))


# Use a service account
cred = credentials.Certificate('./auth.json')
firebase_admin.initialize_app(cred)

db = firestore.client()



# __location__ = realpath(join(getcwd(), 'data'))


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


# db.collection(u'meta').document(u'dungeon-timers').set({
#   "DOS": 2580000,
#   "HOA": 1920000,
#   "MISTS": 1800000,
#   "PF": 2280000,
#   "SD": 2460000,
#   "SOA": 2340000,
#   "NW": 2160000,
#   "TOP": 2280000
# }
# )

