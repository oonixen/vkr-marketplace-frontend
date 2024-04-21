import { createEffect, createEvent, sample } from 'effector'
import { token } from '@entities/auth'
import { user } from '@entities/profile'
import { api } from '@shared/api'

export const initProfile = createEvent()

const initProfileFx = createEffect(async () => {
  const refreshToken = token.getRefreshToken()
  if (!refreshToken) return
  const {
    data: { access, refresh },
  } = await api.auth.postAuthRefreshToken({ refresh: refreshToken })
  token.setTokens({ access, refresh })

  const response = await api.default.getUser()
  user.setUser(response.data)
})

sample({
  clock: initProfile,
  source: initProfileFx.pending,
  filter: (source) => !source,
  target: initProfileFx,
})
