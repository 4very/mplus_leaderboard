import React from 'react';

import { Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Link from 'next/link';

import HeaderBase from '../../../components/misc/headerBase';
import Indent from '../../../components/misc/indent';
import UpdateText from '../../../components/update';
import { getTData, getTournaments } from '../../../firebase/tdata';
import { TournTeamDetails, TPlayerRow } from '../../../types/tTypes';

export default function ContentPage(props: any) {
  return (
    <Indent>
      <HeaderBase
        dateFrom={props.metaData.startText}
        dateTo={props.metaData.endText}
        name={props.metaData.name}
      />
      <Indent>
        <Typography variant="h6" className="font-sans mt-1">
          <Link href={`/t/${props.page}`}>{'<< Go back to main page'}</Link>
        </Typography>
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

  const { teams, update, meta } = await getTData(page);

  const playerData: TPlayerRow[] = [];
  Object.keys(teams).forEach((key) => {
    teams[key].players.map((player: TPlayerRow) =>
      playerData.push({
        ...player,
        team: key,
      })
    );
  });

  return {
    props: {
      playerData,
      update,
      metaData: meta,
      page,
    },
  };
}

export async function getStaticPaths() {
  const paths: Object[] = [];
  (await getTournaments()).forEach((tournament) => {
    paths.push({
      params: {
        page: tournament,
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
}
