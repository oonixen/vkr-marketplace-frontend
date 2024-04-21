import { useNavigate } from 'react-router-dom'
import { ROUTER_PATHS } from '@shared/routers'
import { Button } from '@shared/ui'

import { className } from './styles'

type EmptyContentProps = { text: string }

export const EmptyContent = ({ text }: EmptyContentProps) => {
  const navigate = useNavigate()
  const onClickBack = () => navigate(ROUTER_PATHS.Root)

  return (
    <section className={className.container}>
      <h1 className={className.title}>{text}</h1>
      <Button className={className.link} onClick={onClickBack}>
        НАЗАД
      </Button>
    </section>
  )
}
