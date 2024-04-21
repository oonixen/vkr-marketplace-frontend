import { useStore } from 'effector-react'
import { ArrowUp } from '@shared/icons'

import { $stage } from '../stage'
import { clickBackBtn } from './model'
import { className } from './styles'

export const BackButton = () => {
  const stage = useStore($stage)
  const onClickBackBtn = () => clickBackBtn()

  if (stage !== 'check-code') return null

  return (
    <button onClick={onClickBackBtn} className={className.backButton}>
      <ArrowUp width={22} />
    </button>
  )
}
