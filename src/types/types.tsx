export interface PropsType {
  runRows: RunRow[];
  teamRows: TeamRow[];
  upDATE: string;
}

export interface RunRow {
  id: string;
  team: string;
  dunegonName: string;
  keystoneLevel: string;
  score: number;
  dateCompleted: string;
  timerDiff: number;
  percDiff: number;
  fullTeam: boolean;
  link: string;
  keyUpgrade: number;
  creditCardInfo: boolean;
}

export interface TeamRow {
  id: string;
  team: string;
  runsCompleted: number;
  score: [number, string];
  tank: string;
  healer: string;
  dps1: string;
  dps2: string;
  dps3: string;
}
