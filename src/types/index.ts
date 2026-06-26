export interface LocationData {
  name: string
  latitude: number
  longitude: number
  country_code: string
  timezone: string
}

export interface WeatherUnits {
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  wind_speed_10m: string
  wind_direction_10m: string
  precipitation_probability: string
}

export interface WeatherCurrent {
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  is_day: 0 | 1
  wind_speed_10m: number
  wind_direction_10m: number
  precipitation_probability: number
  weather_code: number
}

export interface WeatherData {
  units: WeatherUnits
  current: WeatherCurrent
}

export interface WeatherInfo {
  emoji: string
  description: string
}
