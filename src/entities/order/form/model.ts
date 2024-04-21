import { createEffect, createEvent, forward, sample } from 'effector'
import { MutableRefObject } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { api, getRequestError } from '@shared/api'
import { COMMON_ERROR_MESSAGE } from '@shared/messages'
import { createNotification } from '@shared/notifications'
import { ROUTER_PATHS } from '@shared/routers'

import { $basket, BasketType, resetBasket } from '../basket'

type ClickSubmitOrderProps = { pickPointsElemRef: MutableRefObject<any>; navigate: NavigateFunction }
type MakeOrderFxProps = ClickSubmitOrderProps & { basket: BasketType }

class MakeOrderError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export const clickSubmitOrder = createEvent<ClickSubmitOrderProps>()
export const closeOrder = createEvent()

export const makeOrderFx = createEffect<MakeOrderFxProps, void>(async ({ basket, pickPointsElemRef, navigate }) => {
  const pickPoint = pickPointsElemRef.current?.state.selectValue[0].value

  if (!pickPoint) throw new MakeOrderError('Выберите точку самовывоза')

  const { status, data } = await api.default.postOrder({
    goods: basket,
    store: pickPoint,
  })

  if (status === 200) throw new MakeOrderError(data?.error || COMMON_ERROR_MESSAGE)

  closeOrder()
  navigate(ROUTER_PATHS.Root)
  resetBasket()
  createNotification({ message: 'Заказ успешно создан', timer: 10000 })
})

const makeOrderHandleErrorFx = createEffect<Error, void>((error) => {
  let message
  if (error instanceof MakeOrderError) message = error.message
  else message = getRequestError(error) || COMMON_ERROR_MESSAGE

  createNotification({ message })
})

forward({ from: makeOrderFx.failData, to: makeOrderHandleErrorFx })

sample({
  clock: clickSubmitOrder,
  source: $basket,
  fn: (source, clock) => ({ basket: source, ...clock }),
  target: makeOrderFx,
})
