// import { useRouter } from 'next/router';
import * as fs from 'fs';
import path from 'path';

import React from 'react';

interface Props {
  teams: string[][];
  runs: string[][];
}

export default function ContentPage(props: Props) { // eslint-disable-line
  // const router = useRouter();

  return (
    <div>
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
          <li key={`${run[0]}runs`}>
            {run[0]}
            <ul>
              {run.slice(1).map((run_data) => (
                <li key={`${run_data}`}>{run_data}</li>
              ))}
            </ul>
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
      runs,
    },
  };
}
