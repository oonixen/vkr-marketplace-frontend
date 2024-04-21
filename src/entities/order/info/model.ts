import { BasketType } from '../basket'

export const getOrderSum = (basket: BasketType): number => {
  return basket.reduce((accum, product) => accum + product.amount * product.price, 0)
}
