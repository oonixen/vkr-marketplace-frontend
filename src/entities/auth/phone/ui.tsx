import { useStore } from 'effector-react'
import { ChangeEvent } from 'react'
import { Input } from '@shared/ui'

import { $phone, changePhone } from './model'

type PhoneProps = { className?: string }

export const Phone = ({ className }: PhoneProps) => {
  const phone = useStore($phone)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => changePhone(e.currentTarget.value)

  return (
    <Input
      required
      value={phone}
      onChange={onChange}
      containerClassName={className}
      mask={'+7 999 999 99 99'}
      maskChar={null}
      placeholder='Телефон'
      type='tel'
    />
  )
}
