import { useStore } from 'effector-react'
import { FormEvent, MutableRefObject, Ref, forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Button } from '@shared/ui'

import { Phone } from '../phone'
import { clickSubmitButton, sendAuthDataFx } from './model'
import { className } from './styles'

export const Form = forwardRef((_, ref: Ref<ReCAPTCHA | undefined>) => {
  const isLoading = useStore(sendAuthDataFx.pending)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    clickSubmitButton({ recaptchaRef: ref as MutableRefObject<ReCAPTCHA | undefined> })
  }

  return (
    <>
      <form className={className.form} onSubmit={onSubmit}>
        <h2 className={className.title}>Авторизация</h2>
        <div>
          <Phone className={className.input} />
        </div>
        <Button type='submit' className={className.submit} isLoading={isLoading} disabled={isLoading}>
          ВОЙТИ
        </Button>
      </form>
    </>
  )
})
