// import { useRouter } from 'next/router';

import React from 'react';

import '@fontsource/roboto';

import { Typography } from '@mui/material';
import Link from 'next/link';

import Dungeons from '../../../components/dungeons';
import HeaderBase from '../../../components/misc/headerBase';
import Indent from '../../../components/misc/indent';
import TeamSection from '../../../components/t/teams';
import UpdateText from '../../../components/update';
import { getTData, getTournaments } from '../../../firebase/tdata';
import {
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
          {props.metaData.teamDetails ? (
            <Link href={`${props.page}/details`}>
              Click here to view full team details
            </Link>
          ) : (
            <></>
          )}

          {props.metaData.collectGraphs ? (
            <div>
              <Link href={`${props.page}/graphs`}>
                Click here to view graphs
              </Link>
            </div>
          ) : (
            <></>
          )}
          {props.metaData.teamHall ? (
            <div>
              <Link href={`${props.page}/hall`}>
                Click here to view the team hall
              </Link>
            </div>
          ) : (
            <></>
          )}
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

  const { teams, runs, update, meta } = await getTData(page);

  const teamData: TTeamData[] = [];
  Object.keys(teams).forEach((key) => {
    teamData.push({
      id: key,
      ...teams[key],
      runsComplete: 0,
    });
  });

  const runRows: TRunRow[] = [];

  if (runs !== undefined) {
    if (runs.data !== undefined) {
      Object.keys(runs.data).forEach((key) => {
        runRows.push({
          id: key,
          ...runs.data[key],
        });
      });
    } else {
      Object.keys(runs).forEach((key) => {
        runRows.push({
          id: key,
          ...runs[key],
        });
      });
    }
  }

  return {
    props: {
      runRows,
      teamData,
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
