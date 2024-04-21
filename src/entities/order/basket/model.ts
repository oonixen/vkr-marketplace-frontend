import { createEffect, createEvent, createStore, sample } from 'effector'
import { PostOrderRequestGoodsInner } from '@shared/openapi'

export type BasketProductType = PostOrderRequestGoodsInner
export type BasketType = BasketProductType[]
type AddProductFxProps = { product: BasketProductType; basket: BasketType }
type DecreaseProductFxProps = AddProductFxProps
type DeleteProductFxProps = AddProductFxProps

export const addProduct = createEvent<BasketProductType>()
export const decreaseProduct = createEvent<BasketProductType>()
export const deleteProduct = createEvent<BasketProductType>()
export const resetBasket = createEvent()

export const $basket = createStore<BasketType>([])
export const $isEmpty = createStore<boolean>(true)

const addProductFx = createEffect<AddProductFxProps, BasketType>(({ basket, product }) => {
  basket = [...basket]

  const productIndex = findProductIndex(product, basket)
  const basketProduct = basket[productIndex]

  if (!basketProduct) basket.push(product)
  else basketProduct.amount++

  return basket
})

const decreaseProductFx = createEffect<DecreaseProductFxProps, BasketType>(({ basket, product }) => {
  basket = [...basket]

  const productIndex = findProductIndex(product, basket)
  const basketProduct = basket[productIndex]

  if (!basketProduct) return basket

  if (basketProduct.amount > 1) product.amount--
  else basket.splice(productIndex, 1)

  return basket
})

const deleteProductFx = createEffect<DeleteProductFxProps, BasketType>(({ basket, product }) => {
  basket = [...basket]

  const productIndex = findProductIndex(product, basket)
  const basketProduct = basket[productIndex]

  if (!basketProduct) return basket

  basket.splice(productIndex, 1)

  return basket
})

$basket.on(addProductFx.doneData, (_, payload) => payload)
$basket.on(decreaseProductFx.doneData, (_, payload) => payload)
$basket.on(deleteProductFx.doneData, (_, payload) => payload)
$isEmpty.on($basket, (_, payload) => !payload.length)
$basket.reset(resetBasket)

sample({
  clock: addProduct,
  source: { basket: $basket },
  fn: (source, clock) => ({ basket: source.basket, product: clock }),
  target: addProductFx,
})

sample({
  clock: decreaseProduct,
  source: { basket: $basket },
  fn: (source, clock) => ({ basket: source.basket, product: clock }),
  target: decreaseProductFx,
})

sample({
  clock: deleteProduct,
  source: { basket: $basket },
  fn: (source, clock) => ({ basket: source.basket, product: clock }),
  target: deleteProductFx,
})

function findProductIndex(product: BasketProductType, basket: BasketType): number {
  return basket.findIndex(
    (basketProduct) => basketProduct.id === product.id && basketProduct.modifier === product.modifier,
  )
}
