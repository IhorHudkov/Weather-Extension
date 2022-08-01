import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Grid, Box, Paper, InputBase, IconButton } from '@mui/material';
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from '@mui/icons-material';
import './popup.css';
import WeatherCard from '../components/WeatherCard';
import {
  getStoredCities,
  setStoredCities,
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';
import { Messages } from '../utils/messages';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities([...cities]));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }

    const updatedCities = [...cities, cityInput];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleDeleteButtonClick = (index) => {
    cities.splice(index, 1);

    const updatedCities = [...cities];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale == 'metric' ? 'imperial' : 'metric',
    };
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    });
  };

  const handleOverlayButtonClick = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
        }
      }
    );
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-evenly">
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
        <Grid item>
          <Box py="3.5px">
            <Paper>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale == 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Paper>
          </Box>
        </Grid>
        <Grid item>
          <Box py="3.5px">
            <Paper>
              <IconButton onClick={handleOverlayButtonClick}>
                <PictureInPictureIcon />
              </IconButton>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {options.homeCity !== '' && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
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
