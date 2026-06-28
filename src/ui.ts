// ─── Element references ──────────────────────────────────
const contentArea  = document.getElementById('content-area')  as HTMLElement
const emptyState   = document.getElementById('empty-state')   as HTMLElement
const weatherCard  = document.getElementById('weather-card')  as HTMLElement

// ─── Helpers ─────────────────────────────────────────────
function clearDynamicStates(): void {
  // Remove loading state if present
  const existing = document.getElementById('loading-state')
  if (existing) existing.remove()

  // Hide weather card
  weatherCard.hidden = true
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
  subtitle: 'We couldn\'t find that city. Check the spelling and try again.',
}

export function showEmptyState(message?: string): void {
  clearDynamicStates()

  const isError = message !== undefined

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
