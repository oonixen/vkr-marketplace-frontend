import { useLayoutEffect } from 'react'
import { initProfile } from '@features/profile'

import { substituteApiRequest, startLoading } from './model'

export const useInitApp = () => {
  useLayoutEffect(() => {
    substituteApiRequest()
    startLoading()
    initProfile.initProfile()
  }, [])
}
