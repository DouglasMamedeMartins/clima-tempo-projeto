import type { LocationData } from '../types/index'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

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
