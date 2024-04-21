import { createEvent, createStore } from 'effector'

export const changePhone = createEvent<string>()

export const $phone = createStore<string>('')

$phone.on(changePhone, (_, payload) => payload)
