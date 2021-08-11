// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

import { DataGrid } from '@material-ui/data-grid';

interface Props {
  teams: string[][];
  teamNames: string[][];
  runs: string[][];
}

interface RunRow {
  id: number;
  team: string;
  dunegonName: string;
}

export default function ContentPage(props: Props) { // eslint-disable-line
  // const router = useRouter();

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'team', headerName: 'Team Name', width: 200 },
    {
      field: 'dunegonName',
      headerName: 'Dungeon',
      width: 700,
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

  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  //
  // for (let i: number = 0; i < props.runs.length; i += 1) {
  //   rows.push({ id: i, team: props.runs[i][0], dungeon: runs[i][2] ?? '' });
  // }

  const rows: RunRow[] = [
    {
      id: 1,
      team: 'team 1',
      dunegonName: 'Mists of Tirna Scithe',
    },
  ];

  return (
    <div>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
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

  return {
    props: {
      teams,
      teamNames,
      runs,
    },
  };
}
