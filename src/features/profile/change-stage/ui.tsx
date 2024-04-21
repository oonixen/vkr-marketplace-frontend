import { useStore } from 'effector-react'
import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { recaptcha } from '@entities/auth'
import { form, codeForm } from '@entities/auth'
import { stage as profileStage, animationContainer, user } from '@entities/profile'

import { className } from './styles'
import './model'

export const Stage = () => {
  const recaptchaRef = useRef<ReCAPTCHA>()
  const stage = useStore(profileStage.$stage)
  let jsx = null

  switch (stage) {
    case 'auth':
      jsx = <form.Form ref={recaptchaRef} />
      break
    case 'check-code':
      jsx = <codeForm.CodeForm ref={recaptchaRef} />
      break
    case 'profile':
      jsx = <user.User />
      break
  }

  return (
    <>
      <animationContainer.AnimationContainer className={className.section} stage={stage}>
        {jsx}
      </animationContainer.AnimationContainer>
      {stage !== 'profile' && <recaptcha.Recaptcha ref={recaptchaRef} />}
    </>
  )
}
