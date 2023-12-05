import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { ResponsiveContainer } from 'recharts';
import { purple, red, blue, green, teal, indigo, pink, orange } from '@mui/material/colors';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);


//const data = {
//    datasets: [
//        {
//            label: 'Red dataset',
//            data: Array.from({ length: 50 }, () => ({
//                x: faker.datatype.number({ min: -100, max: 100 }),
//                y: faker.datatype.number({ min: -100, max: 100 }),
//                r: faker.datatype.number({ min: 5, max: 20 }),
//            })),
//            backgroundColor: 'rgba(255, 99, 132, 0.5)',
//        },
//        {
//            label: 'Blue dataset',
//            data: Array.from({ length: 50 }, () => ({
//                x: faker.datatype.number({ min: -100, max: 100 }),
//                y: faker.datatype.number({ min: -100, max: 100 }),
//                r: faker.datatype.number({ min: 5, max: 20 }),
//            })),
//            backgroundColor: 'rgba(53, 162, 235, 0.5)',
//        },
//    ],
//};

const colorPicker = { '1': 'rgba(53, 162, 235, 0.5)', 92: 'rgba(255, 99, 132, 0.5)', 22: 'rgba(153, 162, 235, 0.5)' }
const alliancePicker = ['Flux', 'AS', 'BoMB']
const BubbleChart = (props) => {

    const fluxData = props.test.filter(item => item.aid == 92)
    const asData = props.test.filter(item => item.aid == 1)
    const bombData = props.test.filter(item => item.aid == 22)
    const names = props.test.map((item) => (
        item.player
    ))
    
    
    //const playerName = (tooltipItems) => {
    //    let sum = '';
    //    let boo = '';
    //    let idx = 0;

    //    //tooltipItems.forEach(function (tooltipItem) {

    //    //    idx++
    //    //    sum = names[idx];
    //    //    boo = tooltipItem.parsed.y;
    //    //    ;
    //    //});
    //    tooltipItems.map((item) => (
            
    //        boo = names[idx]

    //        ))
    //    return `Player: ${names[idx]} ${boo}`
    //};

    //const playerName2 = (tooltipItem) => {
    //    let sum = '';
    //    let boo = '';
    //    let idx = 0;

    //    //tooltipItems.forEach(function (tooltipItem) {

    //    //    idx++
    //    //    sum = names[idx];
    //    //    boo = tooltipItem.parsed.y;
    //    //    ;
    //    //});
    //    names.map((item) => (

    //        boo = item

    //    ))
    //    return `Player: ${names[idx]} ${boo}`
    //};
    const options = {
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'VICTORY POINTS',
                    color: blue[800],
                    padding: 0
                }
            },
        },
        plugins: {
            tooltip: {
                callbacks: {

                    //beforeBody: playerName,
                   /* beforeLabel: playerName2,*/
                    label: (context) => {
                        console.log(context);
                        return `${context.raw.player} in ${context.raw.r} Villages: [VP - ${context.raw.y}], [Pop: ${context.raw.x}]`;
                    }
                }
            },
            legend: {
                position: 'chartArea',
            },
            title: {
                display: true,
                text: '  VP DISTRIBUTION - TOP 3 ALLIANCES  ',
                color: blue[800]
            },
        }
    };
    const data = {
        datasets: alliancePicker.map((item) => (
            {
            label: item,

            data: props.test.map((item) => (

                { x: item.totalPop, y: item.vp, r: item.vp/item.numVillages, player: item.player }
                
            )),
            backgroundColor: colorPicker[92]

            
        }))
        
    }
    //const data = {
    //    datasets: props.test.map((item) => (
    //        {
    //            label: item.alliance,
    //            data: { x: item.totalPop, y: item.vp, r: item.numVillages },
    //            backgroundColor: colorPicker[item.aid]
    //        }
            
    //        )),
    //}
     /*OTHER RADIUS = r: (item.sumVP / item.numVillages)*/
    const data2 = {
        datasets: [
            {
                label: 'Flux',

                data: fluxData.map((item) => (

                    { x: item.totalPop, y: item.sumVP, r: item.numVillages, player: item.player, test: (item.sumVP / item.numVillages)/100 }

                )),
                backgroundColor: colorPicker[92]


            },
            {
                label: 'AS',

                data: asData.map((item) => (

                    { x: Number(item.totalPop), y: item.sumVP, r: item.numVillages, player: item.player }

                )),
                backgroundColor: colorPicker[1]


            },
            {
                label: 'BomB',

                data: bombData.map((item) => (

                    { x: Number(item.totalPop), y: item.sumVP, r: item.numVillages, player: item.player }

                )),
                backgroundColor: colorPicker[22]


            }
        ]

    }

    return (
        <ResponsiveContainer sx={{ backgroundColor: 'blue' }} >

            <Bubble
                options={options}
                data={ data2 } /></ResponsiveContainer>
        );
}
export default BubbleChart;