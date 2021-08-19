export interface PropsType {
  runRows: RunRow[];
  teamRows: TeamRow[];
  upDATE: string;
}

export interface RunRow {
  id: string;
  name: string;
  dunegonName: string;
  keystoneLevel: string;
  score: number;
  dateCompleted: string;
  timeDiff: number;
  percDiff: number;
  url: string;
  keyMod: number;
}

export interface TeamRow {
  id: string;
  team: string;
  runsCompleted: number;
  score: number;
  tank: string;
  healer: string;
  dps1: string;
  dps2: string;
  dps3: string;
  scoreColor: string;
}
