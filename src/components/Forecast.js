import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { format } from 'date-fns';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from 'react-icons/wi';

const weatherIconMap = {
  Clear: WiDaySunny,
  Clouds: WiCloudy,
  Rain: WiRain,
  Snow: WiSnow,
  Thunderstorm: WiThunderstorm,
  Drizzle: WiRain,
  Atmosphere: WiFog,
};

function Forecast({ forecastData }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        7-Day Forecast
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {forecastData.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const formattedDate = format(date, 'EEEE, MMM d');
          const temperature = day.main.temp.toFixed(1);
          const weatherMain = day.weather[0].main;
          const precipitation = day.pop * 100; 
          const WeatherIcon = weatherIconMap[weatherMain] || WiFog;

          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className="forecast-card">
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    {formattedDate}
                  </Typography>
                  <WeatherIcon size={50} />
                  <Typography variant="h5">{`${temperature}°C`}</Typography>
                  <Typography variant="subtitle1">{weatherMain}</Typography>
                  <Typography variant="subtitle2">{`Precipitation: ${precipitation.toFixed(1)}%`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Forecast;
