import { useStore } from 'effector-react'
import { Button } from '@shared/ui'
import { text } from '@shared/utils'

import { logOut, $user } from './model'
import { className } from './styles'

export const User = () => {
  const user = useStore($user)
  const onClickLogOut = () => logOut()

  if (!user) return null

  const balance = text.getPoints(user.balance)

  return (
    <div>
      <p className={className.bonuses}>Баланс: {balance}</p>
      <Button onClick={onClickLogOut}>ВЫЙТИ</Button>
    </div>
  )
}
