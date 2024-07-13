import React from 'react';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import {
  WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog
} from 'react-icons/wi';
import temperatureIcon from '../assets/temperature.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.gif';
import pressureIcon from '../assets/weather.png';

const weatherIconMap = {
  'Clear': WiDaySunny,
  'Clouds': WiCloudy,
  'Rain': WiRain,
  'Snow': WiSnow,
  'Thunderstorm': WiThunderstorm,
  'Drizzle': WiRain,
  'Atmosphere': WiFog,
};

function CurrentWeather({ weatherData }) {
  if (!weatherData) return null; // Don't render if no data

  const WeatherIcon = weatherIconMap[weatherData.weather[0].main] || WiDaySunny;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {weatherData.name}, {weatherData.sys.country}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {weatherData.weather[0].description}
        </Typography>

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <WeatherIcon size={80} />
          </Grid>
          <Grid item>
            <Typography variant="h2" component="div">
              {Math.round(weatherData.main.temp)}°C
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="body1">
              <img src={humidityIcon} alt="Humidity" style={{ width: 24, height: 24, marginRight: 8 }} /> Humidity: {weatherData.main.humidity}%
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <img src={windIcon} alt="Wind Speed" style={{ width: 24, height: 24, marginRight: 8 }} /> Wind Speed: {weatherData.wind.speed} m/s
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <img src={pressureIcon} alt="Pressure" style={{ width: 24, height: 24, marginRight: 8 }} /> Pressure: {weatherData.main.pressure} hPa
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CurrentWeather;
