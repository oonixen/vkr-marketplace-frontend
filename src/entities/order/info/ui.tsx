import { useStore } from 'effector-react'
import { twMerge } from 'tailwind-merge'
import { columnTitle } from '@shared/styles'
import { text } from '@shared/utils'

import { $basket } from '../basket'
import { ProductList } from '../product-list'
import { getOrderSum } from './model'
import { className } from './styles'

export const Info = () => {
  const basket = useStore($basket)
  const pointsText = text.getPoints(getOrderSum(basket))

  return (
    <section className={className.section}>
      <h1 className={twMerge(columnTitle.className.title, className.title)}>Список покупок</h1>
      <div className={className.sumContainer}>
        <span className={className.sumTitle}>ИТОГО К ОПЛАТЕ</span>
        <span className={className.sumPrice}>{pointsText}</span>
      </div>
      <ProductList className={className.productList} basket={basket} />
    </section>
  )
}
