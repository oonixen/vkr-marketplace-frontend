import { createEffect, createEvent, createStore, forward } from 'effector'
import { api, getRequestError } from '@shared/api'
import { COMMON_ERROR_MESSAGE } from '@shared/messages'
import { createNotification } from '@shared/notifications'
import { GetGoods200ResponseInner } from '@shared/openapi'

export type CategoriesType = GetGoods200ResponseInner[] | null

export const getCategories = createEvent()

export const $categories = createStore<CategoriesType>(null)

export const getCategoriesFx = createEffect<void, CategoriesType, Error>(async () => {
  const { data } = await api.default.getGoods()
  return data
})

const getCategoriesHandleErrorFx = createEffect<Error, void>((error) => {
  const errorMessage = getRequestError(error) || COMMON_ERROR_MESSAGE
  createNotification({ message: errorMessage, timer: 15000 })
})

forward({ from: getCategories, to: getCategoriesFx })
forward({ from: getCategoriesFx.doneData, to: $categories })
forward({ from: getCategoriesFx.failData, to: getCategoriesHandleErrorFx })
