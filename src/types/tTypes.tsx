import {
  compareDate,
  percentToString,
  runScoreRender,
  strToDate,
  strtolink,
  teamScoreRender,
  timeToString,
  usernameToLink,
} from './funcs';

export interface TPropsType {
  runRows: TRunRow[];
  teamRows: TTeamRow[];
  upDATE: string;
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

export interface TTeamRow {
  id: string;
  team: string;
  runsCompleted: number;
  score: number;
  tank: string;
  healer: string;
  dps1: string;
  dps2: string;
  dps3: string;
  scoreColor: string;
}

export const tTeamColumns = [
  {
    field: 'id',
    headerName: '#',
    width: 70,
    type: 'number',
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: 'name',
    headerName: 'Team Name',
    width: 500,
  },
  {
    field: 'runsCompleted',
    headerName: 'Runs',
    width: 120,
    type: 'number',
  },
  {
    field: 'score',
    headerName: 'Team Score',
    width: 200,
    type: 'number',
    renderCell: teamScoreRender,
  },
  {
    field: 'tank',
    headerName: 'Tank',
    width: 200,
    renderCell: usernameToLink,
  },
  {
    field: 'healer',
    headerName: 'Healer',
    width: 200,
    renderCell: usernameToLink,
  },
  {
    field: 'dps1',
    headerName: 'DPS',
    width: 200,
    renderCell: usernameToLink,
  },
  {
    field: 'dps2',
    headerName: 'DPS',
    width: 200,
    renderCell: usernameToLink,
  },
  {
    field: 'dps3',
    headerName: 'DPS',
    width: 200,
    renderCell: usernameToLink,
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
