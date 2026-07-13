# Portfolio

Vue 3 + Vite portfolio site.

## Requirements

- Node.js 24+ (see `.nvmrc`)

## Project setup

```bash
npm install
cp .env.example .env.local
```

Set your Yandex Maps API key in `.env.local`:

```
VITE_YANDEX_MAPS_API_KEY=your_key_here
```

Get a key at [developer.tech.yandex.ru](https://developer.tech.yandex.ru/) — select **JavaScript API and HTTP Geocoder**.

### Development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## GitHub Pages

The app uses `base: './'` for relative asset paths. For history-mode routing on GitHub Pages, `public/404.html` serves as the SPA fallback.
