import { LinkProps, Link as RouterLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { button } from '@shared/styles'

import { className } from './styles'

type LinkType = LinkProps & React.RefAttributes<HTMLAnchorElement>

const { className: btnClassName } = button

export const Link = (props: LinkType) => {
  return (
    <RouterLink
      {...props}
      className={twMerge(btnClassName.button, btnClassName.buttonAnimation, className.link, props.className)}
    />
  )
}
