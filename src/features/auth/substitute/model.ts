import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { token } from '@entities/auth'
import { user } from '@entities/profile'
import { BASE_PATH } from '@shared/api'
import { SERVER_ERROR_MESSAGE } from '@shared/messages'
import { createNotification } from '@shared/notifications'
import { AuthApi, PostAuthRefreshToken200Response } from '@shared/openapi'

type TokenFnType = (axiosInstance: AxiosInstance) => AxiosInstance

export const substituteToken: TokenFnType = (axiosInstance) => {
  //@ts-ignore
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = token.getAccessTokenFromStorage()

    if (!accessToken) return config

    return getAuthConfig(config, accessToken)
  })

  return axiosInstance
}

let refreshRequestPromise: Promise<AxiosResponse<PostAuthRefreshToken200Response>> | null = null
let refreshRequestCount: number = 0

export const updateToken: TokenFnType = (axiosInstance) => {
  axiosInstance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const err = JSON.parse(JSON.stringify(error))

    if (err.status !== 401) {
      if (Math.floor(err.status / 100) === 5) createNotification({ message: SERVER_ERROR_MESSAGE })
      return Promise.reject(error)
    }

    const refresh = token.getRefreshToken()

    if (!refresh) return Promise.reject(error)

    if (refreshRequestPromise) {
      const callback = async () => {
        const auth = await refreshRequestPromise
        return auth?.data
      }
      return handle401Error(callback, error)
    } else {
      const callback = async () => {
        refreshRequestPromise = new AuthApi(undefined, BASE_PATH).postAuthRefreshToken({ refresh })
        const auth = await refreshRequestPromise
        token.setTokens(auth.data)
        return auth.data
      }
      return handle401Error(callback, error)
    }
  })

  return axiosInstance
}

const handle401Error = async (
  callback: () => Promise<PostAuthRefreshToken200Response | undefined>,
  error: AxiosError,
): Promise<any> => {
  refreshRequestCount++

  try {
    const auth = await callback()
    if (!auth) throw new Error()

    return axios.request(getAuthConfig(error.config as AxiosRequestConfig, auth.access))
  } catch (e) {
    user.logOut()
    return axios.request(getAuthConfig(error.config as AxiosRequestConfig))
  } finally {
    refreshRequestCount--
    if (!refreshRequestCount) refreshRequestPromise = null
  }
}

function getAuthConfig(config: AxiosRequestConfig, accessToken?: string): AxiosRequestConfig {
  return { ...config, headers: { ...config.headers, Authorization: accessToken ? `Bearer ${accessToken}` : undefined } }
}
