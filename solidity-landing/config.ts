import { LogLevelDesc } from 'loglevel'

export const config = {
  API_URL: import.meta.env.VITE_API_URL as string,
  APP_NAME: import.meta.env.VITE_APP_NAME as string,
  LOG_LEVEL: 'trace' as LogLevelDesc,
} as const
