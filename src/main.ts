import './style.css'

import { getLocation, getWeather } from './services/openmeteo'
import { showLoading, showEmptyState, renderWeather } from './ui'

// ─── Element references ──────────────────────────────────
const searchInput = document.getElementById('search-input') as HTMLInputElement
const searchBtn   = document.getElementById('search-btn')   as HTMLButtonElement

// ─── Search handler ───────────────────────────────────────
async function handleSearch(): Promise<void> {
  const cityName = searchInput.value.trim()

  if (!cityName) return

  showLoading()

  const location = await getLocation(cityName)

  if (!location) {
    showEmptyState('City not found')
    return
  }

  const weather = await getWeather(location.latitude, location.longitude, location.timezone)

  if (!weather) {
    showEmptyState('Weather data unavailable')
    return
  }

  renderWeather(location, weather)
}

// ─── Event listeners ──────────────────────────────────────
searchBtn.addEventListener('click', handleSearch)

searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Enter') handleSearch()
})
