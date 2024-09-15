import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ApexChart ({ target_id, data, playerName }) {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  const [chartData, setChartData] = useState({
    series: [], // Empty initial state
    options: {
      chart: {
        height: '100%',
        width: '100%',
        
        type: 'heatmap',
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        heatmap: {
          reverseNegativeShade: true,
          useFillColorAsStroke: false,
          colorScale: {
            inverse: true,
            enableShades: true,
            ranges:  [
              { from: 0, to: 0, color: '#636160', name: 'Inactive' },
              { from: 1, to: 3, color: '#00A100', name: 'Low' },
              { from: 4, to: 7, color: '#128FD9', name: 'Medium' },
              { from: 8, to: 15, color: '#FFB200', name: 'High' },
              { from: 15, to: 200, color: '#FF0000', name: 'Extreme' },
            ],
          },
        },
      },
      colors: [
        '#F3B415', '#F27036', '#663F59', '#6A6E94', '#4E88B4', '#00A7C6',
        '#18D8D8', '#A9D794', '#46AF78', '#A93F55', '#8C5E58', '#2176FF',
        '#33A1FD', '#7A918D', '#BAFF29',
      ],
      xaxis: {
        type: 'category',
        categories: [], // Populate dynamically based on data
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function(_, { dataPointIndex, seriesIndex, w }) {
            // Safeguard to make sure we don't access undefined objects
            // console.log('w.config.series:', w.config.series);
            // console.log('dataPointIndex:', dataPointIndex);
            // console.log('seriesIndex:', seriesIndex);
            if (w.config.series && w.config.series[seriesIndex]) {
              const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
              if (dataPoint && dataPoint.t) {
                const timestamp = new Date(w.config.series[seriesIndex].data[dataPointIndex].t); 
                // console.log(w.config.series[seriesIndex].data[dataPointIndex].t) // Use the exact `t` timestamp
                const hours = timestamp.getUTCHours().toString().padStart(2, '0');
                // console.log(timestamp.getUTCHours())
                const minutes = timestamp.getMinutes().toString().padStart(2, '0');
                const day = timestamp.getDate();
                const month = timestamp.toLocaleString('default', { month: 'short' });
                const yPoint = w.config.series[seriesIndex].data[dataPointIndex].y
                return `${yPoint >= 0 ? `+${yPoint}`:`-${yPoint}`} @ ${hours}:${minutes} `; // Format: "11-Sep 13:45"
              }
            }
            return '+0'; // Fallback if no timestamp available or data is undefined
          }
          // formatter: function(value) {
          //   return `Pop: ${value >= 0 ? `+${value}`:`-${value}`}`; // Adds "Population Change" label
          // }
        },
        x: {
          formatter: function(_, { dataPointIndex, seriesIndex, w }) {
            // Safeguard to make sure we don't access undefined objects
            // console.log('w.config.series:', w.config.series);
            // console.log('dataPointIndex:', dataPointIndex);
            // console.log('seriesIndex:', seriesIndex);
            if (w.config.series && w.config.series[seriesIndex]) {
              const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
              if (dataPoint && dataPoint.t) {
                const timestamp = new Date(w.config.series[seriesIndex].data[dataPointIndex].t);  // Use the exact `t` timestamp
                // const hours = timestamp.getUTCHours().toString().padStart(2, '0');
                const hour = timestamp.toLocaleString('default', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true });
                const minutes = timestamp.getUTCMinutes().toString().padStart(2, '0');
                const day = timestamp.getUTCDate();
                const month = timestamp.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
                return `${day}-${month} ${hour}`;  // Format: "11-Sep 13:45"
              }
            }
            return '+0'; // Fallback if no timestamp available or data is undefined
          }
        }
      },
      title: {
        text: `${playerName} Hourly Log`,
      },
    },
  });

  useEffect(() => {
    // Convert the labels into 'DD-MMM' format
    const formattedCategories = data.labels.map(item => {
      const date = new Date(item);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      return `${day}-${month}`;
    });

    const series = hours.map(hour => {
      const filteredData = data.datasets[0].data.filter(row => (
        row.y === parseInt(hour, 10) &&
        row.player_id === target_id
      ));

      // Create an object to store the sum of y values for each date (hour)
      const summedData = filteredData.reduce((acc, row) => {
        const rowDate = new Date(row.x).toISOString().split('T')[0];
        if (!acc[rowDate]) {
          acc[rowDate] = { y: row.v, t: row.t }; // Initialize the sum with the first occurrence
        } else {
          acc[rowDate].y += row.v; // Sum the values if more entries exist for the same hour
        }
        return acc;
      }, {});

      // For each hour, check for missing data and fill with y: 0
      const filledData = data.labels.map(date => {
        const dateOnly = new Date(date).toISOString().split('T')[0];
        if (summedData[dateOnly]) {
          return {
            x: dateOnly, // Keep the date as is
            y: summedData[dateOnly].y, // Use the summed population increase value
            t: summedData[dateOnly].t
          };
        } else {
          return {
            x: dateOnly, // Keep the date
            y: 0, // Default to 0 if no matching data for this hour
            t: null // no timestamp available
          };
        }
      });

      // Return the hour and the data for that hour
      return {
        name: hour,
        data: filledData,
      };
    });
    
    setChartData(prevState => ({
      ...prevState,
      series,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: formattedCategories,
        },
      },
    }));
  }, [data, target_id]);

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="heatmap"
      height={'100%'}
      minHeight={515}
      width={'100%'}
    />
  );
};

// export default ApexChart;
