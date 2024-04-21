import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { NavLink } from 'react-router-dom'
import { className } from './styles'

type LinkProps = { href?: string; svg: JSX.Element; title: string; onClick?: () => void }
type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Link = ({ href, svg, title, onClick }: LinkProps) => {
  const Container = href ? NavLink : (props: ButtonProps) => <button {...props} />

  return (
    <Container className={className.a} to={href!} onClick={onClick}>
      <picture>{svg}</picture>
      <span className={className.title}>{title}</span>
    </Container>
  )
}
