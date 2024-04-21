import { category } from '@entities/category'
import { Good } from '@shared/openapi'

export const getProductId = (pathname: string) => {
  return pathname.split('/').splice(-1)[0]
}

export const getProductFromCategories = (id: string, categories: category.CategoriesType): Good | null => {
  let product = null

  if (!categories) return product

  topLoop: for (const category of categories) {
    for (const good of category.products) {
      if (good.id === id) {
        product = good
        break topLoop
      }
    }
  }

  return product
}
