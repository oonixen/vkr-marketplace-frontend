import { useStore } from 'effector-react'
import { ChangeEvent } from 'react'
import { Input } from '@shared/ui'

import { $card, changeCard } from './model'

type CardProps = { className?: string }

export const Card = ({ className }: CardProps) => {
  const card = useStore($card)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => changeCard(e.currentTarget.value)

  return (
    <Input
      required
      containerClassName={className}
      value={card}
      onChange={onChange}
      type='text'
      placeholder='Номер карты'
    />
  )
}
