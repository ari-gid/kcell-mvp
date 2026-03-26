# Kcell Combo

Student telecom web app with customizable tariff, gamification and AI recommendation.

## Overview

A modern mobile-first web application for a telecom product "Kcell Combo" targeted at students. Built with React + Tailwind CSS.

**Live layout:** centered phone layout, max-width 375px — looks and feels like a real mobile app.

## Features

| Screen | Description |
|--------|-------------|
| **Welcome** | Branded splash screen with CTA to start building a tariff |
| **Tariff Builder** | Base plan (0 ₸) + choose data (S/M/L) + 1 unlimited app; dynamic price & sticky "Подключить" summary |
| **Exchange** | Convert unused SMS & minutes into GB via sliders |
| **Kcell Aura** | Step tracking, rewards (steps → GB), OGO bonus points, achievements |
| **AI Советник** | 3-question survey → instant AI-style plan recommendation |

## Tech Stack

- **React** (functional components, `useState`)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Vite** — fast dev/build tooling
- No backend required — fully client-side

## Design

- Purple gradient accents: `#6C4BFF → #A855F7`
- White background, `rounded-2xl` cards, soft shadows
- Large touch targets, bottom navigation bar

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Project Structure

```
src/
├── components/
│   ├── WelcomeScreen.jsx     # Splash / onboarding
│   ├── TariffBuilder.jsx     # Tariff customization
│   ├── ExchangeFeature.jsx   # SMS/minutes → GB converter
│   ├── KcellAura.jsx         # Gamification & step rewards
│   ├── AIRecommendation.jsx  # AI plan suggester
│   └── BottomNav.jsx         # Tab navigation
├── App.jsx
├── main.jsx
└── index.css
```
