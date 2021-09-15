import React from 'react';

import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

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
      <Indent className="sm:pl-2 lg:pl-6 pb-0 pt-4">
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
                {team.name}
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
