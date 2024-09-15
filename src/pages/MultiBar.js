import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

export default function MultiBar({ dataset, labels, villageIds, playerNames}) {
  // Helper function to aggregate the data by village ID and day
  const aggregateDataByDay = (data) => {
    const aggregatedData = {};

    data.forEach((row) => {
      const day = row.x.split('T')[0]; // Extract the day (e.g., "2024-09-10")
      const villageId = row.player_id;

      // Initialize nested objects if not present
      if (!aggregatedData[villageId]) {
        aggregatedData[villageId] = {};
      }
      if (!aggregatedData[villageId][day]) {
        aggregatedData[villageId][day] = 0;
      }

      // Add up the population increases
      aggregatedData[villageId][day] += row.v;
    });

    return aggregatedData;
  };

  // Ensure we pass the correct data into the aggregation function
  const aggregatedData = aggregateDataByDay(dataset.datasets[0].data);
  // Create the dataset array
  const dataPoints = labels.map((day) => {
    const dataPoint = { day: day.split('T')[0] };

    villageIds.forEach((villageId) => {
      // Ensure that the aggregatedData for a villageId and day exists before trying to access it
      const villageData = aggregatedData[villageId] || {};  // Default to an empty object if no data exists for this villageId
      const population_increase = villageData[day.split('T')[0]] || 0;  // Default to 0 if no data exists for this day
      dataPoint[`village_${villageId}`] = population_increase;
    });

    return dataPoint;
  });

  // Create the series array
 // Create a dictionary where keys are villageIds (uid) and values are player names

  const series = villageIds.map((villageId) => {
    const player = playerNames.find(player => player.uid === villageId);
    return {
      dataKey: `village_${villageId}`,
      label: `${player ? player.name : 'Unknown'}`,  // If the player is found, use the name, otherwise use 'Unknown'
      // Add other properties as needed...
    };
  });

  const chartSetting = {
    yAxis: [
      {
        label: 'Population',
      },
    ],
    // width: 700,
    height: 200,
    margin: { top: 20, right: 30, bottom: 20, left: 70 }, // Adjust left to give more space
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
  

  return (
    <BarChart
      dataset={dataPoints}
      xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
      series={series}
      {...chartSetting}
    />
  );
}
