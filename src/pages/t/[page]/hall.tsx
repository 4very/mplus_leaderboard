import React from 'react';

import { Typography } from '@mui/core';
import Link from 'next/link';

import HeaderBase from '../../../components/misc/headerBase';
import Indent from '../../../components/misc/indent';
import { getTData, getTournaments } from '../../../firebase/tdata';
import { TTeamData } from '../../../types/tTypes';

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
                  gridTemplateColumns: `repeat(${team.players.length},300px)`,
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

  const { teams, meta } = await getTData(page);

  const teamData: TTeamData[] = [];
  Object.keys(teams).forEach((key) => {
    teamData.push({
      id: key,
      ...teams[key],
      runsComplete: 0,
    });
  });

  return {
    props: {
      teamData,
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
