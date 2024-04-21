import { createEffect, createEvent, forward, sample } from 'effector'
import { MutableRefObject } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { api, getRequestError } from '@shared/api'
import { COMMON_ERROR_MESSAGE } from '@shared/messages'
import { createNotification } from '@shared/notifications'
import { phone as phoneUtils } from '@shared/utils'

import { $card } from '../card'
import { $phone } from '../phone'

type ClickSubmitButtonProps = {
  recaptchaRef: MutableRefObject<ReCAPTCHA | undefined>
}
type FormData = { card: string; phone: string }
type SendAuthDataFx = ClickSubmitButtonProps & FormData
export type DoneFormSubmitProps = { expirationTime: number } & FormData

class SubmitError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export const clickSubmitButton = createEvent<ClickSubmitButtonProps>()
export const doneFormSubmit = createEvent<DoneFormSubmitProps>()

export const sendAuthDataFx = createEffect<SendAuthDataFx, void, Error>(async ({ recaptchaRef, card, phone }) => {
  phone = phoneUtils.clearMask(phone)

  // if (!recaptchaRef.current) throw new SubmitError('Recaptcha не пройдена')
  if (!phoneUtils.checkValidPhone(phone)) throw new SubmitError('Введён некорректный телефон')

  // const guardId = await recaptchaRef.current.executeAsync()
  const guardId = ''

  // if (!guardId) throw new SubmitError('Recaptcha не пройдена')

  const {
    data: { expirationTime },
  } = await api.auth.postAuthSendCode({ card, guardId, phone }, { headers: { bearer: import.meta.env.FRONT_BEARER } })

  doneFormSubmit({ expirationTime, phone, card })
})

const sendAuthDataErrorHandlerFx = createEffect<Error, void>((error) => {
  let errorMessage
  if (error instanceof SubmitError) errorMessage = error.message
  else errorMessage = getRequestError(error) || COMMON_ERROR_MESSAGE

  createNotification({ message: errorMessage })
})

sample({
  clock: clickSubmitButton,
  source: { card: $card, phone: $phone },
  fn: (source, clock) => ({ ...source, ...clock }),
  target: sendAuthDataFx,
})

forward({ from: sendAuthDataFx.failData, to: sendAuthDataErrorHandlerFx })
