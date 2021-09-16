from os.path import join, realpath, dirname
from os import getcwd
from json import load, dump


from time import time
now = time()
start = 1631631600

__location__ = realpath(join(getcwd(), dirname(__file__)))


tournFolder = join(__location__, 'pages', 't', 'tournament-2')


with open(join(tournFolder, 'teams.json'), 'r') as f:
  teams = load(f)

with open(join(tournFolder, 'historical.json'), 'r') as f:
  hist = load(f)

cday = (now-start)/86400
ilvlobj = {"day":cday}
scoreobj = {"day":cday}

for key,item in teams.items():
  ilvlobj[key] = item["avgilvl"]
  scoreobj[key] = item["score"]
  
hist['ilvl'].append(ilvlobj)
hist['tscore'].append(scoreobj)

with open(join(tournFolder, 'historical.json'), 'w') as f:
  dump(hist, f, indent=2)