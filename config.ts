import { LogLevelDesc } from 'loglevel'

export const config = {
  APP_NAME: import.meta.env.VITE_APP_NAME as string,
  LOG_LEVEL: 'trace' as LogLevelDesc,
} as const
