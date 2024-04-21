import { createEvent, sample } from 'effector'
import { MutableRefObject } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { $card, $phone } from '../code-form'

import { sendAuthDataFx } from '../form'

type ResendCodeProps = { recaptchaRef: MutableRefObject<ReCAPTCHA | undefined> }

export const resendCode = createEvent<ResendCodeProps>()

sample({
  clock: resendCode,
  source: { card: $card, phone: $phone },
  fn: (source, clock) => ({ ...source, ...clock }),
  target: sendAuthDataFx,
})
