import { useStore } from 'effector-react'
import { useLocation } from 'react-router-dom'
import { category } from '@entities/category'

import { getProductFromCategories, getProductId } from './model'

export const useGetProduct = () => {
  const location = useLocation()
  const categories = useStore(category.$categories)

  return getProductFromCategories(getProductId(location.pathname), categories)
}
