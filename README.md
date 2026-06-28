# 🌤️ Projeto Clima

Aplicação web de consulta de clima em tempo real. Digite o nome de uma cidade e veja instantaneamente temperatura, umidade, sensação térmica, vento e probabilidade de chuva — sem precisar de conta ou chave de API.

🔗 **[Ver projeto ao vivo](https://douglasmadedemartins.github.io/clima-tempo-projeto/)**

---

## ✨ Funcionalidades

- 🔍 Busca por nome de cidade (Enter ou clique no botão)
- 🌡️ Temperatura atual e sensação térmica
- 💧 Umidade relativa
- 🌧️ Probabilidade de precipitação
- 💨 Velocidade e direção do vento (N, NE, E, SE, S, SW, W, NW)
- ☀️ / 🌙 Indicação de dia ou noite
- 🌤️ Descrição do clima com emoji (ex: *Mainly clear*, *Thunderstorm*)
- 📱 Layout responsivo — funciona em mobile, tablet e desktop
- ⚡ Empty State e Loading State para boa experiência de usuário

---

## 🛠️ Stack

| Item | Tecnologia |
|---|---|
| Bundler | [Vite](https://vitejs.dev/) |
| Linguagem | TypeScript |
| Framework | Vanilla (sem framework de UI) |
| API | [Open-Meteo](https://open-meteo.com/) — gratuita, sem chave |
| Deploy | GitHub Pages via GitHub Actions |

---

## 📁 Estrutura do projeto

```
clima-tempo-projeto/
├── index.html
├── vite.config.ts
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD para GitHub Pages
└── src/
    ├── main.ts                 # Entry point — event listeners e orquestração
    ├── style.css               # Estilos globais e responsividade
    ├── ui.ts                   # Funções de manipulação do DOM
    ├── services/
    │   └── openmeteo.ts        # Camada de serviço — chamadas à API
    ├── types/
    │   └── index.ts            # Interfaces TypeScript
    └── utils/
        ├── weather-codes.ts    # WMO codes → emoji + descrição
        └── wind-direction.ts   # Graus → direção cardinal
```

---

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js 18+

```bash
# Clone o repositório
git clone https://github.com/DouglasMamedeMartins/clima-tempo-projeto.git
cd clima-tempo-projeto

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

```bash
# Gerar build de produção
npm run build

# Visualizar o build localmente
npm run preview
```

---

## 🌐 Deploy

O projeto é publicado automaticamente no **GitHub Pages** a cada push na branch `main`, via GitHub Actions.

O workflow (`.github/workflows/deploy.yml`) executa:

1. Checkout do código
2. Instalação das dependências (`npm ci`)
3. Build de produção (`npm run build`)
4. Upload e deploy do conteúdo da pasta `dist/`

---

## 🗺️ Como funciona

```
Usuário digita cidade
        ↓
  getLocation(city)          ← Geocoding API (lat, lng, timezone)
        ↓
  getWeather(lat, lng, tz)   ← Forecast API (temperatura, vento, etc.)
        ↓
  renderWeather(location, weather)
```

O `main.ts` apenas orquestra — nunca acessa a API diretamente nem manipula o DOM. Cada camada tem responsabilidade única.

---

## 📡 API utilizada

[Open-Meteo](https://open-meteo.com/) — gratuita, open source, sem necessidade de cadastro ou chave de API.

| Endpoint | Uso |
|---|---|
| `geocoding-api.open-meteo.com/v1/search` | Busca latitude, longitude e timezone pelo nome da cidade |
| `api.open-meteo.com/v1/forecast` | Busca dados climáticos atuais pela localização |

---

## 📄 Licença

MIT
