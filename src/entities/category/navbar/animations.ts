import { MutableRefObject } from 'react'
import scrollIntoView from 'scroll-into-view'

import { animationDuration } from './constants'
import { getNavElements } from './utils'

type AnimateActiveCategoryBorderProps = {
  navRef: MutableRefObject<HTMLElement | null>
  prevActiveElem: MutableRefObject<HTMLAnchorElement | null>
  isFirst: boolean
  isAnimationPlayRef: MutableRefObject<boolean>
}
type StartInitAnimationProps = {
  activeElementBorder: HTMLElement
  activeElement: HTMLAnchorElement
}
type StartMultipleRowAnimationProps = {
  prevActiveElemBorder: HTMLElement
  currentPrevActiveElem: HTMLAnchorElement
  prevActiveRowLastElem: HTMLAnchorElement
  activeElement: HTMLAnchorElement
  activeRowLastElem: HTMLAnchorElement
  activeElementBorder: HTMLElement
}
type StartRowAnimationProps = {
  currentPrevActiveElem: HTMLAnchorElement
  activeElement: HTMLAnchorElement
  prevActiveElemBorder: HTMLElement
  activeElementBorder: HTMLElement
}

const effectTiming = 'cubic-bezier(0.4, 0, 0.2, 1)'

export const animateActiveCategoryBorder = async ({
  navRef,
  prevActiveElem,
  isFirst,
  isAnimationPlayRef,
}: AnimateActiveCategoryBorderProps) => {
  const nav = navRef.current

  if (!nav) return

  const navElements = getNavElements({ nav })
  const activeElement = navElements.activeElement

  if (!activeElement) return

  isAnimationPlayRef.current = true

  const aElements = navElements.aElements
  const activeElementBorder = activeElement.nextElementSibling as HTMLElement
  const activeElementTop = activeElement.getBoundingClientRect().top
  const currentPrevActiveElem = prevActiveElem.current
  const prevActiveElemBorder = currentPrevActiveElem?.nextElementSibling as HTMLElement
  const currentPrevActiveElemTop = currentPrevActiveElem?.getBoundingClientRect().top

  let prevActiveRowLastElem!: HTMLAnchorElement
  let activeRowLastElem!: HTMLAnchorElement

  for (const aElement of aElements) {
    const aElementTop = aElement.getBoundingClientRect().top
    if (aElementTop === currentPrevActiveElemTop) prevActiveRowLastElem = aElement
    if (aElementTop === activeElementTop) activeRowLastElem = aElement
  }

  const prevActiveRowLastElemTop = prevActiveRowLastElem?.getBoundingClientRect().top
  const activeRowLastElemTop = activeRowLastElem?.getBoundingClientRect().top

  if (isFirst || !currentPrevActiveElem) await startInitAnimation({ activeElement, activeElementBorder })
  else if (prevActiveRowLastElemTop !== activeRowLastElemTop)
    await startMultipleRowAnimation({
      activeElement,
      activeElementBorder,
      activeRowLastElem,
      currentPrevActiveElem,
      prevActiveElemBorder,
      prevActiveRowLastElem,
    })
  else await startRowAnimation({ activeElement, activeElementBorder, currentPrevActiveElem, prevActiveElemBorder })

  scrollIntoView(activeElement, {
    time: animationDuration,
    //@ts-ignore
    validTarget: (target, count) => count === 1 && target !== window,
  })
  prevActiveElem.current = activeElement

  isAnimationPlayRef.current = false
}

const startInitAnimation = async ({ activeElementBorder, activeElement }: StartInitAnimationProps) => {
  const keyframes = [
    {
      left: 0,
      width: 0,
    },
    {
      left: 0,
      width: `${getComputedStyle(activeElement).width}`,
    },
  ]

  activeElementBorder.style.visibility = 'visible'
  await activeElementBorder.animate(keyframes, { easing: effectTiming, duration: animationDuration }).finished
}

const startMultipleRowAnimation = async ({
  prevActiveElemBorder,
  currentPrevActiveElem,
  prevActiveRowLastElem,
  activeElement,
  activeRowLastElem,
  activeElementBorder,
}: StartMultipleRowAnimationProps) => {
  const prevElLeft = currentPrevActiveElem.getBoundingClientRect().left
  const prevLastRowLeft = prevActiveRowLastElem.getBoundingClientRect().left

  const activeLeft = activeElement.getBoundingClientRect().left
  const activeLastRowLeft = activeRowLastElem.getBoundingClientRect().left

  const firstAnimationKeyframes = [
    {
      visibility: 'visible',
      left: 0,
      width: `${currentPrevActiveElem.clientWidth}px`,
    },
    {
      visibility: 'hidden',
      left: `${prevActiveRowLastElem.clientWidth + prevLastRowLeft - prevElLeft}px`,
      width: 0,
    },
  ]
  const secondAnimationKeyframes = [
    {
      visibility: 'visible',
      left: `${activeRowLastElem.clientWidth + activeLastRowLeft - activeLeft}px`,
      width: 0,
    },
    {
      visibility: 'visible',
      left: 0,
      width: `${activeElement.clientWidth}px`,
    },
  ]

  prevActiveElemBorder.style.visibility = 'hidden'
  await prevActiveElemBorder.animate(firstAnimationKeyframes, { easing: effectTiming, duration: animationDuration / 2 })
    .finished
  await activeElementBorder.animate(secondAnimationKeyframes, { easing: effectTiming, duration: animationDuration / 2 })
    .finished
  activeElementBorder.style.visibility = 'visible'
}

const startRowAnimation = async ({
  currentPrevActiveElem,
  activeElement,
  prevActiveElemBorder,
  activeElementBorder,
}: StartRowAnimationProps) => {
  const leftPrev = currentPrevActiveElem.getBoundingClientRect().left
  const leftActive = activeElement.getBoundingClientRect().left

  const keyframes = [
    {
      visibility: 'visible',
      left: 0,
      width: `${currentPrevActiveElem.getBoundingClientRect().width}px`,
    },
    {
      visibility: 'hidden',
      left: `${leftActive - leftPrev}px`,
      width: `${activeElement.getBoundingClientRect().width}px`,
    },
  ]

  prevActiveElemBorder.style.visibility = 'hidden'
  await prevActiveElemBorder.animate(keyframes, { easing: effectTiming, duration: animationDuration }).finished
  activeElementBorder.style.visibility = 'visible'
}
