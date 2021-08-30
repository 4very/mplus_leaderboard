// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';
import '@fontsource/roboto';

import { Typography } from '@material-ui/core';
import { DataGrid, GridSortModel } from '@material-ui/data-grid';
import jsonfile from 'jsonfile';

import {
  GuildMetaData,
  GuildPageMetaData,
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
      <div className="pt-10 sm:pl-2 lg:pl-6 pb-0 box-border">
        <Typography variant="h2" className="font-serif">
          Currently Online
        </Typography>
        <div className="sm:pl-2 lg:pl-4">
          <Typography variant="h5" className="font-serif">
            Weekly Leaderboard from{' '}
            <span className="text-blue-200 font-sans font-regular">
              {props.pageMetaData.start}
            </span>{' '}
            to{' '}
            <span className="text-blue-200 font-sans font-regular">
              {props.pageMetaData.end}
            </span>
          </Typography>
          <Typography variant="h6" className="font-sans">
            {props.pageMetaData.prevLink && (
              <a href={`/g/${props.pageMetaData.num - 1}`}>
                {'<< Previous Week'}
              </a>
            )}

            {props.pageMetaData.prevLink && props.pageMetaData.nextLink && (
              <div className="w-10 inline-block" />
            )}

            {props.pageMetaData.nextLink && (
              <a href={`/g/${props.pageMetaData.num + 1}`}>{'Next Week >>'}</a>
            )}
          </Typography>
          <Typography variant="h4" className="mt-8">
            Dungeon Log:
          </Typography>
        </div>
      </div>
      <div className="sm:ml-4 lg:ml-10 mt-6 box-border">
        <DataGrid
          rows={props.runRows}
          columns={GuildRunColumns}
          disableSelectionOnClick
          autoHeight
          disableExtendRowFullWidth
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          pageSize={25}
        />
      </div>
      <Typography
        variant="h4"
        className="pt-10 sm:pl-2 lg:pl-6 pb-0 box-border"
      >
        Roster:
      </Typography>
      <div className="sm:ml-4 lg:ml-10 mt-6 box-border">
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

  const defFolderPath: string = path.join(process.cwd(), 'data', 'pages', 'g');
  const metaData: GuildMetaData = await jsonfile.readFile(
    path.join(defFolderPath, 'meta.json')
  );

  const curWeek = metaData.weekNum;

  if (week === 'current') {
    return {
      redirect: {
        destination: `/g/${curWeek}`,
        permanent: false,
      },
    };
  }

  const folderPath: string = path.join(defFolderPath, week);
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

  const pageMetaData: GuildPageMetaData = await jsonfile.readFile(
    path.join(folderPath, 'meta.json')
  );

  pageMetaData.nextLink = curWeek > pageMetaData.num;
  pageMetaData.prevLink = pageMetaData.num > 1;

  return {
    props: {
      runRows,
      rosterRows,
      pageMetaData,
      upDATE,
    },
  };
}

export async function getStaticPaths() {
  const folderDir = path.join(process.cwd(), 'data', 'pages', 'g');
  const paths: Object[] = [
    {
      params: {
        week: 'current',
      },
    },
  ];

  fs.readdirSync(folderDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .forEach((dirent) =>
      paths.push({
        params: {
          week: dirent.name,
        },
      })
    );

  return {
    paths,
    fallback: false,
  };
}
