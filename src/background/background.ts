import {
  getStoredCities,
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
});

chrome.contextMenus.onClicked.addListener((info) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, info.selectionText]);
  });
});
