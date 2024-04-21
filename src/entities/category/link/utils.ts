import { twMerge } from 'tailwind-merge'
import { ROUTER_PATHS } from '@shared/routers'

import { nameOfAllCategories } from './constants'
import { className } from './styles'

type ClassNameFnProps = { categoryName: string }

export const getNavLinkClassName = ({ categoryName }: ClassNameFnProps) => {
  return ({ isActive }: { isActive: boolean }) => {
    const isActiveBoolean =
      isActive || (categoryName === nameOfAllCategories && window.location.pathname === ROUTER_PATHS.Root)
    return twMerge(className.a, isActiveBoolean ? 'active' : '')
  }
}
