from updatePages import updatePages
from updateMeta import updateAllMeta
from logging import DEBUG, basicConfig, INFO, root
from sys import argv

from updatePages import updateGuildRoster, updateGuild
from updateMeta import updateAllMeta

if __name__ == '__main__':
  if '--info' in argv: 
    root.setLevel(INFO)
    basicConfig(level=INFO)
  elif '--debug' in argv: basicConfig(level=DEBUG)
  if '--roster' in argv: updateGuildRoster()
  if '--guild' in argv: updateGuild()
  if '--meta' in argv: updateAllMeta()
  if '--pages' in argv: updatePages()