import { zeroRightClassName } from 'react-remove-scroll-bar'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { ROUTER_PATHS } from '@shared/routers'

import './styles.css'
import { className } from './styles'
import Logo from '/logo.svg'

type HeaderProps = { navigation: JSX.Element }

export const Header = ({ navigation }: HeaderProps) => {
  return (
    <header className={twMerge(className.header, zeroRightClassName)}>
      <Link to={ROUTER_PATHS.Root} className={className.title}>
        <img className={className.logo} src={Logo} />
      </Link>
      {navigation}
    </header>
  )
}
