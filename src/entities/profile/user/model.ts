import { createEvent, createStore } from 'effector'
import { GetUser200Response } from '@shared/openapi'

export type UserType = GetUser200Response | null

export const logOut = createEvent()
export const setUser = createEvent<UserType>()
export const getUser = createEvent()

export const $user = createStore<UserType>(null)

$user.reset(logOut)
