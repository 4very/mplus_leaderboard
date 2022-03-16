import React from 'react';

import { Palette } from '@devexpress/dx-react-chart';
import {
  ValueAxis,
  Chart,
  LineSeries,
  Tooltip,
  ArgumentAxis,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Typography } from '@mui/material';

import Indent from '../misc/indent';

const renderGreyText = (data: any) => {
  return (
    <text
      x={data.x}
      y={data.y}
      dy={data.dy}
      textAnchor={data.textAnchor}
      className="font-serif text-fontGrey text-lg"
      style={{
        fill: '#fffff8',
      }}
    >
      {data.text}
    </text>
  );
};

export default function TournGraph({
  lines,
  graphData,
  header,
}: {
  lines: string[];
  graphData: any;
  header: String;
}) {
  return (
    <>
      <Typography variant="h4" className="mt-8 font-serif">
        {header}
      </Typography>
      <Indent className="max-w-7xl mt-4">
        <Chart data={graphData}>
          <Palette
            scheme={[
              '#3B82F6',
              '#34D399',
              '#F87171',
              '#FCD34D',
              '#EC4899',
              '#F9FAFB',
              '#065F46',
            ]}
          />

          <ArgumentAxis
            labelComponent={renderGreyText}
            // rootComponent={renderTickElement}
          />
          {/* <ArgumentAxis /> */}
          <ValueAxis labelComponent={renderGreyText} showLine />

          {lines.map((line: string) => {
            return (
              <LineSeries
                key={line}
                name={line}
                valueField={line}
                argumentField="day"
              />
            );
          })}

          <Legend />
          <Tooltip />
        </Chart>
      </Indent>
    </>
  );
}
