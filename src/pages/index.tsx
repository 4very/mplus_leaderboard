// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

// eslint-disable-next-line import/order
import { Typography } from '@material-ui/core';
import '@fontsource/roboto';

import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import moment from 'moment';

import { PropsType, RunRow, TeamRow } from '../types/types';

export default function ContentPage(props: PropsType) {
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
      className={
        +params.value.valueOf() > 0 ? 'text-red-400' : 'text-green-400'
      }
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
      className={
        +params.value.valueOf() > 0 ? 'text-red-400' : 'text-green-400'
      }
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
        // @ts-ignore
        color: params.api.getCellValue(params.id, 'scoreColor'),
      }}
    >
      {/* @ts-ignore */}
      {params.value}
    </div>
  );

  const runScoreRender = (params: GridCellParams) => (
    <div
      style={{
        // @ts-ignore
        color: params.api.getCellValue(params.id, 'scoreColor'),
      }}
    >
      {/* @ts-ignore */}
      {params.value}
    </div>
  );

  const teamColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 30,
      type: 'number',
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'team',
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
      field: 'timerDiff',
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
      field: 'fullTeam',
      headerName: 'Full team?',
      width: 160,
      type: 'boolean',
    },
    {
      field: 'link',
      headerName: 'Link',
      width: 70,
      renderCell: strtolink,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'keyUpgrade',
      headerName: 'Key Upgrade',
      width: 150,
      type: 'number',
      hide: true,
    },
    {
      field: 'creditCardInfo',
      headerName: 'Resub Speedrun?',
      width: 150,
      type: 'boolean',
      hide: true,
      description: 'Did a resub occur during the key?',
      disableColumnMenu: true,
      sortable: false,
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        style={{
          padding: '1%',
          paddingTop: '5vh',
          paddingLeft: '3vw',
          boxSizing: 'border-box',
          paddingBottom: '0',
        }}
      >
        Dungeon Log:
      </Typography>
      <div
        style={{
          marginLeft: '4vw',
          marginTop: '3vh',
          boxSizing: 'border-box',
        }}
      >
        <DataGrid
          rows={props.runRows}
          columns={runColumns}
          disableSelectionOnClick
          hideFooter
          autoHeight
          disableExtendRowFullWidth
        />
      </div>
      <Typography
        variant="h4"
        style={{
          padding: '1%',
          paddingTop: '5vh',
          paddingLeft: '3vw',
          boxSizing: 'border-box',
          paddingBottom: '0',
        }}
      >
        Teams:
      </Typography>
      <div
        style={{
          marginLeft: '4vw',
          marginTop: '1vh',
          marginBottom: '4vh',
          boxSizing: 'border-box',
        }}
      >
        <DataGrid
          rows={props.teamRows}
          columns={teamColumns}
          disableSelectionOnClick
          hideFooter
          disableExtendRowFullWidth
          autoHeight
        />
      </div>
      <Typography variant="subtitle1" align="right" style={{ padding: '20px' }}>
        Last Updated: {props.upDATE} <br />
        Updates on the hour every hour or ping avery#1111 on discord.
      </Typography>
    </>
  );
}

export async function getStaticProps() {
  const teamsRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'teams.csv'), 'utf8')
    .split('\n');

  const teams: string[][] = [];
  for (let i: number = 0; i < teamsRaw.length - 1; i += 1) {
    if (teamsRaw[i].length > 10) teams.push(teamsRaw[i].split(','));
  }

  const teamsNamesRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'team_names.csv'), 'utf8')
    .split('\n');
  const teamNames: string[][] = [];
  for (let i: number = 0; i < teamsNamesRaw.length - 1; i += 1) {
    teamNames.push(teamsNamesRaw[i]?.split(';') ?? []);
  }

  const runsRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'runs.csv'), 'utf8')
    .split('\n');
  const runs: string[][] = [];
  for (let i: number = 0; i < runsRaw.length; i += 1) {
    if (runsRaw[i].length > 10) {
      runs.push(runsRaw[i]?.split(',') ?? []);
    }
  }

  const timersRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'dungeontimers.csv'), 'utf8')
    .split('\n');
  const timers: string[][] = [];
  for (let i: number = 0; i < timersRaw.length; i += 1) {
    timers.push(timersRaw[i]?.split(',') ?? []);
  }

  const colorsRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'coloring.csv'), 'utf8')
    .split('\n');
  const colors: string[][] = [];
  for (let i: number = 0; i < colorsRaw.length - 1; i += 1) {
    colors.push(colorsRaw[i]?.split(',') ?? []);
  }

  const teamRows: TeamRow[] = [];
  for (let i: number = 0; i < teams.length; i += 1) {
    let scoreColor = '#ffffff';
    for (let j: number = 0; j < colors.length; j += 1) {
      if (+colors[j][0] * 5 <= +teams[i][6]) {
        // eslint-disable-next-line prefer-destructuring
        scoreColor = colors[j][1];
        break;
      }
    }

    let runsCompleted = 0;
    for (let j: number = 0; j < runs.length; j += 1) {
      if (runs[j][0] === teams[i][0]) runsCompleted += 1;
    }

    teamRows.push({
      id: teams[i][0].split(' ')[1],
      team: teamNames[i][1],
      runsCompleted,
      score: +teams[i][6],
      tank: teams[i][1],
      healer: teams[i][2],
      dps1: teams[i][3],
      dps2: teams[i][4],
      dps3: teams[i][5],
      scoreColor,
    });
  }

  const upDATE = fs.readFileSync(
    path.join(process.cwd(), 'data', 'upDATES.csv'),
    'utf8'
  );

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
    const percDiff = +runs[i][6] / timer - 1;

    let scoreColor = '#ffffff';
    for (let j: number = 0; j < colors.length; j += 1) {
      if (+colors[j][0] / 16 <= +runs[i][4]) {
        // eslint-disable-next-line prefer-destructuring
        scoreColor = colors[j][1];
        break;
      }
    }

    runRows.push({
      id: runs[i][1],
      team: runs[i][0],
      dunegonName: runs[i][2],
      keystoneLevel: runs[i][5],
      score: +runs[i][4],
      dateCompleted: runs[i][7],
      timerDiff: diff,
      percDiff,
      fullTeam: runs[i][9] === 'True',
      link: runs[i][1],
      keyUpgrade: +runs[i][8],
      creditCardInfo: runs[i][10] === 'True',
      scoreColor,
    });
  }

  return {
    props: {
      runRows,
      teamRows,
      upDATE,
    },
  };
}
