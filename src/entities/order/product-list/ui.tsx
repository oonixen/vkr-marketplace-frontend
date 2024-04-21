import { twMerge } from 'tailwind-merge'

import { BasketType } from '../basket'
import { Product } from '../product'
import { className as classNameStyles } from './styles'

type ProductListProps = { className?: string; basket: BasketType }

export const ProductList = ({ className, basket }: ProductListProps) => {
  return (
    <div className={twMerge(classNameStyles.container, className)}>
      {basket.map((product, index) => (
        <Product key={`product-${product.id}-${index}`} product={product} />
      ))}
    </div>
  )
}
