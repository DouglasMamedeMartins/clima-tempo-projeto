# Tasks — Projeto Clima

> As especificações completas de cada item estão no [`prd.md`](./prd.md).
> As tasks devem ser executadas em ordem, pois cada uma depende da anterior.

---

## TASK 01 — Scaffolding do projeto

Inicializar o projeto com Vite + TypeScript + Vanilla e criar a estrutura de arquivos definida no PRD.

**O que fazer:**
- Criar o projeto com `npm create vite@latest` usando o template `vanilla-ts`.
- Criar a estrutura de pastas e arquivos vazios conforme o PRD (seção 3):
  - `src/services/openmeteo.ts`
  - `src/types/index.ts`
  - `src/utils/weather-codes.ts`
  - `src/utils/wind-direction.ts`
  - `src/ui.ts`
- Limpar o conteúdo padrão gerado pelo Vite em `main.ts`, `style.css` e `index.html`.
- Garantir que o projeto roda sem erros com `npm run dev`.

**Critério de aprovação:**
- [x] O comando `npm run dev` abre o projeto no navegador sem erros no terminal nem no console.
- [x] A estrutura de pastas `src/services/`, `src/types/` e `src/utils/` existe com os arquivos corretos.
- [x] `index.html` não tem conteúdo padrão do Vite (sem contadores, logos ou textos de exemplo).

---

## TASK 02 — Tipos TypeScript (`src/types/index.ts`)

Definir todas as interfaces do projeto conforme a seção **8. Tipos TypeScript** do PRD.

**O que fazer:**
- Implementar as interfaces `LocationData`, `WeatherUnits`, `WeatherCurrent`, `WeatherData` e `WeatherInfo` em `src/types/index.ts`, exatamente como especificadas no PRD.
- Exportar todas elas.

**Critério de aprovação:**
- [x] O arquivo compila sem erros de TypeScript (`tsc --noEmit`).
- [x] Cada interface tem todos os campos listados no PRD, com os tipos corretos (incluindo `is_day: 0 | 1`).
- [x] Todas as interfaces estão exportadas.

---

## TASK 03 — Weather Codes (`src/utils/weather-codes.ts`)

Implementar a função de mapeamento de códigos WMO para emoji e descrição, conforme a seção **6. Mapeamento de Weather Codes** do PRD.

**O que fazer:**
- Implementar e exportar `getWeatherInfo(code: number): WeatherInfo` em `src/utils/weather-codes.ts`.
- Cobrir todos os grupos de códigos listados no PRD.
- Retornar `{ emoji: '🌡️', description: 'Unknown' }` para códigos não mapeados.

**Critério de aprovação:**
- [x] `getWeatherInfo(0)` retorna `{ emoji: '☀️', description: 'Clear sky' }`.
- [x] `getWeatherInfo(2)` retorna `{ emoji: '⛅', description: 'Partly cloudy' }`.
- [x] `getWeatherInfo(95)` retorna `{ emoji: '⛈️', description: 'Thunderstorm' }`.
- [x] `getWeatherInfo(999)` retorna `{ emoji: '🌡️', description: 'Unknown' }`.
- [x] O arquivo usa o tipo `WeatherInfo` importado de `src/types/index.ts`.
- [x] O arquivo compila sem erros de TypeScript.

---

## TASK 04 — Camada de serviço: `getLocation` (`src/services/openmeteo.ts`)

Implementar a função `getLocation` conforme a seção **5. Camada de Serviço** do PRD.

**O que fazer:**
- Implementar e exportar `getLocation(cityName: string): Promise<LocationData | null>` em `src/services/openmeteo.ts`.
- Consultar o endpoint de Geocoding da Open-Meteo.
- Extrair apenas os campos necessários: `name`, `latitude`, `longitude`, `country_code`, `timezone`.
- Seguir as regras de guarda: retornar `null` se `cityName` estiver vazio ou se `results` vier vazio.

**Critério de aprovação:**
- [x] `getLocation('')` retorna `null` sem fazer nenhuma requisição de rede.
- [x] `getLocation('London')` retorna um objeto com os campos `name`, `latitude`, `longitude`, `country_code` e `timezone` corretamente preenchidos.
- [x] `getLocation('xyzabcnotacity123')` retorna `null`.
- [x] O retorno usa o tipo `LocationData` importado de `src/types/index.ts`.
- [x] O arquivo compila sem erros de TypeScript.

---

## TASK 05 — Camada de serviço: `getWeather` (`src/services/openmeteo.ts`)

Implementar a função `getWeather` conforme a seção **5. Camada de Serviço** do PRD.

**O que fazer:**
- Implementar e exportar `getWeather(latitude: number, longitude: number, timezone: string): Promise<WeatherData | null>` em `src/services/openmeteo.ts`.
- Consultar o endpoint de Forecast da Open-Meteo com todos os campos obrigatórios listados no PRD.
- Mapear `current_units` para `units` e `current` para `current` no retorno.
- Seguir as regras de guarda: retornar `null` se qualquer parâmetro estiver ausente ou se a resposta não tiver `current`/`current_units`.

**Critério de aprovação:**
- [x] `getWeather(undefined, -48, 'America/Sao_Paulo')` retorna `null` sem fazer requisição.
- [x] `getWeather(-15.8, -48.1, 'America/Sao_Paulo')` retorna um objeto com `units` e `current`, contendo todos os campos obrigatórios listados no PRD.
- [x] Os campos de `units` refletem os valores reais retornados pela API (ex: `temperature_2m` = `"°C"`).
- [x] O retorno usa o tipo `WeatherData` importado de `src/types/index.ts`.
- [x] O arquivo compila sem erros de TypeScript.

---

## TASK 06 — Estrutura HTML e CSS base (`index.html` + `style.css`)

Criar a estrutura HTML e os estilos globais do projeto conforme a seção **7. Layout e Design** do PRD.

**O que fazer:**
- Estruturar o `index.html` com: área superior (campo de busca), e o card principal contendo sidebar e área principal.
- Aplicar o fundo escuro na página (`#1a1a2e` ou similar).
- Aplicar fundo branco, `border-radius: 24px` e `max-width: 800px` no card principal.
- A área de busca não deve ter background.
- Usar classes semânticas (ex: `.search-area`, `.weather-card`, `.sidebar`, `.main-area`).
- O conteúdo do sidebar e da área principal pode ser placeholder estático por enquanto.

**Critério de aprovação:**
- [x] A página exibe o fundo escuro corretamente.
- [x] O card principal tem fundo branco, bordas arredondadas e está centralizado.
- [x] A área de busca está acima do card, centralizada, sem background.
- [x] O sidebar está à esquerda e a área principal à direita dentro do card.
- [x] O layout não quebra em viewport de 800px de largura ou maior.
- [x] Não há erros no console.

---

## TASK 07 — Empty State e Loading State (`ui.ts` + `style.css`)

Implementar as funções de UI para os estados de vazio e carregamento, conforme as seções **4.4**, **7.6** e **7.7** do PRD.

**O que fazer:**
- Em `ui.ts`, implementar e exportar:
  - `showEmptyState(message?: string)` — exibe o Empty State no lugar do card principal. Mensagem padrão para estado inicial; mensagem diferenciada para erro/não encontrado.
  - `showLoading()` — exibe o Loading State (spinner ou skeleton) no lugar do card principal.
  - `hideLoading()` — remove o Loading State (usado internamente antes de renderizar resultado ou erro).
- Aplicar os estilos correspondentes em `style.css`.

**Critério de aprovação:**
- [ ] Ao chamar `showEmptyState()` sem argumento, a área do card exibe uma mensagem amigável pedindo para buscar uma cidade.
- [ ] Ao chamar `showEmptyState('City not found')`, a área exibe a mensagem de erro diferenciada.
- [ ] Ao chamar `showLoading()`, o spinner ou skeleton aparece visivelmente no lugar do card.
- [ ] O Empty State é exibido por padrão ao abrir a aplicação (estado inicial).
- [ ] Não há erros no console.

---

## TASK 08 — Renderização do resultado (`ui.ts`)

Implementar a função que recebe os dados de localização e clima e os exibe no layout do sidebar e área principal, conforme as seções **7.4** e **7.5** do PRD.

**O que fazer:**
- Em `ui.ts`, implementar e exportar `renderWeather(location: LocationData, weather: WeatherData)`.
- **Sidebar:** exibir temperatura, nome da cidade + country code, data atual do dispositivo, dia/noite (`is_day`), e weather code (emoji + descrição via `getWeatherInfo`).
- **Área principal:** exibir umidade relativa, temperatura aparente, probabilidade de precipitação e vento.
- **Vento:** usar a função utilitária `getWindDirection` de `src/utils/wind-direction.ts` para converter `wind_direction_10m` (graus) para direção cardinal (N, NE, E, SE, S, SW, W, NW) e exibir junto com a velocidade. Ver regra em **9. Regras de Negócio Adicionais** do PRD.
- **Unidades:** usar os valores de `weather.units`, não hardcodar strings.
- **Data:** usar a data local do dispositivo do usuário, formatada como `Wednesday, Jun 24`.

**Critério de aprovação:**
- [ ] Após chamar `renderWeather(locationMock, weatherMock)`, o sidebar exibe temperatura, cidade/país, data formatada, dia/noite e weather code com emoji.
- [ ] `is_day = 1` exibe `☀️ Day`; `is_day = 0` exibe `🌙 Night`.
- [ ] A área principal exibe os 4 itens: umidade, sensação térmica, precipitação e vento.
- [ ] O vento exibe velocidade + direção cardinal (ex: `8.1 km/h NW`).
- [ ] As unidades vêm de `weather.units` (ex: se a API retornar `"°F"`, a UI exibe `"°F"`).
- [ ] Não há erros no console.

---

## TASK 09 — Integração no `main.ts`

Conectar busca, serviço e UI no entry point, implementando o fluxo completo descrito na seção **4. Requisitos Funcionais** do PRD.

**O que fazer:**
- Adicionar event listeners no campo de busca: disparar ao pressionar **Enter** e ao clicar no botão de busca.
- Ao disparar a busca:
  1. Chamar `showLoading()`.
  2. Chamar `getLocation(cityName)`.
  3. Se retornar `null`, chamar `showEmptyState('City not found')` e encerrar.
  4. Chamar `getWeather(latitude, longitude, timezone)`.
  5. Se retornar `null`, chamar `showEmptyState('Weather data unavailable')` e encerrar.
  6. Chamar `renderWeather(location, weather)`.
- O `main.ts` não deve importar nada de `openmeteo.ts` diretamente nas funções de render, nem importar nada de `ui.ts` nas funções de serviço.

**Critério de aprovação:**
- [ ] Buscar "London" exibe o resultado com todos os dados preenchidos no sidebar e área principal.
- [ ] Buscar uma cidade inválida (ex: "xyzabcnotacity123") exibe o Empty State de erro.
- [ ] O loading aparece enquanto a busca está em andamento e desaparece ao fim (com sucesso ou erro).
- [ ] A busca funciona tanto ao pressionar Enter quanto ao clicar no botão.
- [ ] Buscar com campo vazio não dispara requisição nem muda o estado da UI.
- [ ] Não há erros no console durante nenhum dos fluxos acima.

---

## TASK 10 — Revisão final e polish

Verificar que todos os requisitos do PRD estão atendidos, corrigir inconsistências visuais e garantir que a aplicação está pronta.

**O que fazer:**
- Conferir cada item das seções **7.2 a 7.7** do PRD visualmente no navegador.
- Garantir que o Empty State inicial é exibido ao abrir a aplicação (sem interação).
- Garantir que `tsc --noEmit` passa sem erros.
- Garantir que `npm run build` conclui sem erros.

**Critério de aprovação:**
- [ ] `npm run build` e `tsc --noEmit` concluem sem erros ou warnings.
- [ ] Ao abrir a aplicação pela primeira vez, o Empty State inicial é exibido.
- [ ] Todos os fluxos das Tasks 09 funcionam corretamente no build de produção (`npm run preview`).
- [ ] O layout está visualmente consistente com a seção **7** do PRD (fundo escuro, card branco, sidebar + área principal).
- [ ] Não há `console.log` de debug esquecido no código.
- [ ] Não há erros nem warnings no console do navegador durante uso normal.
