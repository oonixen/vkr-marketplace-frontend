import { navigation } from '@entities/app-header'
import { basket } from '@entities/order'
import { user as userProfile } from '@entities/profile'
import { User, Bag, BagFull } from '@shared/icons'
import { ROUTER_PATHS } from '@shared/routers'

import { showProfileSidebar } from './model'

const svgSize = 25

export const getNavLinks = (user: userProfile.UserType, basket: basket.BasketType) => {
  const navLinks: navigation.NavigationLinkType[] = [
    {
      onClick: showProfileSidebar,
      svg: <User width={svgSize} />,
      title: user ? 'ПРОФИЛЬ' : 'ВОЙТИ',
    },
    {
      href: ROUTER_PATHS.Basket,
      svg: basket.length ? <BagFull width={svgSize} /> : <Bag width={svgSize} />,
      title: 'КОРЗИНА',
    },
  ]

  return navLinks
}
