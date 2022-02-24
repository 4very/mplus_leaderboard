import { GridCellParams } from '@mui/data-grid';
import moment from 'moment';

export interface Links {
  rbot: string;
  rio: string;
  armory: string;
  wcl: string;
}

export const usernameToLink = (params: GridCellParams) => (
  <a
    href={`https://raider.io/characters/us/${
      params.value.toString().split('-')[1]
    }/${params.value.toString().split('-')[0]}`}
    target="_blank"
    rel="noreferrer"
  >
    {params.value}
  </a>
);

export const timeToString = (params: GridCellParams) => (
  <div
    className={+params.value.valueOf() > 0 ? 'text-red-400' : 'text-green-400'}
  >
    {`${Math.floor(Math.abs(+params.value.valueOf()) / 60000)}:${(
      (Math.abs(+params.value.valueOf()) % 60000) /
      1000
    )
      .toFixed(0)
      .padStart(2, '0')}`}
  </div>
);

export const percentToString = (params: GridCellParams) => (
  <div
    className={+params.value.valueOf() > 0 ? 'text-red-400' : 'text-green-400'}
  >
    {Math.abs(Math.round(+params.value.valueOf() * 10000) / 100)}%
  </div>
);

export const strtolink = (params: GridCellParams) => (
  <a href={params.value.toString()} target="_blank" rel="noreferrer">
    <img
      className="linkImg"
      title="View Raider.io Page"
      src="/images/rio.png"
      alt=""
    />
  </a>
);

export const strToDate = (params: GridCellParams) => (
  <>{moment(params.value.toString()).utcOffset(-6).format('h:mm a, MM/DD')}</>
);

export const compareDate = (param1: string, param2: string) =>
  moment(param1).diff(moment(param2));

export const teamScoreRender = (params: GridCellParams) => (
  <div
    style={{
      color: params.row.color,
    }}
  >
    {params.value}
  </div>
);

export const runScoreRender = (params: GridCellParams) => (
  <div
    style={{
      color: params.row.scoreColor,
    }}
  >
    {params.value}
  </div>
);

export const classColorRender = (params: GridCellParams) => (
  <div
    style={{
      color: params.row.classColor,
    }}
  >
    {params.value}
  </div>
);

export const linksRender = (params: GridCellParams) => (
  <div style={{ display: 'flex', justifySelf: 'center' }}>
    <a target="_blank" href={(params.value as Links).armory} rel="noreferrer">
      <img
        className="linkImg"
        title="View Armory Page"
        src="/images/armory.png"
        alt=""
      />
    </a>
    <a target="_blank" href={(params.value as Links).rio} rel="noreferrer">
      <img
        className="linkImg"
        title="View Raider.io Page"
        src="/images/rio.png"
        alt=""
      />
    </a>
    <a target="_blank" href={(params.value as Links).rbot} rel="noreferrer">
      <img
        className="linkImg"
        title="View Raidbots Page"
        src="/images/rbots.png"
        alt=""
      />
    </a>
    <a target="_blank" href={(params.value as Links).wcl} rel="noreferrer">
      <img
        src="/images/wcl.png"
        className="linkImg"
        title="View Warcraft Logs Page"
        alt=""
      />
    </a>
  </div>
);

export const addFaction = (params: GridCellParams) => (
  <div className="flex">
    <img
      className="w-6 h-8 self-center mr-2"
      title="Faction"
      src={`/images/${params.row.faction.toLowerCase()}.png`}
      alt=""
    />
    {params.value}
  </div>
);

export const addRole = (params: GridCellParams) => (
  <img
    className="w-8 h-8 self-center block ml-auto mr-auto"
    title="Role"
    src={`/images/${params.row.role.toLowerCase()}.png`}
    alt=""
  />
);
export const addCov = (params: GridCellParams) => (
  <img
    className="max-h-10 self-center block ml-auto mr-auto"
    title="Covenant"
    src={
      params.row.covenant
        ? `/images/${params.row.covenant.toLowerCase()}.png`
        : ''
    }
    alt=""
  />
);

export const addClass = (params: GridCellParams) => (
  <img
    className="max-h-8 self-center block ml-auto mr-auto"
    title="Covenant"
    src={`/images/${params.value.toString().toLowerCase()}.png`}
    alt=""
  />
);

export const addFactionToRun = (params: GridCellParams) => (
  <div className="flex">
    <img
      className="w-6 h-8 self-center mr-2"
      title="Faction"
      src={`/images/${params.row.faction.toLowerCase()}.png`}
      alt=""
    />
    {params.value}
  </div>
);
