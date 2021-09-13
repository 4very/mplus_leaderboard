/* eslint-disable react/jsx-props-no-spreading */
import * as fs from 'fs';
import path, { join } from 'path';

import React from 'react';

import { Typography } from '@material-ui/core';
import jsonfile from 'jsonfile';
import Link from 'next/link';

import HeaderBase from '../../../components/misc/headerBase';
import Indent from '../../../components/misc/indent';
import TournGraph from '../../../components/t/graph';
import { TMetaData } from '../../../types/tTypes';

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
  if (
    !fs.existsSync(folderPath) ||
    !fs.existsSync(join(folderPath, 'historical.json'))
  ) {
    return { notFound: true };
  }

  const histObj = await jsonfile.readFile(
    path.join(folderPath, 'historical.json')
  );
  const ilvlGraphData: Object[] = histObj.ilvl;
  const scoreGraphData: Object[] = histObj.tscore;

  const upDATE: string = fs.readFileSync(
    path.join(folderPath, 'upDATE'),
    'utf8'
  );

  const metaDataData = await jsonfile.readFile(pagesFile);
  const metaData: TMetaData = await metaDataData[page];

  return {
    props: {
      ilvlGraphData,
      scoreGraphData,
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
    paths,
    fallback: false,
  };
}
