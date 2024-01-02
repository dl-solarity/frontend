import { LogLevelDesc } from 'loglevel'

export const config = {
  API_URL: import.meta.env.VITE_API_URL as string,
  NAME: import.meta.env.VITE_APP_NAME as string,
  COMPANY_URL: import.meta.env.VITE_APP_COMPANY_URL as string,
  DOCUMENTATION_URL: import.meta.env.VITE_APP_DOCUMENTATION_URL as string,
  GITHUB_URL: import.meta.env.VITE_APP_GITHUB_URL as string,
  LOG_LEVEL: 'trace' as LogLevelDesc,
} as const
