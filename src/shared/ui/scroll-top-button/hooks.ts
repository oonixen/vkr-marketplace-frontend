import { useEffect, useState } from 'react'

export const useVisibilityToggle = () => {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const fn = () => {
      if (window.scrollY <= 10) return setIsShow(false)
      setIsShow(true)
    }

    addEventListener('scroll', fn)

    return () => {
      removeEventListener('scroll', fn)
    }
  }, [])

  return isShow
}
