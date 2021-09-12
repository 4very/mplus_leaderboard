import * as fs from 'fs';
import path from 'path';

import React from 'react';

import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import jsonfile from 'jsonfile';

import HeaderBase from '../../../components/misc/headerBase';
import Indent from '../../../components/misc/indent';
import UpdateText from '../../../components/update';
import { TMetaData, TournTeamDetails, TPlayerRow } from '../../../types/tTypes';

export default function ContentPage(props: any) {
  return (
    <Indent>
      <HeaderBase
        dateFrom={props.metaData.startText}
        dateTo={props.metaData.endText}
        name={props.metaData.name}
      />
      <Indent>
        <DataGrid
          rows={props.playerData}
          // @ts-ignore
          columns={TournTeamDetails}
          disableSelectionOnClick
          disableColumnMenu
          autoHeight
          disableExtendRowFullWidth
          hideFooter
          components={{ Toolbar: GridToolbar }}
        />
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

  const playerData: TPlayerRow[] = [];
  const teamObj = await jsonfile.readFile(path.join(folderPath, 'teams.json'));
  Object.keys(teamObj).forEach((key) => {
    teamObj[key].players.map((player: TPlayerRow) =>
      playerData.push({
        ...player,
        team: key,
      })
    );
  });

  const upDATE: string = fs.readFileSync(
    path.join(folderPath, 'upDATE'),
    'utf8'
  );

  const metaDataData = await jsonfile.readFile(pagesFile);
  const metaData: TMetaData = await metaDataData[page];

  return {
    props: {
      playerData,
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
