// import { useRouter } from 'next/router';
import * as React from 'react';
import '@fontsource/roboto';

import Dungeons from '../../components/dungeons';
import Roster from '../../components/g/roster';
import WeekNav from '../../components/g/weekNav';
import HeaderBase from '../../components/misc/headerBase';
import Indent from '../../components/misc/indent';
import UpdateText from '../../components/update';
import { getRoster, getWeekData, getWeekPaths } from '../../firebase/gdata';
import {
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

  const { runs, meta, update } = await getWeekData(week);

  const curWeek = meta.weekNum;
  if (week === 'current') {
    week = curWeek.toString();
  }

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
  const paths: Object[] = [
    {
      params: {
        week: 'current',
      },
    },
  ];

  (await getWeekPaths()).forEach((path_) => {
    paths.push({
      params: {
        week: path_,
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
}
