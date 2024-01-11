import React from 'react';
import { useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter, getElementsAtEvent } from 'react-chartjs-2';


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);



export default function InactiveScatterChart({ info, belowOne, belowTwo, belowThree, belowFour, belowFive }) {
    const currEvent=[]
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
                        // console.log(context);
                        currEvent[0] = context;
                        console.log(currEvent)
                        return `(${context.raw.x}, ${context.raw.y}) ${context.raw.village} `;
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
                label: '100-200',
                data: belowOne.map((item) => (
                    {
                        
                        x: item.x,
                        y: item.y,
                        player: item.player,
                        village: item.village,
                        link: `https://sow.x1.europe.travian.com/karte.php?newdid=16778&x=${item.x}&y=${item.y}`
                        
                    }
                )),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: '200-300',
                data: belowTwo.map((item) => (
                    {

                        x: item.x,
                        y: item.y,
                        player: item.player,
                        village: item.village,
                        link: `https://sow.x1.europe.travian.com/karte.php?newdid=16778&x=${item.x}&y=${item.y}`

                    }
                )),
                backgroundColor: 'rgba(132, 99, 255, 1)',
            },
            {
                label: '300-400',
                data: belowThree.map((item) => (
                    {

                        x: item.x,
                        y: item.y,
                        player: item.player,
                        village: item.village,
                        link: `https://sow.x1.europe.travian.com/karte.php?newdid=16778&x=${item.x}&y=${item.y}`

                    }
                )),
                backgroundColor: 'rgba(132, 255, 99, 1)',
            },
            {
                label: '400-500',
                data: belowFour.map((item) => (
                    {

                        x: item.x,
                        y: item.y,
                        player: item.player,
                        village: item.village,
                        link: `https://sow.x1.europe.travian.com/karte.php?newdid=16778&x=${item.x}&y=${item.y}`

                    }
                )),
                backgroundColor: 'rgba(132, 0, 99, 1)',
            },
            {
                label: '500+ population',
                data: belowFive.map((item) => (
                    {

                        x: item.x,
                        y: item.y,
                        player: item.player,
                        village: item.village,
                        link: `https://sow.x1.europe.travian.com/karte.php?newdid=16778&x=${item.x}&y=${item.y}`

                    }
                )),
                backgroundColor: 'rgba(0, 99, 255, 1)',
            },
        ],
    };
    const chartRef = useRef();
    const onClick = (event) => {
        if(getElementsAtEvent(chartRef.current, event).length > 0) {
            console.log(getElementsAtEvent(chartRef.current, event))
            console.log(currEvent[0].element.$context.raw.link)
            window.open(currEvent[0].element.$context.raw.link, '_blank')
        }
        
        
    }
    return <ResponsiveContainer><Scatter onClick={onClick} ref={chartRef} options={options} data={data} /></ResponsiveContainer>;
}
