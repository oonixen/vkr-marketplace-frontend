import { Link } from '../link'
import { className } from './styles'

export type NavigationLinkType = {
  onClick?: () => void
  svg: JSX.Element
  title: string
  href?: string
}

type NavigationProps = { links: NavigationLinkType[] }

export const Navigation = ({ links }: NavigationProps) => {
  return (
    <nav className={className.nav}>
      {links.map((link, index) => (
        <Link key={`link-${index}`} {...link} />
      ))}
    </nav>
  )
}
