import { useStore } from 'effector-react'
import { forwardRef, LegacyRef, MutableRefObject } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Button } from '@shared/ui'

import { $expirationTime } from '../code-form'
import { sendAuthDataFx } from '../form'
import { resendCode } from './model'
import { className as classNameStyles } from './styles'

type CodeResendProps = { className?: string }

export const CodeResend = forwardRef((props: CodeResendProps, ref: LegacyRef<ReCAPTCHA | undefined>) => {
  const expirationTime = useStore($expirationTime)
  const isLoading = useStore(sendAuthDataFx.pending)
  const onClickResendBtn = () => resendCode({ recaptchaRef: ref as MutableRefObject<ReCAPTCHA | undefined> })

  const jsx = !expirationTime ? (
    <Button
      type='button'
      themeStyle='default'
      className={classNameStyles.button}
      onClick={onClickResendBtn}
      isLoading={isLoading}
      disabled={isLoading}
    >
      Повторно отправить код
    </Button>
  ) : (
    <span className={classNameStyles.time}>{new Date(expirationTime).toISOString().slice(11, 19)}</span>
  )

  return <div className={props.className}>{jsx}</div>
})
