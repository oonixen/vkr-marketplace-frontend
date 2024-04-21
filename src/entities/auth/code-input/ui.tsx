import { useStore } from 'effector-react'
import { ChangeEventHandler } from 'react'
import { Input } from '@shared/ui'

import { $code, setCode } from '../code-form'

export const CodeInput = () => {
  const code = useStore($code)
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCode(e.target.value)
  }

  return <Input required value={code} onChange={onChange} mask={'9999'} maskChar={null} placeholder='Проверочный код' />
}
