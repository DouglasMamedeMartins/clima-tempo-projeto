import type { WeatherInfo } from '../types/index'

const weatherCodeMap: Record<number, WeatherInfo> = {
  0:  { emoji: '☀️',  description: 'Clear sky' },
  1:  { emoji: '🌤️', description: 'Mainly clear' },
  2:  { emoji: '⛅',  description: 'Partly cloudy' },
  3:  { emoji: '☁️',  description: 'Overcast' },
  45: { emoji: '🌫️', description: 'Fog' },
  48: { emoji: '🌫️', description: 'Fog' },
  51: { emoji: '🌦️', description: 'Drizzle' },
  53: { emoji: '🌦️', description: 'Drizzle' },
  55: { emoji: '🌦️', description: 'Drizzle' },
  56: { emoji: '🌧️', description: 'Freezing drizzle' },
  57: { emoji: '🌧️', description: 'Freezing drizzle' },
  61: { emoji: '🌧️', description: 'Rain' },
  63: { emoji: '🌧️', description: 'Rain' },
  65: { emoji: '🌧️', description: 'Rain' },
  66: { emoji: '🌨️', description: 'Freezing rain' },
  67: { emoji: '🌨️', description: 'Freezing rain' },
  71: { emoji: '❄️',  description: 'Snow fall' },
  73: { emoji: '❄️',  description: 'Snow fall' },
  75: { emoji: '❄️',  description: 'Snow fall' },
  77: { emoji: '🌨️', description: 'Snow grains' },
  80: { emoji: '🌦️', description: 'Rain showers' },
  81: { emoji: '🌦️', description: 'Rain showers' },
  82: { emoji: '🌦️', description: 'Rain showers' },
  85: { emoji: '❄️',  description: 'Snow showers' },
  86: { emoji: '❄️',  description: 'Snow showers' },
  95: { emoji: '⛈️',  description: 'Thunderstorm' },
  96: { emoji: '⛈️',  description: 'Thunderstorm with hail' },
  99: { emoji: '⛈️',  description: 'Thunderstorm with hail' },
}

const UNKNOWN: WeatherInfo = { emoji: '🌡️', description: 'Unknown' }

export function getWeatherInfo(code: number): WeatherInfo {
  return weatherCodeMap[code] ?? UNKNOWN
}
