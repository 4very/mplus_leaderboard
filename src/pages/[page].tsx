// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

// eslint-disable-next-line import/order
import { Typography } from '@material-ui/core';
import '@fontsource/roboto';

import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import jsonfile from 'jsonfile';
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
        color: params.api.getCellValue(params.id, 'color'),
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

export async function getStaticProps(context: any) {
  const { page } = context.params;
  const folderPath: string = path.join(process.cwd(), 'data', 'pages', page);

  // check if page is valid tournament
  // this is already covered by getStaticPaths but this is reassurance
  if (!fs.existsSync(folderPath)) {
    console.log('invalid');
    return { notFound: true };
  }

  const teamRows: TeamRow[] = [];
  const teamObj = await jsonfile.readFile(path.join(folderPath, 'teams.json'));
  Object.keys(teamObj).forEach((key) => {
    teamRows.push({
      id: key,
      ...teamObj[key],
    });
  });

  const runRows: RunRow[] = [];
  const runObj = await jsonfile.readFile(path.join(folderPath, 'runs.json'));
  Object.keys(runObj.data).forEach((key) => {
    runRows.push({
      id: key,
      ...runObj.data[key],
    });
  });

  const upDATE: string = fs.readFileSync(
    path.join(folderPath, 'upDATE'),
    'utf8'
  );

  console.log(teamRows);

  // teamRows.push({
  //   id: teams[i][0].split(' ')[1],
  //   team: teamNames[i][1],
  //   runsCompleted,
  //   score: +teams[i][6],
  //   tank: teams[i][1],
  //   healer: teams[i][2],
  //   dps1: teams[i][3],
  //   dps2: teams[i][4],
  //   dps3: teams[i][5],
  //   scoreColor,
  // });

  // runRows.push({
  //   id: runs[i][1],
  //   team: runs[i][0],
  //   dunegonName: runs[i][2],
  //   keystoneLevel: runs[i][5],
  //   score: +runs[i][4],
  //   dateCompleted: runs[i][7],
  //   timeDiff: diff,
  //   percDiff,
  //   fullTeam: runs[i][9] === 'True',
  //   url: runs[i][1],
  //   keyUpgrade: +runs[i][8],
  //   creditCardInfo: runs[i][10] === 'True',
  //   scoreColor,

  return {
    props: {
      runRows,
      teamRows,
      upDATE,
    },
  };
}

export async function getStaticPaths() {
  const obj = jsonfile.readFile(path.join(process.cwd(), 'data', 'pages.json'));
  const paths: Object[] = [];
  Object.keys(await obj).forEach((page) => {
    paths.push({
      params: { page },
    });
  });

  return {
    paths,
    fallback: false,
  };
}
