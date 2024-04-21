import { useStore } from 'effector-react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { AppFooter } from '@widgets/app-footer'
import { AppHeader } from '@widgets/app-header'
import { initApp } from '@widgets/data'

export const Root = () => {
  const isLoadingApp = useStore(initApp.$isLoading)

  if (isLoadingApp) return null

  return (
    <>
      <ScrollRestoration />
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  )
}
