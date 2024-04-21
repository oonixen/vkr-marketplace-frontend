import { Link } from 'react-router-dom'
import { Cross } from '@shared/icons'
import { ROUTER_PATHS, getRouterUrl } from '@shared/routers'
import { Counter } from '@shared/ui'
import { text } from '@shared/utils'

import splashImage from '/splash.jpg'
import { BasketProductType, addProduct, decreaseProduct, deleteProduct } from '../basket'
import { className } from './styles'

const svgWidth = 15

type ProductType = { product: BasketProductType }

export const Product = ({ product }: ProductType) => {

  const priceText = text.getPoints(product.amount * product.price)
  const image = product.images[0].link || splashImage
  const clickIncrease = () => addProduct(product)
  const clickDecrease = () => decreaseProduct(product)
  const clickDelete = () => deleteProduct(product)

  return (
    <div className={className.container}>
      <button className={className.deleteButton} onClick={clickDelete}>
        <Cross width={svgWidth} height={svgWidth} />
      </button>
      <img src={image} className={className.img} />
      <div className={className.containerInfo}>
        <Link
          to={getRouterUrl({ routName: ROUTER_PATHS.Product, dynamicRoutNames: [product.id] })}
          className={className.name}
        >
          {product.name}
        </Link>
        <div className={className.containerParams}>
          <div className={className.containerParamsControl}>
            {product.modifier && <span className={className.size}>{product.modifier.name}</span>}
            <Counter onClickIncrease={clickIncrease} onClickDecrese={clickDecrease} amount={product.amount} />
          </div>
          <span className={className.price}>{priceText}</span>
        </div>
      </div>
    </div>
  )
}
