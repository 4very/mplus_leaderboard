
from os import getcwd
from os.path import join, realpath, dirname
from json import load, dump



def smooth(file):
  with open(file, 'r') as f: data = load(f)



  for id,e in data.items():
    for i in range(1,len(e)):
      for key, val in e[i].items():
        if val < e[i-1][key]:
          data[id][i][key] = e[i-1][key]
  
  with open(file, 'w') as f: dump(data, f, indent=2)




if (__name__ == "__main__"):
  
  __location__ = realpath(join(getcwd(), dirname(__file__)))
  jsonPath = join(__location__, '..', 'pages','t','tournament-2','historical.json')
  smooth(jsonPath)

