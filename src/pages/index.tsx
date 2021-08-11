// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import moment from 'moment';

interface Props {
  // teams: string[][];
  // teamNames: string[][];
  // runs: string[][];
  runRows: RunRow[];
  teamRows: TeamRow[];
}

interface RunRow {
  id: string;
  team: string;
  dunegonName: string;
  keystoneLevel: string;
  score: number;
  dateCompleted: string;
  timerDiff: number;
  link: string;
}

interface TeamRow {
  id: string;
  team: string;
  tank: string;
  healer: string;
  dps1: string;
  dps2: string;
  dps3: string;
}

export default function ContentPage(props: Props) { // eslint-disable-line
  // const router = useRouter();

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
    <div style={{ color: +params.value.valueOf() > 0 ? 'red' : 'green' }}>
      {`${Math.floor(Math.abs(+params.value.valueOf()) / 60000)}:${(
        (Math.abs(+params.value.valueOf()) % 60000) /
        1000
      ).toFixed(0)}`}
    </div>
  );
  const strtolink = (params: GridCellParams) => (
    <a href={params.value.toString()} target="_blank" rel="noreferrer">
      Link
    </a>
  );

  const strToDate = (params: GridCellParams) => (
    <>{moment(params.value.toString()).utcOffset(-6).format('h:m a, MM/DD')}</>
  );

  const compareDate = (param1: string, param2: string) =>
    moment(param1).diff(moment(param2));

  const runColumns = [
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
    { field: 'score', headerName: 'Score', width: 130, type: 'number' },
    {
      field: 'dateCompleted',
      headerName: 'Completed',
      width: 200,
      type: 'date',
      renderCell: strToDate,
      sortComarator: compareDate,
    },
    {
      field: 'timerDiff',
      headerName: 'Time Difference',
      width: 200,
      type: 'number',
      renderCell: timeToString,
    },
    {
      field: 'link',
      headerName: 'Link',
      width: 70,
      renderCell: strtolink,
      disableColumnMenu: true,
      sortable: false,
    },
  ];

  const teamColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 30,
      type: 'number',
      disableColumnMenu: true,
      sortable: false,
    },
    { field: 'team', headerName: 'Team Name', minWidth: 300, flex: 1 },
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

  return (
    <div>
      <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
        <DataGrid
          rows={props.runRows}
          columns={runColumns}
          disableSelectionOnClick
          hideFooter
          autoHeight
        />
      </div>
      <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
        <DataGrid
          rows={props.teamRows}
          columns={teamColumns}
          disableSelectionOnClick
          hideFooter
          autoHeight
        />
      </div>
      <div />
    </div>
  );
}

export async function getStaticProps() {
  const teamsRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'teams.csv'), 'utf8')
    .split('\n');
  const teams: string[][] = [];
  for (let i: number = 0; i < teamsRaw.length; i += 1) {
    teams.push(teamsRaw[i]?.split(',') ?? []);
  }

  const teamsNamesRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'team_names.csv'), 'utf8')
    .split('\n');
  const teamNames: string[][] = [];
  for (let i: number = 0; i < teamsNamesRaw.length; i += 1) {
    teamNames.push(teamsNamesRaw[i]?.split(';') ?? []);
  }

  const runsRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'runs.csv'), 'utf8')
    .split('\n');
  const runs: string[][] = [];
  for (let i: number = 0; i < runsRaw.length; i += 1) {
    runs.push(runsRaw[i]?.split(',') ?? []);
  }

  const timersRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'dungeontimers.csv'), 'utf8')
    .split('\n');
  const timers: string[][] = [];
  for (let i: number = 0; i < timersRaw.length; i += 1) {
    timers.push(timersRaw[i]?.split(',') ?? []);
  }

  const teamRows: TeamRow[] = [];
  for (let i: number = 0; i < teams.length; i += 1) {
    teamRows.push({
      id: teams[i][0].split(' ')[1],
      team: teamNames[i][1],
      tank: teams[i][1],
      healer: teams[i][2],
      dps1: teams[i][3],
      dps2: teams[i][4],
      dps3: teams[i][5],
    });
  }

  const runRows: RunRow[] = [];
  for (let i: number = 0; i < runs.length; i += 1) {
    let timer = 0;
    for (let j: number = 0; j < timers.length; j += 1) {
      if (timers[j][0] === runs[i][3]) {
        timer = +timers[j][1];
        break; // lol
      }
    }

    const diff = +runs[i][6] - timer;
    // if (diff < 0) {
    //   diff = +diff + 60000;
    // }

    // moment(runs[i][7]).utcOffset(-6).format('h:m a, MM/DD')

    runRows.push({
      id: runs[i][1],
      team: runs[i][0],
      dunegonName: runs[i][2],
      keystoneLevel: runs[i][5],
      score: +runs[i][4],
      dateCompleted: runs[i][7],
      timerDiff: diff,
      link: runs[i][1],
    });
  }

  return {
    props: {
      // teams,
      // teamNames,
      // runs,
      runRows,
      teamRows,
    },
  };
}
