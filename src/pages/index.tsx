// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';

interface Props {
  teams: string[][];
  teamNames: string[][];
  runs: string[][];
  rows: RunRow[];
}

interface RunRow {
  id: string;
  team: string;
  dunegonName: string;
  keystoneLevel: string;
  score: number;
  dateCompleted: string;
}

export default function ContentPage(props: Props) { // eslint-disable-line
  // const router = useRouter();

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, hide: true },
    { field: 'team', headerName: 'Team', width: 120 },
    {
      field: 'dunegonName',
      headerName: 'Dungeon',
      width: 200,
    },
    {
      field: 'keystoneLevel',
      headerName: 'Key Level',
      width: 150,
    },
    { field: 'score', headerName: 'Score', width: 130, type: 'number' },
    {
      field: 'dateCompleted',
      headerName: 'Completed',
      width: 200,
    },

    // {
    //   field: 'lastName',
    //   headerName: 'Last name',
    //   width: 200,
    //   editable: true,
    // },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 150,
    //   editable: true,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
  ];

  return (
    <div>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={props.rows} columns={columns} disableSelectionOnClick />
      </div>
      <ul>
        {props.teams.map((team) => (
          <li key={team[0]}>
            {team[0]}
            <ul>
              {team.slice(1).map((team_member) => (
                <li key={team_member}>{team_member}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ul>
        {props.runs.map((run) => (
          <li key={`${run[1]}`}>
            {run[0]}
            <ul>
              {run.slice(1).map((run_data) => (
                <li key={`${run_data}`}>{run_data}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ul>
        {props.teamNames.map((teamName) => (
          <li key={teamName[1]}>
            {teamName[0]}
            <br />
            {teamName[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const teamsRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'teams.csv'), 'utf8')
    .split('\n');
  const teams: string[][] = [];
  for (let i: number = 0; i < teamsRaw.length; i += 1) {
    teams.push(teamsRaw[i]?.split(',') ?? []);
  }

  const teamsNamesRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'team_names.csv'), 'utf8')
    .split('\n');
  const teamNames: string[][] = [];
  for (let i: number = 0; i < teamsNamesRaw.length; i += 1) {
    teamNames.push(teamsNamesRaw[i]?.split(';') ?? []);
  }

  const runsRaw = fs
    .readFileSync(path.join(process.cwd(), 'data', 'runs.csv'), 'utf8')
    .split('\n');
  const runs: string[][] = [];
  for (let i: number = 0; i < runsRaw.length; i += 1) {
    runs.push(runsRaw[i]?.split(',') ?? []);
  }

  const rows: RunRow[] = [];

  for (let i: number = 0; i < runs.length; i += 1) {
    rows.push({
      id: runs[i][1],
      team: runs[i][0],
      dunegonName: runs[i][2],
      keystoneLevel: runs[i][5],
      score: +runs[i][4],
      dateCompleted: moment(runs[i][7]).utcOffset(-6).format('h:m a, MM/DD'),
    });
  }

  return {
    props: {
      teams,
      teamNames,
      runs,
      rows,
    },
  };
}
