[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Solarity Front End

**Everything about Solarity ecosystem.**

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:
- **`VITE_ENVIRONMENT`** — Specifies the environment (`development` or `production`).
- **`VITE_PORT`** — The available port number for the app.
- **`VITE_APP_API_URL`** — API base URL (e.g., `'https://api.stage.solarity.dev'`).
- **`VITE_APP_NAME`** — Application name (e.g., `'Solarity'`).
- **`VITE_APP_COMPANY_URL`** — Company website URL (e.g., `'https://distributedlab.com'`).
- **`VITE_APP_DOCUMENTATION_URL`** — Documentation URL (e.g., `'https://docs.stage.solarity.dev'`).
- **`VITE_APP_GITHUB_URL`** — GitHub repository URL (e.g., `'https://github.com/dl-solarity'`).

The example of `.env` file can be found in the [`.env.example`](.env.example) file.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
