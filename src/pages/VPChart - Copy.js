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


ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

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
    const data = {
        datasets: alliancePicker.map((item) => (
            {
            label: item,

            data: props.test.map((item) => (

                { x: item.totalPop, y: item.vp, r: item.numVillages }
                
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
     
    const data2 = {
        datasets: [
            {
                label: 'Flux',

                data: fluxData.map((item) => (

                    { x: Number(item.totalPop), y: Number(item.vp), r: Number(item.numVillages) }

                )),
                backgroundColor: colorPicker[92]


            },
            {
                label: 'AS',

                data: asData.map((item) => (

                    { x: Number(item.totalPop), y: Number(item.vp), r: 10 }

                )),
                backgroundColor: colorPicker[1]


            },
            {
                label: 'BomB',

                data: bombData.map((item) => (

                    { x: Number(item.totalPop), y: Number(item.vp), r: Number(item.numVillages) }

                )),
                backgroundColor: colorPicker[22]


            }
        ]

    }

    return (
        <ResponsiveContainer>

            <Bubble
                options={options}
                data={ data2 } /></ResponsiveContainer>
        );
}
export default BubbleChart;