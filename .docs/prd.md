# PRD — Projeto Clima

## 1. Visão Geral

Aplicação web de consulta de clima em tempo real. O usuário digita o nome de uma cidade e recebe as principais informações meteorológicas daquela localização, como temperatura, umidade, vento e probabilidade de chuva.

---

## 2. Stack Técnica

| Item | Escolha |
|---|---|
| Bundler | Vite |
| Linguagem | TypeScript |
| Framework | Vanilla (sem framework de UI) |
| API de dados | Open-Meteo (gratuita, sem chave) |

---

## 3. Arquitetura de Arquivos

```
src/
├── main.ts               # Entry point — inicializa a UI e os event listeners
├── openmeteo.ts          # Funções de acesso à API Open-Meteo (camada de serviço)
├── types.ts              # Interfaces e tipos TypeScript do projeto
├── weather-codes.ts      # Mapeamento de WMO weather codes → emoji + descrição
└── ui.ts                 # Funções de manipulação do DOM (renderização)
```

> O `main.ts` nunca acessa a API diretamente. Toda comunicação com a Open-Meteo passa pelas funções de `openmeteo.ts`.

---

## 4. Requisitos Funcionais

### 4.1 Busca de cidade

- O usuário digita o nome de uma cidade no campo de busca.
- A busca é disparada ao pressionar **Enter** ou clicar no botão de busca.
- Enquanto a busca está em andamento, exibe um estado de **loading** único para o usuário (mesmo que internamente sejam 2 requisições).

### 4.2 Fluxo de dados (interno)

1. Recebe o nome da cidade digitado pelo usuário.
2. Chama `getLocation(cityName)` em `openmeteo.ts`, que consulta a **Geocoding API** e retorna `name`, `latitude`, `longitude`, `country_code` e `timezone`.
3. Com esses dados, chama `getWeather(latitude, longitude, timezone)` em `openmeteo.ts`, que consulta a **Forecast API** e retorna os dados de clima.
4. Renderiza o resultado na interface.

### 4.3 Tratamento de erros

| Situação | Comportamento |
|---|---|
| Cidade não encontrada | Exibe Empty State |
| Cidade encontrada, mas clima indisponível | Exibe Empty State |
| Parâmetros ausentes nas funções do `openmeteo.ts` | Retorna `null` / age como se não tivesse encontrado nada |

### 4.4 Empty State

Exibido quando:
- A aplicação é aberta pela primeira vez (estado inicial).
- A busca não retorna resultado.

---

## 5. Camada de Serviço — `openmeteo.ts`

### `getLocation(cityName: string)`

**Endpoint:**
```
GET https://geocoding-api.open-meteo.com/v1/search?name={cityName}&count=1&language=en&format=json
```

**Retorna:**
```ts
{
  name: string
  latitude: number
  longitude: number
  country_code: string
  timezone: string
} | null
```

**Regras:**
- Se `cityName` não for fornecido ou estiver vazio, retorna `null` imediatamente sem fazer requisição.
- Se a resposta não contiver `results` ou o array estiver vazio, retorna `null`.

---

### `getWeather(latitude: number, longitude: number, timezone: string)`

**Endpoint:**
```
GET https://api.open-meteo.com/v1/forecast
  ?latitude={latitude}
  &longitude={longitude}
  &current=precipitation_probability,temperature_2m,relative_humidity_2m,
           apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,
           precipitation,weather_code
  &timezone={timezone}
```

**Retorna:**
```ts
{
  units: {
    temperature_2m: string        // ex: "°C"
    relative_humidity_2m: string  // ex: "%"
    apparent_temperature: string  // ex: "°C"
    wind_speed_10m: string        // ex: "km/h"
    wind_direction_10m: string    // ex: "°"
    precipitation_probability: string // ex: "%"
  }
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    is_day: 0 | 1
    wind_speed_10m: number
    wind_direction_10m: number
    precipitation_probability: number
    weather_code: number
  }
} | null
```

**Regras:**
- Se qualquer um dos parâmetros (`latitude`, `longitude`, `timezone`) não for fornecido, retorna `null` sem fazer requisição.
- Se a resposta não contiver `current` ou `current_units`, retorna `null`.

---

## 6. Mapeamento de Weather Codes — `weather-codes.ts`

Exporta uma função `getWeatherInfo(code: number): { emoji: string, description: string }`.

| Código(s) | Emoji | Descrição |
|---|---|---|
| 0 | ☀️ | Clear sky |
| 1 | 🌤️ | Mainly clear |
| 2 | ⛅ | Partly cloudy |
| 3 | ☁️ | Overcast |
| 45, 48 | 🌫️ | Fog |
| 51, 53, 55 | 🌦️ | Drizzle |
| 56, 57 | 🌧️ | Freezing drizzle |
| 61, 63, 65 | 🌧️ | Rain |
| 66, 67 | 🌨️ | Freezing rain |
| 71, 73, 75 | ❄️ | Snow fall |
| 77 | 🌨️ | Snow grains |
| 80, 81, 82 | 🌦️ | Rain showers |
| 85, 86 | ❄️ | Snow showers |
| 95 | ⛈️ | Thunderstorm |
| 96, 99 | ⛈️ | Thunderstorm with hail |
| (desconhecido) | 🌡️ | Unknown |

---

## 7. Layout e Design

### 7.1 Estrutura geral

```
┌─────────────────────────────────────────────┐
│              ÁREA SUPERIOR                  │
│         [  🔍 Search city...  ]             │
└─────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐  ← max-width: 800px
│ SIDEBAR (esq.)     │   ÁREA PRINCIPAL (dir.)         │  ← border-radius grande
│                    │                                  │  ← fundo branco
│  23°C              │   💧 Humidity      50%           │
│  Ceilândia, BR     │   🌡 Feels like    22.9°C        │
│  Wednesday, Jun 24 │   🌧 Precipitation  0%           │
│  ☀️ Day             │   💨 Wind          8.1 km/h NW   │
│  🌤 Mainly clear   │                                  │
└──────────────────────────────────────────────────────┘
```

### 7.2 Cores e fundo

| Elemento | Estilo |
|---|---|
| Background da página | Cinza escuro (`#1a1a2e` ou similar) |
| Card principal (sidebar + área principal) | Fundo branco, `border-radius: 24px`, centralizado |
| Área superior (busca) | Sem background |

### 7.3 Área Superior

- Centralizada horizontal e verticalmente no topo da página.
- Contém apenas o campo de busca + botão (ou ícone de lupa).
- Sem background ou card.

### 7.4 Sidebar (esquerda)

Exibe, em ordem:

1. **Temperatura** — valor grande e destacado, com unidade (ex: `23°C`)
2. **Cidade, País** — nome da cidade + country code (ex: `Ceilândia, BR`)
3. **Data atual** — dia da semana + data formatada (ex: `Wednesday, Jun 24`)
4. **Dia / Noite** — baseado em `is_day`: exibe `☀️ Day` ou `🌙 Night`
5. **Weather Code** — emoji + descrição (ex: `🌤️ Mainly clear`)

### 7.5 Área Principal (direita)

Exibe 4 cards ou linhas de informação:

| Dado | Campo da API | Unidade |
|---|---|---|
| Relative humidity | `relative_humidity_2m` | `%` |
| Feels like | `apparent_temperature` | `°C` |
| Precipitation probability | `precipitation_probability` | `%` |
| Wind | `wind_speed_10m` + `wind_direction_10m` | `km/h` + graus → texto cardinal |

> **Vento:** converter `wind_direction_10m` (graus) para direção cardinal (N, NE, E, SE, S, SW, W, NW) e exibir junto com a velocidade. Ex: `8.1 km/h NW`.

### 7.6 Empty State

- Exibido no lugar do card principal.
- Mensagem amigável indicando que o usuário deve buscar uma cidade.
- Em caso de erro/não encontrado, mensagem diferenciada.

### 7.7 Loading State

- Exibido no lugar do card principal enquanto as requisições estão em andamento.
- Pode ser um spinner simples ou skeleton.

---

## 8. Tipos TypeScript — `types.ts`

```ts
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
```

---

## 9. Regras de Negócio Adicionais

- **Direção do vento:** converter graus para texto cardinal com uma função utilitária. Os 8 pontos cardeais cobrem faixas de 45°, centradas em N=0°/360°, NE=45°, E=90°, SE=135°, S=180°, SW=225°, W=270°, NW=315°.
- **Data atual:** usar a data local do dispositivo do usuário (não vem da API).
- **Unidades:** sempre usar as unidades retornadas em `current_units`, não hardcodar strings de unidade na UI.
- **Idioma:** interface em inglês.
