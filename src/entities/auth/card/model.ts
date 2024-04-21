import { createEvent, createStore } from 'effector'

export const changeCard = createEvent<string>()

export const $card = createStore<string>('')

$card.on(changeCard, (_, payload) => payload)
