// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

import '@fontsource/roboto';

import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import jsonfile from 'jsonfile';

import {
  TMetaData,
  TPropsType,
  tRunColumns,
  TRunRow,
  tTeamColumns,
  TTeamData,
} from '../../types/tTypes';

export default function ContentPage(props: TPropsType) {
  return (
    <>
      <div className="pt-10 sm:pl-2 lg:pl-6 pb-0 box-border">
        <Typography variant="h2" className="font-serif">
          Currently Online
        </Typography>
        <div className="sm:pl-2 lg:pl-4">
          <Typography variant="h4" className="font-serif">
            {props.metaData.name}
          </Typography>
          <Typography variant="h5" className="font-serif mb-3">
            <span className="">{props.metaData.startText}</span> to{' '}
            <span className="">{props.metaData.endText}</span>
          </Typography>
          <Typography variant="h4" className="mt-8">
            Dungeon Log:
          </Typography>
        </div>
      </div>
      <div className="sm:ml-4 lg:ml-10 mt-6 box-border">
        <DataGrid
          rows={props.runRows}
          columns={tRunColumns}
          disableSelectionOnClick
          autoHeight
          disableExtendRowFullWidth
          hideFooter
        />
      </div>
      <div className="pt-10 sm:pl-2 lg:pl-6 pb-0 box-border">
        <Typography variant="h4">Teams:</Typography>
        <div className="pt-2 sm:pl-2 lg:pl-6 pb-0 box-border">
          {props.teamData.map((team) => {
            return (
              <div className="mb-10" key={team.id}>
                <Typography variant="h5" className="font-serif">
                  {team.name}
                </Typography>

                <div className="sm:ml-4 lg:ml-10 box-border">
                  <DataGrid
                    rows={team.players}
                    columns={tTeamColumns}
                    disableSelectionOnClick
                    disableExtendRowFullWidth
                    autoHeight
                    hideFooter
                  />
                </div>
              </div>
            );
          })}
          {/* <div className="sm:ml-4 lg:ml-10 mt-6 box-border">
        <DataGrid
          rows={props.teamRows}
          columns={tTeamColumns}
          disableSelectionOnClick
          disableExtendRowFullWidth
          autoHeight
        />
      </div> */}
        </div>
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
  const pagesFile = path.join(process.cwd(), 'data', 'pages.json');

  // check if page is valid tournament
  // this is already covered by getStaticPaths but this is reassurance
  if (!fs.existsSync(folderPath)) {
    return { notFound: true };
  }

  const teamData: TTeamData[] = [];
  const teamObj = await jsonfile.readFile(path.join(folderPath, 'teams.json'));
  Object.keys(teamObj).forEach((key) => {
    teamData.push({
      id: key,
      ...teamObj[key],
      runsComplete: 0,
    });
  });

  const runRows: TRunRow[] = [];
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

  const metaDataData = await jsonfile.readFile(pagesFile);
  const metaData: TMetaData = await metaDataData[page];

  return {
    props: {
      runRows,
      teamData,
      upDATE,
      metaData,
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
