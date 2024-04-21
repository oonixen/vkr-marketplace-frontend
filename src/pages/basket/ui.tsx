import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { info, form, basket } from '@entities/order'
import { user as profileUser } from '@entities/profile'
import { store } from '@entities/store'
import { pageAnimationList } from '@shared/animations'
import { EmptyContent } from '@shared/ui'

import { className } from './styles'

export const Basket = () => {
  const stores = useStore(store.$stores)
  const user = useStore(profileUser.$user)
  const isEmptyBasket = useStore(basket.$isEmpty)

  let jsx

  if (isEmptyBasket) jsx = <EmptyContent text='Корзина пуста' />
  else if (!user) jsx = <EmptyContent text='Авторизуйтесь для совершения заказа' />
  else
    jsx = (
      <>
        <form.Form stores={stores} />
        <info.Info />
      </>
    )

  return (
    <motion.main
      className={className.mainContainer}
      initial={pageAnimationList.hidden}
      animate={pageAnimationList.visible}
    >
      {jsx}
    </motion.main>
  )
}
