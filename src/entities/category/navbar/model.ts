import { createEffect, createStore, forward } from 'effector'

import { $categories, CategoriesType } from '../category'
import { nameOfAllCategories } from '../link'

export const $categoriesNames = createStore<string[]>([])

const getCategoriesNamesFx = createEffect<CategoriesType, string[]>((categories) => {
  if (!categories) return []
  return [nameOfAllCategories, ...categories.map((category) => category.title)]
})

forward({ from: getCategoriesNamesFx.doneData, to: $categoriesNames })
forward({ from: $categories, to: getCategoriesNamesFx })
