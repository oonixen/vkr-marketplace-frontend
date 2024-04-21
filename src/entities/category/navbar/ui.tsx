import { useStore } from 'effector-react'
import { MouseEventHandler, MutableRefObject, useMemo, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { getRouterUrl, ROUTER_PATHS } from '@shared/routers'

import { Link } from '../link'
import { useScrollToActiveCategory, useAnimateCategoryChange } from './hooks'
import { $categoriesNames } from './model'
import { className } from './styles'

type CategoryProps = { navClassName?: string }

export const Navbar = ({ navClassName }: CategoryProps) => {
  const navRef: MutableRefObject<HTMLElement | null> = useRef(null)
  const categoriesNames = useStore($categoriesNames)
  const isAnimationPlayRef = useRef<boolean>(false)
  const onClickLink: MouseEventHandler<HTMLAnchorElement> = (e) => isAnimationPlayRef.current && e.preventDefault()

  useScrollToActiveCategory({ navRef })
  useAnimateCategoryChange({ navRef, isAnimationPlayRef })

  return useMemo(
    () => (
      <nav ref={navRef} className={twMerge(className.nav, navClassName)}>
        {categoriesNames.map((categoryName, activeElemIndex) => (
          <Link
            onClick={onClickLink}
            key={`${activeElemIndex}-${categoryName}`}
            href={getRouterUrl({ routName: ROUTER_PATHS.Category, dynamicRoutNames: [categoryName] })}
            categoryName={categoryName}
          />
        ))}
      </nav>
    ),
    [],
  )
}
