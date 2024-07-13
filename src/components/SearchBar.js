import React, { useState } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import axios from 'axios';

function SearchBar({ onCitySelect }) {
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchSuggestions = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}&type=like&sort=population&cnt=5`
      );

      if (response.data && response.data.list) {
        const uniqueCityNames = new Set();
        const uniqueOptions = response.data.list.filter(option => {
          if (!uniqueCityNames.has(option.name)) {
            uniqueCityNames.add(option.name);
            return true; 
          }
          return false; 
        });
        setOptions(uniqueOptions);
      } else {
        setOptions([]);
        console.error('Unexpected API response format:', response.data);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event, value) => {
    setSearchText(value);
    if (value && value.length > 2) {  
      fetchSuggestions(value);
    } else {
      setOptions([]);
    }
  };

  const handleOptionSelect = (event, value) => {
    if (value) {
      onCitySelect(value.name);
      setSearchText('');
      setOptions([]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.name || ''} 
      inputValue={searchText}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search City"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}


export default SearchBar;
