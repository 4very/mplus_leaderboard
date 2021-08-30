// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';
import '@fontsource/roboto';

import { Typography } from '@material-ui/core';
import { DataGrid, GridSortModel } from '@material-ui/data-grid';
import jsonfile from 'jsonfile';

import {
  GuildPropsType,
  GuildRosterColumns,
  GuildRosterRow,
  GuildRunColumns,
  GuildRunRow,
} from '../../types/gTypes';

export default function ContentPage(props: GuildPropsType) {
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'score',
      sort: 'desc',
    },
  ]);

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
          columns={GuildRunColumns}
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
        Roster:
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
          rows={props.rosterRows}
          columns={GuildRosterColumns}
          disableSelectionOnClick
          disableExtendRowFullWidth
          autoHeight
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          pageSize={50}
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
  const { week } = context.params;
  const folderPath: string = path.join(
    process.cwd(),
    'data',
    'pages',
    'g',
    week
  );
  const rosterPath: string = path.join(
    process.cwd(),
    'data',
    'pages',
    'g',
    'roster.json'
  );

  // check if page is valid tournament
  // this is already covered by getStaticPaths but this is reassurance
  if (!fs.existsSync(folderPath)) {
    return { notFound: true };
  }

  const rosterRows: GuildRosterRow[] = [];
  const rosterObj = await jsonfile.readFile(rosterPath);
  Object.keys(rosterObj).forEach((key) => {
    rosterRows.push({
      id: key,
      ...rosterObj[key],
    });
  });

  const runRows: GuildRunRow[] = [];
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
      rosterRows,
      upDATE,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { week: '2' } }, { params: { week: '3' } }],
    fallback: false,
  };
}
