import { useStore } from 'effector-react'
import { navigation } from '@entities/app-header'
import { basket as basketOrder } from '@entities/order'
import { user as userProfile } from '@entities/profile'

import { getNavLinks } from './utils'

export const NavigateHeader = () => {
  const user = useStore(userProfile.$user)
  const basket = useStore(basketOrder.$basket)
  const navLinks = getNavLinks(user, basket)

  return <navigation.Navigation links={navLinks} />
}
