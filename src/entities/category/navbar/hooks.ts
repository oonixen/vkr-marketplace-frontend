import { MutableRefObject, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import scrollIntoView from 'scroll-into-view'
import { useIsFirstRender } from '@shared/hooks'

import { animateActiveCategoryBorder } from './animations'
import { animationDuration } from './constants'
import { getNavElements } from './utils'

type UseScrollToActiveCategoryProps = { navRef: MutableRefObject<HTMLElement | null> }
type UseAnimateCategoryChange = UseScrollToActiveCategoryProps & { isAnimationPlayRef: MutableRefObject<boolean> }

export const useScrollToActiveCategory = ({ navRef }: UseScrollToActiveCategoryProps) => {
  useEffect(() => {
    setTimeout(() => {
      if (!navRef.current) return
      const { activeElement } = getNavElements({ nav: navRef.current })
      scrollIntoView(activeElement, {
        time: 300,
        validTarget: (target, count) => {
          //@ts-ignore
          return count === 1 && target !== window
        },
      })
    }, animationDuration)
  }, [])
}

export const useAnimateCategoryChange = ({ navRef, isAnimationPlayRef }: UseAnimateCategoryChange) => {
  const location = useLocation()
  const prevActiveElem = useRef(null)
  const isFirst = useIsFirstRender()

  useEffect(() => {
    animateActiveCategoryBorder({ navRef, prevActiveElem, isFirst, isAnimationPlayRef })
  }, [location])
}
