import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Card, CardContent, Typography } from '@mui/material';

Chart.register(...registerables);

function TemperatureChart({ forecastData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!forecastData) {
      return;
    }

    const labels = forecastData.map((item) => new Date(item.dt * 1000).toLocaleDateString());
    const temperatures = forecastData.map((item) => item.main.temp);

    const data = {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          fill: false,
          borderColor: "rgb(53, 162, 235)",
          tension: 0.1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      chartRef.current.chart = new Chart(chartRef.current, {
        type: "line",
        data: data,
        options: options,
      });
    }
  }, [forecastData]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          7-Day Temperature Forecast
        </Typography>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}

export default TemperatureChart;
