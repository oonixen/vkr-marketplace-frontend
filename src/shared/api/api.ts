import axios from 'axios'
import { AuthApi, DefaultApi } from '@shared/openapi'

export const BASE_PATH = import.meta.env.FRONT_API_BASE_PATH
export const axiosInstance = axios.create()

export const api = {
  default: new DefaultApi(undefined, BASE_PATH, axiosInstance),
  auth: new AuthApi(undefined, BASE_PATH, axiosInstance),
}
