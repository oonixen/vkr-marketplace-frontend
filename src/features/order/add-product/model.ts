import { createEffect, createEvent, forward, sample } from 'effector'
import { basket } from '@entities/order'
import { details as productDetails } from '@entities/product'
import { user } from '@entities/profile'
import { createNotification } from '@shared/notifications'

type AddProductFxProps = {
  product: basket.BasketProductType
  user: user.UserType
}

export const addProduct = createEvent<basket.BasketProductType>()

const addProductFx = createEffect<AddProductFxProps, any>(({ product, user }) => {
  if (!user) return createNotification({ message: 'Авторизуйтесь для совершения покупок' })
  createNotification({ message: 'Товар добавлен' })
  basket.addProduct(product)
})

forward({ from: productDetails.addProduct, to: addProduct })

sample({
  clock: addProduct,
  source: user.$user,
  fn: (source, clock) => ({ product: clock, user: source }),
  target: addProductFx,
})
