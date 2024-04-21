import { createEffect, forward, sample } from 'effector'
import { token, codeForm } from '@entities/auth'
import { form as orderForm } from '@entities/order'
import { user, stage } from '@entities/profile'
import { api, getRequestError } from '@shared/api'
import { COMMON_ERROR_MESSAGE } from '@shared/messages'
import { createNotification } from '@shared/notifications'
import { GetUser200Response } from '@shared/openapi'

const getUserFx = createEffect<void, GetUser200Response>(async () => {
  const response = await api.default.getUser()
  return response.data
})

const getUserErrorHandlerFx = createEffect<Error, void>((error) => {
  const message = getRequestError(error) || COMMON_ERROR_MESSAGE
  createNotification({ message })
  stage.setStage('auth')
})

user.$user.on([user.setUser, getUserFx.doneData], (_, payload) => payload)

sample({
  clock: user.getUser,
  source: { user: user.$user, access: token.$access },
  filter: (source) => Boolean(!source.user) && Boolean(source.access),
  target: getUserFx,
})
sample({
  clock: orderForm.closeOrder,
  target: getUserFx,
})

forward({ from: getUserFx.failData, to: getUserErrorHandlerFx })
forward({ from: codeForm.successCodeCheck, to: user.getUser })
