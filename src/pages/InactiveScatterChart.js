import React from 'react';
import { ResponsiveContainer } from 'recharts';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);



export default function InactiveScatterChart({ info }) {

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {

                    //beforeBody: playerName,
                    /* beforeLabel: playerName2,*/
                    label: (context) => {
                        console.log(context);
                        return `(${context.raw.y}, ${context.raw.x}) ${context.raw.village} `;
                    }
                }
            },
            legend: {
                position: 'chartArea',
            },
            title: {
                display: true,
                text: ' INACTIVE MAP ',
                
            },
        }
    };

    const data = {
        datasets: [
            {
                label: 'Inactive Villages',
                data: info.map((item) => (
                    {
                        
                        x: item.x,
                        y: item.y,
                        player: item.player,
                        village: item.village
                        
                    }
                )),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    return <ResponsiveContainer><Scatter options={options} data={data} /></ResponsiveContainer>;
}
