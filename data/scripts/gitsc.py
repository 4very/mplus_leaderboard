from git import Repo
from os import getcwd
from io import BytesIO
from json import load, dump
from os.path import join, realpath, dirname

__location__ = realpath(join(getcwd(), dirname(__file__)))
tournFolder = join(getcwd(), 'data', 'pages', 't', 'tournament-2')
start = 1631631600

obj = {
  'ilvl':[],
  'tscore':[]
}


repo = Repo(getcwd())

for commit in repo.iter_commits("47f7566e8f42d54c4784cd96a7384275ee0a1863..HEAD"):
  tgfile = commit.tree / 'data/pages/t/tournament-2/teams.json'
  date = commit.committed_date

  with BytesIO(tgfile.data_stream.read()) as f:
    text = load(f)


  ilvl_obj = {'day': (date - start)/86400}
  score_obj = {'day': (date - start)/86400}

  for key,item in text.items():
    ilvl_obj[key] = item["avgilvl"]
    score_obj[key] = item["score"]

  obj['ilvl'].append(ilvl_obj)
  obj['tscore'].append(score_obj)

with open(join(tournFolder, 'historical.json'), 'w') as f:
  dump(obj, f, indent=2)
  