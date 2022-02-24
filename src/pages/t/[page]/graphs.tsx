/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { Typography } from '@mui/base';
import Link from 'next/link';

import HeaderBase from '../../../components/misc/headerBase';
import Indent from '../../../components/misc/indent';
import TournGraph from '../../../components/t/graph';
import { getGraphTournaments, getTData } from '../../../firebase/tdata';

export default function graphPage(props: any) {
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
        <TournGraph
          graphData={props.ilvlGraphData}
          header="Average Item Level:"
        />
        <TournGraph
          graphData={props.scoreGraphData}
          header="Team Raider.io Score:"
        />
      </Indent>
    </Indent>
  );
}

export async function getStaticProps(context: any) {
  const { page } = context.params;

  const { historical, update, meta } = await getTData(page);

  return {
    props: {
      ilvlGraphData: historical.ilvl,
      scoreGraphData: historical.tscore,
      update,
      metaData: meta,
      page,
    },
  };
}

export async function getStaticPaths() {
  const paths: Object[] = [];
  (await getGraphTournaments()).forEach((tournament) => {
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
