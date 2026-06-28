import type { LocationData, WeatherData } from './types/index'
import { getWeatherInfo } from './utils/weather-codes'
import { getWindDirection } from './utils/wind-direction'

// ─── Element references ──────────────────────────────────
const contentArea  = document.getElementById('content-area')   as HTMLElement
const emptyState   = document.getElementById('empty-state')    as HTMLElement
const weatherCard  = document.getElementById('weather-card')   as HTMLElement

// Sidebar
const sidebarTemp        = document.getElementById('sidebar-temp')         as HTMLElement
const sidebarLocation    = document.getElementById('sidebar-location')     as HTMLElement
const sidebarDate        = document.getElementById('sidebar-date')         as HTMLElement
const sidebarDaynight    = document.getElementById('sidebar-daynight')     as HTMLElement
const sidebarWeatherCode = document.getElementById('sidebar-weather-code') as HTMLElement

// Main area
const infoHumidity     = document.getElementById('info-humidity')     as HTMLElement
const infoFeelsLike    = document.getElementById('info-feels-like')   as HTMLElement
const infoPrecipitation= document.getElementById('info-precipitation')as HTMLElement
const infoWind         = document.getElementById('info-wind')         as HTMLElement

// ─── Helpers ─────────────────────────────────────────────
function clearDynamicStates(): void {
  const existing = document.getElementById('loading-state')
  if (existing) existing.remove()
  weatherCard.hidden = true
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'short',
    day:     'numeric',
  })
}

// ─── showEmptyState ───────────────────────────────────────
const DEFAULT_EMPTY = {
  icon:     '🌤️',
  title:    'Search for a city',
  subtitle: 'Type a city name above to see the current weather.',
}

const ERROR_EMPTY = {
  icon:     '🔍',
  title:    'No results found',
  subtitle: "We couldn't find that city. Check the spelling and try again.",
}

export function showEmptyState(message?: string): void {
  clearDynamicStates()

  const isError  = message !== undefined
  const icon     = emptyState.querySelector('.empty-icon')     as HTMLElement
  const title    = emptyState.querySelector('.empty-title')    as HTMLElement
  const subtitle = emptyState.querySelector('.empty-subtitle') as HTMLElement

  if (isError) {
    icon.textContent     = ERROR_EMPTY.icon
    title.textContent    = message || ERROR_EMPTY.title
    subtitle.textContent = ERROR_EMPTY.subtitle
    emptyState.classList.add('empty-state--error')
  } else {
    icon.textContent     = DEFAULT_EMPTY.icon
    title.textContent    = DEFAULT_EMPTY.title
    subtitle.textContent = DEFAULT_EMPTY.subtitle
    emptyState.classList.remove('empty-state--error')
  }

  emptyState.hidden = false
}

// ─── showLoading ──────────────────────────────────────────
export function showLoading(): void {
  clearDynamicStates()
  emptyState.hidden = true

  const loader = document.createElement('div')
  loader.id = 'loading-state'
  loader.className = 'loading-state'
  loader.innerHTML = `
    <div class="spinner"></div>
    <p class="loading-text">Fetching weather data…</p>
  `

  contentArea.appendChild(loader)
}

// ─── hideLoading ──────────────────────────────────────────
export function hideLoading(): void {
  const loader = document.getElementById('loading-state')
  if (loader) loader.remove()
}

// ─── renderWeather ────────────────────────────────────────
export function renderWeather(location: LocationData, weather: WeatherData): void {
  hideLoading()
  emptyState.hidden = true

  const { current, units } = weather
  const { name, country_code } = location
  const weatherInfo = getWeatherInfo(current.weather_code)

  // ── Sidebar ──
  sidebarTemp.textContent        = `${current.temperature_2m}${units.temperature_2m}`
  sidebarLocation.textContent    = `${name}, ${country_code}`
  sidebarDate.textContent        = formatDate(new Date())
  sidebarDaynight.textContent    = current.is_day === 1 ? '☀️ Day' : '🌙 Night'
  sidebarWeatherCode.textContent = `${weatherInfo.emoji} ${weatherInfo.description}`

  // ── Main area ──
  infoHumidity.querySelector('.info-value')!.textContent =
    `${current.relative_humidity_2m}${units.relative_humidity_2m}`

  infoFeelsLike.querySelector('.info-value')!.textContent =
    `${current.apparent_temperature}${units.apparent_temperature}`

  infoPrecipitation.querySelector('.info-value')!.textContent =
    `${current.precipitation_probability}${units.precipitation_probability}`

  const windDir = getWindDirection(current.wind_direction_10m)
  infoWind.querySelector('.info-value')!.textContent =
    `${current.wind_speed_10m} ${units.wind_speed_10m} ${windDir}`

  weatherCard.hidden = false
}
