import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import TemperatureChart from "./components/TemperatureChart";
import Error from "./components/Error";
import WeatherAlerts from "./components/WeatherAlerts";
import Localization from "./components/Localization";
import Favorites from "./components/Favorites";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!selectedCity) return;

      setIsLoading(true);

      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
        );
        setWeatherData(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric`
        );

        if (forecastResponse.data && forecastResponse.data.list && forecastResponse.data.list.length > 0) {
          const dailyForecasts = [];
          const currentDate = new Date().getDate();

          forecastResponse.data.list.forEach(item => {
            const itemDate = new Date(item.dt * 1000).getDate();
            if (itemDate !== currentDate) {
              if (!dailyForecasts.some(f => new Date(f.dt * 1000).getDate() === itemDate)) {
                dailyForecasts.push(item);
              }
            }
          });

          setForecastData(dailyForecasts.slice(0, 7)); // Ensure 7-day forecast
        } else {
          setForecastData([]);
        }
      } catch (error) {
        setError('City not found or data unavailable');
        toast.error('City not found or data unavailable!', { 
            position: "top-center" 
        }); 
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCity, apiKey]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleAddFavorite = () => {
    if (selectedCity && !favorites.includes(selectedCity)) {
        const updatedFavorites = [...favorites, selectedCity];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toast.success('Added to Favorites!', { 
          position: "top-center" 
        }); 
    } else {
        toast.warning('Already in Favorites!', { 
            position: "top-center" 
        }); 
    }
  };

  const handleRemoveFavorite = (city) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast.info('Removed from Favorites!', { 
        position: "top-center" 
    }); 
  };

  return (
    <Container maxWidth="md" className="main-container">
      <Typography variant="h3" align="center" gutterBottom>
        Weather Dashboard
      </Typography>

      <Grid item xs={12} sx={{ textAlign: 'right', margin: '20px 0' }}>
        <Localization />
      </Grid>
      <SearchBar onCitySelect={handleCitySelect} />

      {selectedCity && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddFavorite}
          sx={{ margin: '10px auto', display: 'block' }}
        >
          Add to Favorites
        </Button>
      )}

      {isLoading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Error message={error} />
      ) : (
        <>
          <Grid container spacing={3}>
            {weatherData && (
              <Grid item xs={12}>
                <CurrentWeather weatherData={weatherData} />
                <WeatherAlerts weatherData={weatherData} />
              </Grid>
            )}
            {forecastData && (
              <Grid item xs={12}>
                <TemperatureChart forecastData={forecastData} />
              </Grid>
            )}
          </Grid>
          {forecastData && (
            <Grid container spacing={2} justifyContent="center">
              <Forecast city={selectedCity} forecastData={forecastData} />
            </Grid>
          )}
        </>
      )}

      <Favorites
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onCitySelect={handleCitySelect}
      />
      <ToastContainer />
    </Container>
  );
}

export default App;
