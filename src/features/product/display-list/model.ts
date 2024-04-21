import { createEffect, createEvent, sample } from 'effector'
import { Location } from 'react-router-dom'
import { category, link } from '@entities/category'
import { product } from '@entities/product'
import { ROUTER_PATHS } from '@shared/routers'

type ChangeCategoryProps = Location<any>
type ChangeCategoryFxProps = { categories: category.CategoriesType; location: ChangeCategoryProps }

export const changeCategory = createEvent<ChangeCategoryProps>()

const changeCategoryFx = createEffect<ChangeCategoryFxProps, product.ProductsType>(({ categories, location }) => {
  if (!categories) return []

  const categoryNameIndex = ROUTER_PATHS.Category.split('/').findIndex((path) => /:.+/.test(path))
  const categoryName = location.pathname.split('/')[categoryNameIndex]
  const decodedCategoryName = decodeURIComponent(categoryName)

  if (!categoryName || decodedCategoryName === link.nameOfAllCategories)
    return categories.map((category) => category.products).flat()

  for (const category of categories) {
    if (category.title !== decodedCategoryName) continue
    return [...category.products]
  }

  return null
})

sample({
  clock: changeCategoryFx.doneData,
  target: product.setProducts,
})

sample({
  clock: changeCategory,
  source: { categories: category.$categories },
  fn: ({ categories }, location) => ({ categories, location }),
  target: changeCategoryFx,
})
