import { config } from '@/config'
import { Fetcher, fetcher } from '@distributedlab/fetcher'

const api = new Fetcher({ baseUrl: config.API_URL })

export { api, fetcher }
