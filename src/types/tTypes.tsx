import {
  addClass,
  addCov,
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
  rules: string | null;
  upDATE: string;
}

export interface TMetaData {
  name: string;
  startText: string;
  endText: string;
  collectGraphs: boolean;
  teamDetails: boolean;
  teamHall: boolean;
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
  avgilvl: number;
  highestkey: { key: number; per: number; str: string; link: string };
  numkeys: number;
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
  team: string;
  render: string;
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
    field: 'className',
    headerName: 'Class',
    width: 60,
    renderCell: addClass,
    disableColumnMenu: true,

    sortable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 170,
    renderCell: classColorRender,
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
  { field: 'team', headerName: 'Team', width: 120, renderCell: addFaction },
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

export const TournTeamDetails = [
  {
    field: 'id',
    type: 'number',
    hide: true,
  },
  {
    field: 'team',
    headerName: 'Team',
    width: 90,
    headerClassName: 'pr-0',
    sortable: false,
    align: 'left',
    renderCell: addFaction,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 50,
    renderCell: addRole,
    headerClassName: 'pr-0',
    sortable: false,
  },
  {
    field: 'className',
    headerName: 'Class',
    width: 60,
    renderCell: addClass,
    sortable: false,
  },
  {
    field: 'covenant',
    headerName: 'Cov',
    width: 40,
    headerClassName: 'pr-0',
    renderCell: addCov,
    sortable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 130,
    renderCell: classColorRender,
    headerClassName: 'pr-0',
    sortable: false,
  },
  {
    field: 'faction',
    headerName: 'Faction',
    width: 150,
    hide: true,
    headerClassName: 'pr-0',
    sortable: false,
  },
  {
    field: 'level',
    headerName: 'Level',
    width: 60,
    headerClassName: 'pr-0',
    sortable: false,
    align: 'center',
  },

  {
    field: 'rank',
    headerName: 'Rank',
    width: 200,
    hide: true,
    headerClassName: 'pr-0',
    sortable: false,
  },
  {
    field: 'score',
    headerName: 'Score',
    width: 60,
    renderCell: runScoreRender,
    headerClassName: 'pr-0',
    sortable: false,
    align: 'center',
  },
  {
    field: 'ilvl',
    headerName: 'ilvl',
    width: 40,
    headerClassName: 'pr-0',
    sortable: false,
    align: 'center',
  },
  {
    field: 'renown',
    headerName: 'Renown',
    width: 75,
    headerClassName: 'pr-0',
    sortable: false,
    align: 'center',
  },
  {
    field: 'links',
    headerName: 'Links',
    width: 150,
    renderCell: linksRender,
    hide: false,
    headerClassName: 'pr-0',
    sortable: false,
  },
];
