import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function WeatherAlerts({ weatherData }) {
  if (!weatherData || !weatherData.alerts || weatherData.alerts.length === 0) {
    return null;
  }

  return (
    <div>
      {weatherData.alerts.map((alert, index) => (
        <Alert severity="warning" key={index}>
          <AlertTitle>{alert.event}</AlertTitle>
          {alert.description}
        </Alert>
      ))}
    </div>
  );
}

export default WeatherAlerts;
