import { useStore } from 'effector-react'
import VisibilitySensor from 'react-visibility-sensor'
import { EmptyContent } from '@shared/ui'

import { ListItem } from '../list-item'
import { $products } from '../product'
import { className } from './styles'

type VisibilitySensorChildrenProps = { isVisible: boolean }

const offsetVisibility = -200

export const List = () => {
  const products = useStore($products)

  if (!products) return <EmptyContent text='Категория не найдена' />

  return (
    <div className={className.section}>
      {products.map((product, index) => (
        <VisibilitySensor
          key={`product-${index}`}
          intervalDelay={300}
          partialVisibility={true}
          offset={{ top: offsetVisibility, bottom: offsetVisibility }}
        >
          {({ isVisible }: VisibilitySensorChildrenProps) => (
            <div className={className.item}>{isVisible && <ListItem product={product} />}</div>
          )}
        </VisibilitySensor>
      ))}
    </div>
  )
}
