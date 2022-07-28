import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import './popup.css';
import WeatherCard from './WeatherCard';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(['Toronto', 'Kyiv', 'Error']);
  return (
    <div>
      <Paper>
        <InputBase />
        <IconButton>
          <AddIcon />
        </IconButton>
      </Paper>
      {cities.map((city, index) => (
        <WeatherCard city={city} key={index} />
      ))}
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container!);
root.render(<App />);
