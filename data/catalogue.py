from WOW import WOW_GetCharData
from os.path import join, realpath, dirname
from os import getcwd
from json import load, dump
from RIO import RIO_GetCharRankings
from updateMeta import NumberToClassName, getColorForRunScore, getColorForScore, NumberToClassColor




__location__ = realpath(join(getcwd(), dirname(__file__)))


tournFolder = join(__location__, 'pages', 't', 'tournament-2')


with open(join(tournFolder, 'teams.json'), 'r') as f:
  teams = load(f)

with open(join(tournFolder, 'historical.json'), 'r') as f:
  hist = load(f)

cday = hist['cday']
ilvlobj = {"day":cday}
scoreobj = {"day":cday}

for key,item in teams.items():
  ilvlobj[key] = item["avgilvl"]
  scoreobj[key] = item["score"]
  
hist['ilvl'].append(ilvlobj)
hist['tscore'].append(scoreobj)
hist['cday'] += 0.5

with open(join(tournFolder, 'historical.json'), 'w') as f:
  dump(hist, f, indent=2)