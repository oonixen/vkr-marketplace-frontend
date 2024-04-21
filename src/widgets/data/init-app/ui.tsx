import { useStore } from 'effector-react'
import '@features/order'
import '@features/store'
import { Loader } from '@shared/ui'

import { useInitApp } from './hooks'
import { $isLoading } from './model'

export const InitApp = () => {
  const isLoading = useStore($isLoading)

  useInitApp()

  if (!isLoading) return null

  return <Loader />
}
