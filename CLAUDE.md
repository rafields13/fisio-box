# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**fisio-box** is a client-side SPA for physiotherapy cardiorespiratory formula calculators, targeting physiotherapy students and professionals in Brazil. All calculations run in the browser — no backend, no authentication, no persistence.

Tech stack specified in requirements: **React + TailwindCSS**, deployed to a static hosting platform.

The full requirements are in `misc/requirements.md` (Portuguese).

## Commands

```bash
npm install        # instalar dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run build      # build de produção em dist/
npm run preview    # pré-visualizar o build de produção localmente
```

## Deploy

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Push para `main` dispara o deploy automaticamente.

URL de produção: `https://rafields13.github.io/fisio-box/`

O `base: '/fisio-box/'` em `vite.config.js` é obrigatório para o roteamento de assets funcionar no GitHub Pages.

## Architecture

Single Page Application with a sidebar/menu for switching between 6 independent calculator views. Each calculator is a self-contained component with its own form, calculation logic, and result display.

**6 calculators to implement:**
1. IMC (Body Mass Index)
2. RCQ (Waist-Hip Ratio)
3. TC6M (6-Minute Walk Test)
4. Teste do Degrau (Step Test)
5. Manovacuometria (Respiratory Pressure)
6. Carga Tabágica (Smoking Load)

**Suggested structure:**
```
src/
  components/
    calculators/     # one component per calculator
    shared/          # shared UI (inputs, result display, formula reference)
  utils/
    formulas.js      # pure calculation functions, one per calculator
```

## Business Rules & Formulas

All numeric outputs rounded to 2 decimal places.

**IMC:** `peso / altura²` (peso in kg, altura in m)
- Magreza < 18.5 | Normal 18.5–24.9 | Sobrepeso 25.0–29.9 | Obesidade I 30.0–34.9 | Obesidade II 35.0–39.9 | Obesidade III ≥ 40.0

**RCQ:** `cintura / quadril` (cm)
- Mulheres: risco aumentado se ≥ 0.85; Homens: risco aumentado se ≥ 0.90

**TC6M** (altura in cm, idade in anos, peso in kg):
- Homens: `(7.57 × altura) - (5.02 × idade) - (1.76 × peso) - 309`; LIN = predito - 153
- Mulheres: `(2.11 × altura) - (2.29 × peso) - (5.78 × idade) + 667`; LIN = predito - 139

**Teste do Degrau** (idade in anos, altura in cm, peso in kg):
- Homens: `106 + (17.02) + (-1.24 × idade) + (0.8 × altura) + (-0.39 × peso)`
- Mulheres: `106 + (-1.24 × idade) + (0.8 × altura) + (-0.39 × peso)`
- Percentual: `(degraus realizados / degraus previstos) × 100`

**Manovacuometria** (idade in anos):
- Homens: PImáx = `-0.80 × idade + 153`; PEmáx = `-0.81 × idade + 165.3`
- Mulheres: PImáx = `-0.49 × idade + 110.4`; PEmáx = `-0.61 × idade + 115.6`
- LIN Homens: predito - (1.645 × 17) for PImáx; predito - (1.645 × 18) for PEmáx
- LIN Mulheres: predito - (1.645 × 11) for PImáx; predito - (1.645 × 12) for PEmáx

**Carga Tabágica:** `(cigarros/dia / 20) × anos fumando`

## Validation Rules

- All inputs must be > 0 (no negatives, no zero)
- IMC altura: decimal between 0.50 and 3.00 m; all other calculators use altura in cm (integer 50–300)
- Block calculation and show inline red error text if required fields are empty or invalid
- Prevent division by zero (altura = 0, quadril = 0)
- "Limpar" button resets all fields and results for the active calculator

## Acceptance Criteria (from requirements)

- Mobile responsive — no horizontal scroll
- IMC: peso=70, altura=1.75 → result=22.86, classification="Normal"
- Empty required field → no calculation, friendly error message shown
- All 6 calculators present, each showing its formula for reference, operating independently
