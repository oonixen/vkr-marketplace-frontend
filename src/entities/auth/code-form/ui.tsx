import { useStore } from 'effector-react'
import { FormEventHandler, Ref, forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Button } from '@shared/ui'

import { CodeInput } from '../code-input'
import { CodeResend } from '../code-resend'
import { checkCode, checkCodeFx } from './model'
import { className } from './styles'

export const CodeForm = forwardRef((_, recaptchaRef: Ref<ReCAPTCHA | undefined>) => {
  const isLoading = useStore(checkCodeFx.pending)
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    checkCode({ event })
  }

  return (
    <form onSubmit={onSubmit}>
      <CodeInput />
      <Button type='submit' className={className.button} isLoading={isLoading} disabled={isLoading}>
        Отправить
      </Button>
      <CodeResend className={className.resendContainer} ref={recaptchaRef} />
    </form>
  )
})
