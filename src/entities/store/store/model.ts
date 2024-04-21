import { createEffect, createEvent, createStore, forward } from 'effector'
import { api, getRequestError } from '@shared/api'
import { COMMON_ERROR_MESSAGE } from '@shared/messages'
import { createNotification } from '@shared/notifications'
import { GetStores200ResponseInner } from '@shared/openapi'

export type StoresType = GetStores200ResponseInner[]

export const getStores = createEvent()

export const $stores = createStore<StoresType>([])

export const getStoresFx = createEffect<void, StoresType, Error>(async () => {
  const { data } = await api.default.getStores()
  return data
})

const getStoresHandleErrorFx = createEffect<Error, void>((error) => {
  const message = getRequestError(error) || COMMON_ERROR_MESSAGE
  createNotification({ message, timer: 15000 })
})

forward({ from: getStores, to: getStoresFx })
forward({ from: getStoresFx.doneData, to: $stores })
forward({ from: getStoresFx.failData, to: getStoresHandleErrorFx })
