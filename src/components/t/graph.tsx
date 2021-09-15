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
import { Typography } from '@material-ui/core';

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
  graphData,
  header,
}: {
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
              '#065F46',
            ]}
          />

          <ArgumentAxis
            labelComponent={renderGreyText}
            // rootComponent={renderTickElement}
          />
          {/* <ArgumentAxis /> */}
          <ValueAxis labelComponent={renderGreyText} showLine />

          <LineSeries name="TTC" valueField="TTC" argumentField="day" />
          <LineSeries name="ASC" valueField="ASC" argumentField="day" />
          <LineSeries name="meat" valueField="meat" argumentField="day" />
          <LineSeries name="WSRF2T" valueField="WSRF2T" argumentField="day" />
          <LineSeries name="TST" valueField="TST" argumentField="day" />
          <LineSeries name="STISB" valueField="STISB" argumentField="day" />
          <LineSeries name="WAFI" valueField="WAFI" argumentField="day" />
          <LineSeries name="scale" valueField="scale" argumentField="day" />

          <Legend />
          <Tooltip />
        </Chart>
      </Indent>
    </>
  );
}
