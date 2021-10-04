// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

import '@fontsource/roboto';

import { Typography } from '@material-ui/core';
import jsonfile from 'jsonfile';
import Link from 'next/link';

import Dungeons from '../../../components/dungeons';
import HeaderBase from '../../../components/misc/headerBase';
import Indent from '../../../components/misc/indent';
import TeamSection from '../../../components/t/teams';
import UpdateText from '../../../components/update';
import {
  TMetaData,
  tTeamColumns,
  TRunRow,
  TTeamData,
  tRunColumns,
} from '../../../types/tTypes';

export default function ContentPage(props: any) {
  return (
    <Indent>
      <HeaderBase
        dateFrom={props.metaData.startText}
        dateTo={props.metaData.endText}
        name={props.metaData.name}
      />
      <Indent>
        <Typography variant="h5" className="font-serifHeader">
          <Link href={`${props.page}/details`}>
            Click here to view full team details
          </Link>
          <div>
            <Link href={`${props.page}/graphs`}>Click here to view graphs</Link>
          </div>
        </Typography>

        <Dungeons runData={props.runRows} columns={tRunColumns} />
        <TeamSection teamData={props.teamData} columns={tTeamColumns} />
      </Indent>
      <UpdateText text={props.upDATE} />
    </Indent>
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
      page,
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
    paths: [
      {
        params: {
          page: 'tournament-2',
        },
      },
    ],
    fallback: false,
  };
}
