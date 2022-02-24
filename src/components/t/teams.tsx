import React from 'react';

import { Typography } from '@mui/core';
import { DataGrid } from '@mui/data-grid';

import { TTeamData } from '../../types/tTypes';
import Indent from '../misc/indent';

export default function TeamSection({
  teamData,
  columns,
}: {
  teamData: TTeamData[];
  columns: any;
}) {
  return (
    <div className="pt-10 pb-0">
      <Typography variant="h4" className="font-serif">
        Teams:
      </Typography>
      <Indent className="sm:pl-2 lg:pl-6 pb-0 pt-4 grid 2xl:grid-cols-2">
        {teamData.map((team) => {
          return (
            <div className="mb-10" key={team.id}>
              <Typography variant="h5" className="font-serif">
                <img
                  className="w-6 h-8 self-center mr-2 inline"
                  title="Faction"
                  src={`/images/${team.players[0].faction.toLowerCase()}.png`}
                  alt=""
                />
                {`${team.name} (${team.id})`}
              </Typography>
              <Indent className="">
                <Typography className="font-serif" variant="h6">
                  {`Average ilvl: ${team.avgilvl}`}
                </Typography>
                <Typography className="font-serif -mt-2" variant="h6">
                  {'Team score: '}
                  <span
                    style={{
                      color: team.scoreColor,
                    }}
                  >
                    {team.score}
                  </span>
                </Typography>

                <Typography className="font-serif -mt-2" variant="h6">
                  {`Highest Key Timed: `}
                  {team.highestkey.link === null ? (
                    team.highestkey.str
                  ) : (
                    <>
                      {team.highestkey.str}
                      <a
                        href={team.highestkey.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="linkImg inline h-5 w-5 align-middle mb-1"
                          title="View Raider.io Page"
                          src="/images/rio.png"
                          alt=""
                        />
                      </a>
                    </>
                  )}
                </Typography>
                <Typography className="font-serif -mt-2" variant="h6">
                  {`Num of Keys Done: ${team.numkeys}`}
                </Typography>
              </Indent>

              <Indent>
                <DataGrid
                  rows={team.players}
                  columns={columns}
                  disableSelectionOnClick
                  disableExtendRowFullWidth
                  autoHeight
                  hideFooter
                />
              </Indent>
            </div>
          );
        })}
      </Indent>
    </div>
  );
}
