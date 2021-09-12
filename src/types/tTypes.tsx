import {
  addFaction,
  addRole,
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

export interface TPropsType {
  runRows: TRunRow[];
  teamData: TTeamData[];
  metaData: TMetaData;
  upDATE: string;
}

export interface TMetaData {
  name: string;
  startText: string;
  endText: string;
}

export interface TRunRow {
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

export interface TTeamData {
  id: string;
  name: string;
  runsCompleted: number;
  score: number;
  players: TPlayerRow[];
  scoreColor: string;
}

export interface TPlayerRow {
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

export const tTeamColumns = [
  {
    field: 'id',
    type: 'number',
    hide: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 70,
    disableColumnMenu: true,
    sortable: false,
    renderCell: addRole,
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
    field: 'level',
    headerName: 'Level',
    width: 70,
    disableColumnMenu: true,
    sortable: false,
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
    width: 150,
    renderCell: runScoreRender,
  },
  {
    field: 'ilvl',
    headerName: 'Gear Score',
    width: 110,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: 'links',
    headerName: 'Links',
    width: 170,
    renderCell: linksRender,
  },
];

export const tRunColumns = [
  { field: 'id', headerName: 'ID', width: 100, hide: true },
  { field: 'team', headerName: 'Team', width: 120 },
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
