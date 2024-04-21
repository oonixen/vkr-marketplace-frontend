import { motion } from 'framer-motion'
import { details, gallery } from '@entities/product'
import { pageAnimationList } from '@shared/animations'
import { EmptyContent } from '@shared/ui'

import { useGetProduct } from './hooks'
import { className } from './styles'

export const Product = () => {
  const product = useGetProduct()
  let jsx = null

  if (!product) jsx = <EmptyContent text='Товар не найден' />
  else
    jsx = (
      <>
        <gallery.Gallery product={product} />
        <details.Details product={product} />
      </>
    )

  return (
    <motion.main className={className.main} initial={pageAnimationList.hidden} animate={pageAnimationList.visible}>
      {jsx}
    </motion.main>
  )
}
