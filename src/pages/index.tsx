// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

import { DataGrid } from '@material-ui/data-grid';
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
    },
    { field: 'score', headerName: 'Score', width: 130, type: 'number' },
    {
      field: 'dateCompleted',
      headerName: 'Completed',
      width: 200,
    },
  ];

  const teamColumns = [
    { field: 'id', headerName: '#', width: 90 },
    { field: 'team', headerName: 'Team Name', width: 300, flex: 1 },
    {
      field: 'tank',
      headerName: 'Tank',
      width: 200,
    },
    {
      field: 'healer',
      headerName: 'Healer',
      width: 200,
    },
    {
      field: 'dps1',
      headerName: 'DPS',
      width: 200,
    },
    {
      field: 'dps2',
      headerName: 'DPS',
      width: 200,
    },
    {
      field: 'dps3',
      headerName: 'DPS',
      width: 200,
    },
  ];

  return (
    <div>
      <div style={{ height: '400px', width: '100%' }}>
        <DataGrid
          rows={props.runRows}
          columns={runColumns}
          disableSelectionOnClick
          hideFooter
        />
      </div>
      <div style={{ height: '380px', width: '100%' }}>
        <DataGrid
          rows={props.teamRows}
          columns={teamColumns}
          disableSelectionOnClick
          hideFooter
        />
      </div>
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
    runRows.push({
      id: runs[i][1],
      team: runs[i][0],
      dunegonName: runs[i][2],
      keystoneLevel: runs[i][5],
      score: +runs[i][4],
      dateCompleted: moment(runs[i][7]).utcOffset(-6).format('h:m a, MM/DD'),
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
