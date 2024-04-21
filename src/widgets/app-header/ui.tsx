import { NavigateHeader } from '@features/navigate-header'
import { changeStage } from '@features/profile'
import { appHeader as appHeaderEntitie } from '@entities/app-header'
import { sidebar } from '@entities/profile'

export const AppHeader = () => {
  return (
    <>
      <appHeaderEntitie.Header navigation={<NavigateHeader />} />
      <sidebar.Sidebar children={<changeStage.Stage />} />
    </>
  )
}
