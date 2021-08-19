import { GridCellParams } from '@material-ui/data-grid';
import moment from 'moment';

const usernameToLink = (params: GridCellParams) => (
  <a
    href={`https://raider.io/characters/us/${
      params.value.toString().split('-')[1]
    }/${params.value.toString().split('-')[0]}`}
    target="_blank"
    rel="noreferrer"
  >
    {params.value}
  </a>
);
const timeToString = (params: GridCellParams) => (
  <div
    className={+params.value.valueOf() > 0 ? 'text-red-400' : 'text-green-400'}
  >
    {`${Math.floor(Math.abs(+params.value.valueOf()) / 60000)}:${(
      (Math.abs(+params.value.valueOf()) % 60000) /
      1000
    )
      .toFixed(0)
      .padStart(2, '0')}`}
  </div>
);

const percentToString = (params: GridCellParams) => (
  <div
    className={+params.value.valueOf() > 0 ? 'text-red-400' : 'text-green-400'}
  >
    {Math.abs(Math.round(+params.value.valueOf() * 10000) / 100)}%
  </div>
);

const strtolink = (params: GridCellParams) => (
  <a href={params.value.toString()} target="_blank" rel="noreferrer">
    Link
  </a>
);

const strToDate = (params: GridCellParams) => (
  <>{moment(params.value.toString()).utcOffset(-6).format('h:mm a, MM/DD')}</>
);

const compareDate = (param1: string, param2: string) =>
  moment(param1).diff(moment(param2));

const teamScoreRender = (params: GridCellParams) => (
  <div
    style={{
      color: params.api.getCellValue(params.id, 'color'),
    }}
  >
    {params.value}
  </div>
);

const runScoreRender = (params: GridCellParams) => (
  <div
    style={{
      color: params.api.getCellValue(params.id, 'scoreColor'),
    }}
  >
    {params.value}
  </div>
);

export const teamColumns = [
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

export const runColumns = [
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
