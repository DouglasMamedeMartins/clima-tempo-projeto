import type { LocationData, WeatherData } from '../types/index'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

const CURRENT_FIELDS = [
  'precipitation_probability',
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'wind_speed_10m',
  'wind_direction_10m',
  'precipitation',
  'weather_code',
].join(',')

export async function getLocation(cityName: string): Promise<LocationData | null> {
  if (!cityName || cityName.trim() === '') {
    return null
  }

  try {
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(cityName.trim())}&count=1&language=en&format=json`
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (!data.results || data.results.length === 0) {
      return null
    }

    const result = data.results[0]

    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country_code: result.country_code,
      timezone: result.timezone,
    }
  } catch {
    return null
  }
}

export async function getWeather(
  latitude: number,
  longitude: number,
  timezone: string
): Promise<WeatherData | null> {
  if (latitude == null || longitude == null || !timezone || timezone.trim() === '') {
    return null
  }

  try {
    const url =
      `${FORECAST_URL}` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=${CURRENT_FIELDS}` +
      `&timezone=${encodeURIComponent(timezone)}`

    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (!data.current || !data.current_units) {
      return null
    }

    return {
      units: {
        temperature_2m:           data.current_units.temperature_2m,
        relative_humidity_2m:     data.current_units.relative_humidity_2m,
        apparent_temperature:     data.current_units.apparent_temperature,
        wind_speed_10m:           data.current_units.wind_speed_10m,
        wind_direction_10m:       data.current_units.wind_direction_10m,
        precipitation_probability: data.current_units.precipitation_probability,
      },
      current: {
        temperature_2m:           data.current.temperature_2m,
        relative_humidity_2m:     data.current.relative_humidity_2m,
        apparent_temperature:     data.current.apparent_temperature,
        is_day:                   data.current.is_day,
        wind_speed_10m:           data.current.wind_speed_10m,
        wind_direction_10m:       data.current.wind_direction_10m,
        precipitation_probability: data.current.precipitation_probability,
        weather_code:             data.current.weather_code,
      },
    }
  } catch {
    return null
  }
}
