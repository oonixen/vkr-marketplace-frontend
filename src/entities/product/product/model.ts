import { createEvent, createStore } from 'effector'
import { Good } from '@shared/openapi'

export type ProductsType = Array<Good> | null

export const setProducts = createEvent<ProductsType>()

export const $products = createStore<ProductsType>([])

$products.on(setProducts, (_, payload) => payload)
