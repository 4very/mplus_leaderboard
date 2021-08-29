// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';
import '@fontsource/roboto';

import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import jsonfile from 'jsonfile';

import { runColumns, teamColumns } from '../../types/columnTypes';
import { PropsType, RunRow, TeamRow } from '../../types/types';

export default function ContentPage(props: PropsType) {
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
  const folderPath: string = path.join(
    process.cwd(),
    'data',
    'pages',
    't',
    page
  );

  // check if page is valid tournament
  // this is already covered by getStaticPaths but this is reassurance
  if (!fs.existsSync(folderPath)) {
    return { notFound: true };
  }

  const teamRows: TeamRow[] = [];
  const teamObj = await jsonfile.readFile(path.join(folderPath, 'teams.json'));
  Object.keys(teamObj).forEach((key) => {
    teamRows.push({
      id: key,
      ...teamObj[key],
      tank: teamObj[key].players[0],
      healer: teamObj[key].players[1],
      dps1: teamObj[key].players[2],
      dps2: teamObj[key].players[3],
      dps3: teamObj[key].players[4],
      runsComplete: 0,
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
