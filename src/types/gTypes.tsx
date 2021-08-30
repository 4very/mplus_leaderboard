import {
  addFaction,
  classColorRender,
  compareDate,
  Links,
  linksRender,
  percentToString,
  runScoreRender,
  strToDate,
  strtolink,
  timeToString,
} from './funcs';

export interface GuildPropsType {
  runRows: GuildRunRow[];
  rosterRows: GuildRosterRow[];
  pageMetaData: GuildPageMetaData;
  upDATE: string;
}

export interface GuildRunRow {
  id: string;
  name: string;
  dunegonName: string;
  keystoneLevel: string;
  score: number;
  dateCompleted: string;
  timeDiff: number;
  percDiff: number;
  url: string;
  keyMod: number;
}

export interface GuildRosterRow {
  id: string;
  faction: string;
  name: string;
  realm: string;
  className: string;
  classColor: string;
  rank: string;
  score: number;
  links: Links;
  scoreColor: string;
}

export const GuildRosterColumns = [
  {
    field: 'id',
    type: 'number',
    hide: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    renderCell: addFaction,
  },
  {
    field: 'faction',
    headerName: 'Faction',
    width: 150,
    hide: true,
  },

  {
    field: 'className',
    headerName: 'Class',
    width: 200,
    renderCell: classColorRender,
  },
  {
    field: 'rank',
    headerName: 'Rank',
    width: 200,
    hide: true,
  },
  {
    field: 'score',
    headerName: 'R.IO Score',
    width: 200,
    renderCell: runScoreRender,
  },
  {
    field: 'links',
    headerName: 'Links',
    width: 170,
    renderCell: linksRender,
  },
];

export const GuildRunColumns = [
  { field: 'id', headerName: 'ID', width: 100, hide: true },
  {
    field: 'dunegonName',
    headerName: 'Dungeon',
    width: 200,
  },
  {
    field: 'keystoneLevel',
    headerName: 'Key Level',
    width: 150,
    type: 'number',
  },
  {
    field: 'score',
    headerName: 'Score',
    width: 130,
    type: 'number',
    renderCell: runScoreRender,
  },
  {
    field: 'dateCompleted',
    headerName: 'Completed',
    width: 200,
    type: 'date',
    renderCell: strToDate,
    sortComarator: compareDate,
  },
  {
    field: 'timeDiff',
    headerName: 'Time Difference',
    width: 200,
    type: 'number',
    renderCell: timeToString,
  },
  {
    field: 'percDiff',
    headerName: '% Over/Under',
    width: 200,
    type: 'number',
    renderCell: percentToString,
  },
  {
    field: 'url',
    headerName: 'Link',
    width: 70,
    renderCell: strtolink,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: 'keyMod',
    headerName: 'Key Upgrade',
    width: 150,
    type: 'number',
    hide: true,
  },
];

export interface GuildMetaData {
  weekNum: number;
}

export interface GuildPageMetaData {
  num: number;
  start: string;
  end: string;
  nextLink: boolean;
  prevLink: boolean;
}
