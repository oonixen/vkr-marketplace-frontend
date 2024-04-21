import { createEvent, createStore } from 'effector'

export type StageType = 'auth' | 'check-code' | 'profile'

export const setStage = createEvent<StageType>()

export const $stage = createStore<StageType>('auth')

$stage.on(setStage, (_, payload) => payload)
