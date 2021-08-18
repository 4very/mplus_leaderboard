import json
import os
import csv
import re

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
folder = os.path.join(__location__,"tournament-1")

data = { 'data': {}, 'topRuns' : {} }

runs = []
with open(os.path.join(folder,"runs.csv"),'r') as f:
  for line in csv.reader(f):
    runs.append(line)

Truns = []
with open(os.path.join(folder,"topRuns.csv"),'r') as f:
  for line in csv.reader(f):
    Truns.append(line)

for i in range(len(runs)):
  id = re.findall(r'\/(\d*?)-',runs[i][1])[0]
  # print(id)
  data['data'][id] = {
      'team': runs[i][0],
      'dunegonName': runs[i][2],
      'dungeonAbbr': runs[i][3],
      'keystoneLevel': int(runs[i][5]),
      'clearTime': int(runs[i][6]),
      'score': float(runs[i][4]),
      'dateCompleted': runs[i][7],
      'timeDiff': 0,
      'percDiff': 0,
      'link': runs[i][1],
      'keyMod': int(runs[i][8]),
      'scoreColor': '#ffffff',
  }

for i in range(len(Truns)):
  id = re.findall(r'\/(\d*?)-',Truns[i][1])[0]
  data['topRuns'][Truns[i][0]] = id


with open(os.path.join(folder,"runs.json"),'w') as f:
  json.dump(data,f, indent=4, ensure_ascii=False)



