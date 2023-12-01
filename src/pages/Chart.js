import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';


// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('18 Nov', 8885),
  createData('19 Nov', 8862),
  createData('20 Nov', 8784),
  createData('21 Nov', 8742),
  createData('22 Nov', 8710),
  createData('23 Nov', 8657),
  createData('24 Nov', 8594),
  
  
];
ChartJS.register(ArcElement, Tooltip, Legend);



export default function Chart({ flux, as, bomb, info }) {
    const theme = useTheme();
    { ChartJS.overrides.doughnut.plugins.legend.display = true; }
    const data1 = {
        labels: ['FLUX', '[A.S.]', 'BomB', /*'Green', 'Purple', 'Orange'*/],
        datasets: [
            {
                label: 'Victory Points',
                data: [flux[flux.length - 1].totalVP, as[as.length - 1].totalVP, bomb[bomb.length-1].totalVP,/* 5, 2, 3*/],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 162, 235, 0.2)',
                    //'rgba(75, 192, 192, 0.2)',
                    //'rgba(153, 102, 255, 0.2)',
                    //'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 162, 235, 1)',
                    //'rgba(75, 192, 192, 1)',
                    //'rgba(153, 102, 255, 1)',
                    //'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
  return (
    <React.Fragment>
      {/*<Title>SOW Villages</Title>*/}
        
      <ResponsiveContainer minWidth='100px'>
        <Doughnut data={data1} />

        {/*<LineChart*/}
        {/*  data={data}*/}
        {/*  margin={{*/}
        {/*    top: 16,*/}
        {/*    right: 16,*/}
        {/*    bottom: 0,*/}
        {/*    left: 24,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <XAxis*/}
        {/*    dataKey="time"*/}
        {/*    stroke={theme.palette.text.secondary}*/}
        {/*    style={theme.typography.body2}*/}

        {/*  />*/}
        {/*  <YAxis*/}
        {/*    stroke={theme.palette.text.secondary}*/}
        {/*    style={theme.typography.body2}*/}
        {/*    type="number" domain={[8500, 8885]}*/}
        {/*  >*/}
        {/*    <Label*/}
        {/*      angle={270}*/}
        {/*      position="left"*/}
        {/*      style={{*/}
        {/*        textAnchor: 'middle',*/}
        {/*        fill: theme.palette.text.primary,*/}
        {/*        ...theme.typography.body1,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Total Villages*/}
        {/*    </Label>*/}
        {/*  </YAxis>*/}
        {/*  <Line*/}
        {/*    isAnimationActive={true}*/}
        {/*    type="monotone"*/}
        {/*    dataKey="amount"*/}
        {/*    stroke={theme.palette.primary.main}*/}
        {/*    fill="white"*/}
        {/*    dot={true}*/}
        {/*  />*/}
        {/*</LineChart>*/}
      </ResponsiveContainer>
    </React.Fragment>
  );
}
