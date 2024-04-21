import { sample } from 'effector'
import { token } from '@entities/auth'
import { user } from '@entities/profile'

sample({
  clock: user.logOut,
  target: token.resetTokens,
})
