import { useState } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { Good } from '@shared/openapi'
import { ROUTER_PATHS, getRouterUrl } from '@shared/routers'
import { text } from '@shared/utils'

import testImage from '/splash.jpg'
import './styles.css'
import { className } from './styles'

type ListItemProps = { product: Good }

export const ListItem = ({ product }: ListItemProps) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const onLoad = () => setTimeout(() => setIsImgLoaded(true), 100)
  const toPath = getRouterUrl({ routName: ROUTER_PATHS.Product, dynamicRoutNames: [product.id] })
  const image = product.images[0]?.link || testImage
  const price = text.getPoints(product.price)

  return (
    <Link to={toPath} className={twMerge(className.container, isImgLoaded && className.containerVisible)}>
      <img src={image} className={className.img} decoding='sync' onLoad={onLoad} />
      <div className={className.infoContainer}>
        <p className={className.name}>{product.name}</p>
        <p className={className.price}>{price}</p>
      </div>
    </Link>
  )
}
