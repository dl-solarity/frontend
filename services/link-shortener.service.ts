import { api } from '@/api'
import { linkShortenerServiceErrors } from '@/errors'
import { type LinkShortener } from '@/types'

export async function createLink(
  value: unknown,
  path: string,
): Promise<LinkShortener.Data> {
  const requestBody = { data: { attributes: { value, path } } }

  try {
    const { data: responseData } = await api.post<{ data: LinkShortener.Data }>(
      '/shortener',
      { body: requestBody },
    )

    // eslint-disable-next-line
    // @ts-ignore
    return responseData?.data
  } catch {
    throw new linkShortenerServiceErrors.CreateLinkFetchError()
  }
}

export async function getDataByLink(link: string): Promise<LinkShortener.Data> {
  try {
    const { data: responseData } = await api.get<{ data: LinkShortener.Data }>(
      `/shortener/${link}`,
    )

    // eslint-disable-next-line
    // @ts-ignore
    return responseData?.data
  } catch {
    throw new linkShortenerServiceErrors.GetDataByLinkFetchError()
  }
}
