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


val = {}
for key, team in teams.items():
  team_score = 0
  team_ilvl = 0
  for i in range(5):
    name = team['players'][i]['name']
    realm = team['players'][i]['realm']

    rio_data = RIO_GetCharRankings(name,realm)
    char = WOW_GetCharData(name.lower(), realm.lower())
    try: char['faction']
    except: 
      print(name, realm)
      continue
    
    if 'statusCode' not in rio_data.keys():
      rio_link = rio_data['profile_url']
      rio_score = rio_data['mythic_plus_scores_by_season'][0]['scores']['all']
      rio_scoreColor = getColorForScore(rio_score)
    else: 
      rio_link = None
      rio_score = 0
      rio_scoreColor = '#ffffff'
    
    team_score += rio_score
    team_ilvl += char['average_item_level']
      
    try: title = char['active_title']['display_string'].replace(r'{name}',name)
    except: title = name

    try: 
      cov = char['covenant_progress']['chosen_covenant']['name']
      renown = char['covenant_progress']['renown_level']
    except:
      cov = None
      renown = None 


    teams[key]['players'][i] = {
      **teams[key]['players'][i],
      'id': char['id'],
      'name': name,
      'realm': realm,
      'faction': char['faction']['name'],
      'class': char['character_class']['id'],
      'className': NumberToClassName[char['character_class']['id']],
      'classColor': NumberToClassColor[char['character_class']['id']],
      'race': char['race']['id'],
      'level': char['level'],
      'title': title,
      'ilvl': char['average_item_level'],
      'score': rio_score,
      'scoreColor': rio_scoreColor,
      'covenant': cov,
      'renown': renown,
      'links': {
        'rio': rio_link,
        'armory': f'https://worldofwarcraft.com/en-us/character/us/{realm}/{name}',
        'wcl': f'https://www.warcraftlogs.com/character/us/{realm}/{name}',
        'rbot': f'https://www.raidbots.com/simbot/quick?region=us&realm={realm}&name={name}'
      }
    }
  
  teams[key] = {
    **teams[key],
    'score': team_score,
    'scoreColor': getColorForScore(team_score/4.0),
    'avgilvl': team_ilvl/5
  }
  

with open(join(tournFolder, 'teams.json'), 'w') as f:
  dump(teams, f, indent=2)