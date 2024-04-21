import { createEffect, createEvent, createStore, forward, sample } from 'effector'
import { persist as persistSession } from 'effector-storage/session'
import Cookie from 'js-cookie'

type TokensType = { access: string; refresh: string }
type TokenStore = string

const accessTokenKey = 'PM_ACCESS_TOKEN'
const refreshTokenKey = 'PM_REFRESH_TOKEN'

export const setTokens = createEvent<TokensType>()
export const resetTokens = createEvent()

export const $access = createStore<TokenStore>('')
  .on(setTokens, (_, payload) => payload.access)
  .reset(resetTokens)

persistSession({ store: $access, key: accessTokenKey })

export const getAccessTokenFromStorage = () => sessionStorage.getItem(accessTokenKey)?.replaceAll('"', '')
export const getRefreshToken = () => Cookie.get(refreshTokenKey)

const setRefreshTokenFx = createEffect<TokensType['refresh'], void>((refreshToken) => {
  Cookie.set(refreshTokenKey, refreshToken, { expires: 365, sameSite: 'strict', secure: true })
})

const clearRefreshTokenFx = createEffect(() => Cookie.remove(refreshTokenKey))

sample({
  clock: setTokens,
  fn: (clock) => clock.refresh,
  target: setRefreshTokenFx,
})

forward({ from: resetTokens, to: clearRefreshTokenFx })
