import { createEffect, createEvent, forward } from 'effector'
import { RefObject } from 'react'
import { createNotification } from '@shared/notifications'
import { Good, PostOrderRequestGoodsInner } from '@shared/openapi'

type ClickAddProductProlps = { product: Good; selectRef: RefObject<any> }

export const clickAddProduct = createEvent<ClickAddProductProlps>()
export const addProduct = createEvent<PostOrderRequestGoodsInner>()

const clickAddProductFx = createEffect<ClickAddProductProlps, PostOrderRequestGoodsInner, Error>(
  ({ product, selectRef }) => {
    const selectedModifier = selectRef.current?.state.selectValue[0].value

    if (product.modifiers.length && !selectedModifier) throw new Error('Выберите модификатор')

    return {
      id: product.id,
      amount: 1,
      images: product.images,
      name: product.name,
      price: product.price,
      modifier: selectedModifier,
    }
  },
)

const clickAddProductErrorHandlerFx = createEffect<Error, void>((error) => {
  createNotification({ message: error.message })
})

forward({ from: clickAddProduct, to: clickAddProductFx })
forward({ from: clickAddProductFx.failData, to: clickAddProductErrorHandlerFx })
forward({ from: clickAddProductFx.doneData, to: addProduct })

export const getModifierOptions = (product: Good) => {
  return product.modifiers.map((modifier) => ({ value: modifier, label: modifier.name }))
}
