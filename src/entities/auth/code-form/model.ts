import { createEffect, createEvent, createStore, forward, sample } from 'effector'
import { FormEvent } from 'react'
import { api, getRequestError } from '@shared/api'
import { COMMON_ERROR_MESSAGE } from '@shared/messages'
import { createNotification } from '@shared/notifications'
import { PostAuthVerifyCodeRequest } from '@shared/openapi'

import { doneFormSubmit } from '../form'
import { setTokens } from '../token'

type CheckCodeProps = { event: FormEvent<HTMLFormElement> }
type CheckCodeFxProps = PostAuthVerifyCodeRequest & CheckCodeProps

class CheckCodeError extends Error {
  constructor(message: string) {
    super(message)
  }
}

let intervalId: number = 0

export const setCode = createEvent<string>()
export const checkCode = createEvent<CheckCodeProps>()
export const successCodeCheck = createEvent()
export const setExpirationTime = createEvent<number>()

export const $code = createStore<string>('')
export const $card = createStore<string>('')
export const $phone = createStore<string>('')
export const $expirationTime = createStore<number>(0)

$code.on(setCode, (_, payload) => payload)
$expirationTime.on(setExpirationTime, (_, payload) => payload)

export const checkCodeFx = createEffect<CheckCodeFxProps, void, Error>(async ({ event, card, code, phone }) => {
  event.preventDefault()
  if (!code) throw new CheckCodeError('Введите код из СМС')
  const {
    data: { access, refresh },
  } = await api.auth.postAuthVerifyCode({ card, code, phone })
  setTokens({ access, refresh })
  successCodeCheck()
})

const checkCodeErrorHandlerFx = createEffect<Error, void>((error) => {
  let errorMessage
  if (error instanceof CheckCodeError) errorMessage = error.message
  else errorMessage = getRequestError(error) || COMMON_ERROR_MESSAGE

  createNotification({ message: errorMessage })
})

const startExpirationTimerFx = createEffect<number, void>((expirationTime) => {
  let time = expirationTime
  clearInterval(intervalId)

  if (!time) return

  intervalId = setInterval(() => {
    const newTime = (time -= 1000)
    if (newTime <= 0) {
      setExpirationTime(0)
      return clearInterval(intervalId)
    }
    setExpirationTime(newTime)
  }, 1000)
})

sample({
  clock: checkCode,
  fn: (source, clock) => ({ ...source, ...clock }),
  source: { card: $card, code: $code, phone: $phone },
  target: checkCodeFx,
})
sample({ clock: doneFormSubmit, fn: ({ phone }) => phone, target: $phone })
sample({ clock: doneFormSubmit, fn: ({ card }) => card, target: $card })
sample({
  clock: doneFormSubmit,
  fn: ({ expirationTime }) => expirationTime,
  target: [$expirationTime, startExpirationTimerFx],
})
forward({ from: checkCodeFx.failData, to: checkCodeErrorHandlerFx })
