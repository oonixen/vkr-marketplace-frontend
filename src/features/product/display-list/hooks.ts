import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useIsFirstRender } from '@shared/hooks'

import { changeCategory } from './model'

export const useLocationChange = () => {
  const isFirst = useIsFirstRender()
  const location = useLocation()

  useEffect(() => {
    //change category after page's animation
    setTimeout(() => changeCategory(location), isFirst ? 0 : 500)
  }, [location])

  return location
}
