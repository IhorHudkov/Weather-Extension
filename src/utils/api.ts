import { config } from '../config';

export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

export async function fetchOpenWeatherData(
  sity: string
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${sity}&units=metric&appid=${config.OPEN_WEATHER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('City not found');
  }

  const data: OpenWeatherData = await res.json();
  return data;
}