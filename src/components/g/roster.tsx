import React from 'react';

import { Typography } from '@mui/base';
import { DataGrid, GridSortModel } from '@mui/data-grid';

import { GuildRosterRow } from '../../types/gTypes';
import Indent from '../misc/indent';

export default function Roster({
  rosterRows,
  columns,
}: {
  rosterRows: GuildRosterRow[];
  columns: any;
}) {
  const [RosterSortModel, setRosterSortModel] = React.useState<GridSortModel>([
    {
      field: 'score',
      sort: 'desc',
    },
  ]);
  return (
    <div className="pb-0 pt-10">
      <Typography variant="h4">Roster:</Typography>
      <Indent className="mt-6">
        <DataGrid
          rows={rosterRows}
          columns={columns}
          disableSelectionOnClick
          disableExtendRowFullWidth
          autoHeight
          sortModel={RosterSortModel}
          onSortModelChange={(model) => setRosterSortModel(model)}
          pageSize={50}
        />
      </Indent>
    </div>
  );
}
