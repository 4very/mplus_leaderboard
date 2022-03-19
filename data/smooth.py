from fb import getTournHist, setTournHist

data = getTournHist('tournament-4')





for id,e in data.items():
  for i in range(1,len(e)):
    for key, val in e[i].items():
      if val < e[i-1][key]:
        data[id][i][key] = e[i-1][key]
  


setTournHist(data)