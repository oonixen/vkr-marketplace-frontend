import { createEvent, createStore } from 'effector'

export const changeSidebarVisability = createEvent<boolean>()
export const clickSidebar = createEvent()

export const $isShowSidebar = createStore(false)

export const hideSidebar = () => changeSidebarVisability(false)

$isShowSidebar.on(changeSidebarVisability, (_, payload) => payload)
