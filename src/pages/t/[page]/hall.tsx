import * as fs from 'fs';
import path from 'path';

import React from 'react';

import { Typography } from '@material-ui/core';
import jsonfile from 'jsonfile';
import Link from 'next/link';

import HeaderBase from '../../../components/misc/headerBase';
import Indent from '../../../components/misc/indent';
import { TMetaData, TTeamData } from '../../../types/tTypes';

export default function teamHall(props: any) {
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
        {props.teamData.map((team: any) => {
          return (
            <>
              <Typography
                variant="h3"
                key={team.id}
                className="font-serif mt-20"
              >
                <img
                  className="w-8 h-10 self-center mr-2 inline relative -top-1"
                  title="Faction"
                  src={`/images/${team.players[0].faction.toLowerCase()}.png`}
                  alt=""
                />
                {team.name}
              </Typography>
              <div
                key={team.id}
                className="mb-48"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5,300px)',
                  height: '350px',
                }}
              >
                {team.players.map((player: any) => {
                  return (
                    <div key={player.name}>
                      <img
                        src={player.render}
                        alt={player.name}
                        style={{
                          objectFit: 'cover',
                          width: '400px',
                          height: '500px',
                          position: 'relative',
                          top: '-80px',
                        }}
                      />
                      <Typography
                        style={{
                          position: 'relative',
                          textAlign: 'center',
                          top: '-150px',
                          color: `${player.classColor} !important`,
                        }}
                        variant="h4"
                        className="font-sans"
                      >
                        <a
                          href={player.links.armory}
                          style={{
                            color: `${player.classColor} !important`,
                          }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {player.title}
                        </a>
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
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

  const metaDataData = await jsonfile.readFile(pagesFile);
  const metaData: TMetaData = await metaDataData[page];

  return {
    props: {
      teamData,
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
