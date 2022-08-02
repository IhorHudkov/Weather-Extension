import { fetchOpenWeatherData } from '../utils/api';
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    homeCity: '',
    tempScale: 'metric',
    hasAutoOverlay: false,
  });

  chrome.contextMenus.create({
    contexts: ['selection'],
    id: 'weatherExtension',
    title: 'Add city to weather extension',
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, info.selectionText]);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options.homeCity === '') {
      return;
    }
    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp);
      const symbol = options.tempScale == 'metric' ? '\u2103' : '\u2109';
      chrome.action.setBadgeText({
        text: `${temp}${symbol}`,
      });
    });
  });
});
