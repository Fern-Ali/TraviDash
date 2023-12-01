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
    };

    const data = {
        datasets: [
            {
                label: 'Inactive Villages',
                data: info.map((item) => (
                    {
                        
                        x: item.x,
                        y: item.y,
                        
                    }
                )),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    return <ResponsiveContainer><Scatter options={options} data={data} /></ResponsiveContainer>;
}
