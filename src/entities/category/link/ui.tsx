import { MouseEventHandler } from 'react'
import { NavLink } from 'react-router-dom'

import { className } from './styles'
import { getNavLinkClassName } from './utils'

type LinkProps = { categoryName: string; href: string; onClick?: MouseEventHandler<HTMLAnchorElement> }

export const Link = ({ categoryName, href, onClick }: LinkProps) => {
  const navLinkClassName = getNavLinkClassName({ categoryName })

  return (
    <div className={className.container}>
      <NavLink to={href} className={navLinkClassName} onClick={onClick}>
        {categoryName}
      </NavLink>
      <div className={className.bottomBorder} />
    </div>
  )
}
