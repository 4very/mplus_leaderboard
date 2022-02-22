// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import * as React from 'react';
import '@fontsource/roboto';

import jsonfile from 'jsonfile';

import Dungeons from '../../components/dungeons';
import Roster from '../../components/g/roster';
import WeekNav from '../../components/g/weekNav';
import HeaderBase from '../../components/misc/headerBase';
import Indent from '../../components/misc/indent';
import UpdateText from '../../components/update';
import { getRoster, getWeekData } from '../../firebase/gdata';
import {
  GuildMetaData,
  GuildPropsType,
  GuildRosterColumns,
  GuildRosterRow,
  GuildRunColumns,
  GuildRunRow,
} from '../../types/gTypes';

export default function GuildPage(props: GuildPropsType) {
  return (
    <Indent>
      <HeaderBase
        dateFrom={props.pageMetaData.start}
        dateTo={props.pageMetaData.end}
        name="Weekly Guild Leaderboard"
      >
        <WeekNav
          currNum={props.pageMetaData.num}
          nextLink={props.pageMetaData.nextLink}
          prevLink={props.pageMetaData.prevLink}
        />
      </HeaderBase>
      <Indent>
        <Dungeons runData={props.runRows} columns={GuildRunColumns} />
        <Roster rosterRows={props.rosterRows} columns={GuildRosterColumns} />
      </Indent>
      <UpdateText text={props.upDATE} />
    </Indent>
  );
}

export async function getStaticProps(context: any) {
  let { week } = context.params;

  const defFolderPath: string = path.join(process.cwd(), 'data', 'pages', 'g');
  const metaData: GuildMetaData = await jsonfile.readFile(
    path.join(defFolderPath, 'meta.json')
  );

  const curWeek = metaData.weekNum;

  if (week === 'current') {
    week = curWeek.toString();
  }

  const folderPath: string = path.join(defFolderPath, week);
  // const rosterPath: string = path.join(
  //   process.cwd(),
  //   'data',
  //   'pages',
  //   'g',
  //   'roster.json'
  // );

  // check if page is valid tournament
  // this is already covered by getStaticPaths but this is reassurance
  if (!fs.existsSync(folderPath)) {
    return { notFound: true };
  }

  // const rosterRows: GuildRosterRow[] = [];
  // const rosterObj = await jsonfile.readFile(rosterPath);
  // Object.keys(rosterObj).forEach((key) => {
  //   rosterRows.push({
  //     id: key,
  //     ...rosterObj[key],
  //   });
  // });

  const { runs, meta, update } = await getWeekData(week);

  const rosterRows: GuildRosterRow[] = [];
  const rosterObj = await getRoster();
  Object.keys(rosterObj).forEach((key) => {
    rosterRows.push({
      id: key,
      ...rosterObj[key],
    });
  });

  const runRows: GuildRunRow[] = [];
  Object.keys(runs.data).forEach((key) => {
    runRows.push({
      id: key,
      ...runs.data[key],
    });
  });

  meta.nextLink = curWeek > meta.num;
  meta.prevLink = meta.num > 2;

  return {
    props: {
      runRows,
      rosterRows,
      pageMetaData: meta,
      upDATE: update,
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
