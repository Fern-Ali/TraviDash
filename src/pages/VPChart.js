import React from 'react';
import { ResponsiveContainer } from 'recharts';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { purple, red, blue, green, teal, indigo, pink, orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

//export const options = {
//    responsive: true,
//    plugins: {
//        legend: {
//            position: 'top' as const,
//        },
//        title: {
//            display: true,
//            text: 'Chart.js Bar Chart',
//        },
//    },
//};




const VPChart = (props) => {
    //};

    const labels = props.flux.map((item) => (
        item.date
        ))


    const data = {
        labels,
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'VICTORY POINTS',
                        color: blue[300]
                    }
                }
            },     
            plugins: {
                legend: {
                    position: 'top',
                    display: 'true'
                },
                title: {
                    display: true,
                    text: 'TOP THREE ALLIANCES - VP',
                    color: blue[800]
                },
            },
        },
        datasets: [
            {
                label: 'Flux',
                data: props.flux.map((item) => (
                    item.totalVP
                )),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '[A.S]',
                data: props.as.map((item) => (
                    item.totalVP
                )),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'BomB',
                data: props.bomb.map((item) => (
                    item.totalVP
                )),
                backgroundColor: 'rgba(153, 162, 235, 0.5)',
            },
        ],
    };
    return (<ResponsiveContainer> <Bar data={data} options={ data.options }/></ResponsiveContainer>);
}
export default VPChart;