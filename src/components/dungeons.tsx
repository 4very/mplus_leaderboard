import React from 'react';

import { Typography } from '@material-ui/core';
import { DataGrid, GridSortModel } from '@material-ui/data-grid';

import { GuildRunRow } from '../types/gTypes';
import { TRunRow } from '../types/tTypes';
import Indent from './misc/indent';

export default function Dungeons({
  runData,
  columns,
}: {
  runData: TRunRow[] | GuildRunRow[];
  columns: any;
}) {
  const [DungeonSortModel, setDungonSortModel] = React.useState<GridSortModel>([
    {
      field: 'dateCompleted',
      sort: 'desc',
    },
  ]);
  return (
    <>
      <Typography variant="h4" className="mt-8 font-serif">
        Dungeon Log:
      </Typography>
      <Indent className="mt-6">
        <DataGrid
          rows={runData}
          columns={columns}
          disableSelectionOnClick
          autoHeight
          disableExtendRowFullWidth
          sortModel={DungeonSortModel}
          onSortModelChange={(model) => setDungonSortModel(model)}
          pageSize={25}
        />
      </Indent>
    </>
  );
}
