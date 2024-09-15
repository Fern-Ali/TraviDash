


import React from 'react';
import { ResponsiveContainer } from 'recharts';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export default function PolarChart({ info }) {
    /*{ ChartJS.defaults.global.legend.display = false; }*/
    { ChartJS.overrides.polarArea.plugins.legend.display = true; }
    const fluxData = info.filter(item => item.aid == 92)
    const fluxHarbor = fluxData.filter(item => item.harbor === true)
    const asData = info.filter(item => item.aid == 1)
    const asHarbor = asData.filter(item => item.harbor === true)
    const bombData = info.filter(item => item.aid == 22)
    const bombHarbor = bombData.filter(item => item.harbor === true)
    const data = {
        labels: [`Flux`, 'A.S.', 'BomB'/*, 'Green', 'Purple', 'Orange'*/],

        datasets: [
            {
                label: `# of Harbors`,

                data: [fluxHarbor.length, asHarbor.length, bombHarbor.length,/* 5, 2, 3*/],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    //'rgba(75, 192, 192, 0.5)',
                    //'rgba(153, 102, 255, 0.5)',
                    //'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],

    };
  return (
    <React.Fragment>
          {/*<Title>SOW Villages</Title>*/}
          <ResponsiveContainer>
              
          <PolarArea data={data } />
              </ResponsiveContainer>
    </React.Fragment>
  );
}
