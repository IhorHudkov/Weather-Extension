import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Grid, Box, Paper, InputBase, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import './popup.css';
import WeatherCard from './WeatherCard';
import { getStoredCities } from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');

  useEffect(() => {
    getStoredCities().then((cities) => setCities([...cities]));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }
    setCities((prev) => [...prev, cityInput]);
    setCityInput('');
  };

  const handleDeleteButtonClick = (index) => {
    cities.splice(index, 1);
    setCities([...cities]);
  };

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => {
                  setCityInput(event.target.value);
                }}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleDeleteButtonClick(index)}
        />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container!);
root.render(<App />);
