import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  Switch,
} from '@mui/material';
import './options.css';
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from '../utils/storage';

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('ready');

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  if (!options) {
    return null;
  }

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleSaveButtonClick = () => {
    setFormState('saving');
    setStoredOptions(options).then(() => {
      setTimeout(() => setFormState('ready'), 1000);
    });
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    });
  };

  const isFieldsDisabled = formState === 'saving';

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container flexDirection="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city name"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Auto toggle overlay on webpage load
              </Typography>
              <Switch
                color="primary"
                disabled={isFieldsDisabled}
                onChange={(event, checked) => handleAutoOverlayChange(checked)}
                checked={options.hasAutoOverlay}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldsDisabled}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
