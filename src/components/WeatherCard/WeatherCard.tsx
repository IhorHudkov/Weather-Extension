import React, { useEffect, useState } from 'react';

import './WeatherCard.css';

import {
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from '../../utils/api';

import {
  CardActions,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

type WeatherCardState = 'loading' | 'error' | 'ready';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx="4px" my="16px">
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button onClick={onDelete} color="secondary">
              <Typography className="weatherCard-body">Delete</Typography>
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

const WeatherCard: React.FC<{
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('loading');

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState('ready');
      })
      .catch((err) => setCardState('error'));
  }, [city, tempScale]);

  if (cardState == 'error' || cardState == 'loading') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
          {cardState == 'loading'
            ? 'Loading...'
            : 'Error: could not retrieve weather data for this city'}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className="weatherCard-title">{weatherData.name}</Typography>
      <Typography className="weatherCard-body">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography className="weatherCard-body">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
