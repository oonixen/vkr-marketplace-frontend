import { AxiosError } from 'axios'
import { COMMON_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@shared/messages'

export const getRequestError = (error: Error): string | null => {
  let status: number

  if (error instanceof AxiosError && error.response) status = error.response.status
  else return null

  const statusErrors = {
    4: (error.response.data.message as string) || COMMON_ERROR_MESSAGE,
    5: SERVER_ERROR_MESSAGE,
  }
  const statusType = Math.floor(status / 100) as 4 | 5

  return statusErrors[statusType]
}
