import { LegacyRef, forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export const Recaptcha = forwardRef((_, ref: LegacyRef<ReCAPTCHA | undefined>) => {
  return (
    null
    // <ReCAPTCHA
    //   //@ts-ignore
    //   ref={ref}
    //   size='invisible'
    //   sitekey={import.meta.env.FRONT_RECAPTCHA_SITE_KEY}
    //   hl='ru'
    // />
  )
})
