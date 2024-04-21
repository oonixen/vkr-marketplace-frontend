import { createEvent, createStore, sample } from 'effector'
import { substitute } from '@features/auth'
import { category } from '@entities/category'
import { axiosInstance } from '@shared/api'

export const startLoading = createEvent()

export const $isLoading = createStore<boolean>(true)

export const substituteApiRequest = () => {
  substitute.substituteToken(axiosInstance)
  substitute.updateToken(axiosInstance)
}

sample({
  clock: category.getCategoriesFx.pending,
  target: $isLoading,
})
sample({
  clock: startLoading,
  source: category.getCategoriesFx.pending,
  filter: (source) => !source,
  target: category.getCategories,
})
