import { twMerge } from 'tailwind-merge'
import { ArrowUp } from '@shared/icons'

import { useVisibilityToggle } from './hooks'
import { className } from './styles'
import { scrollToPageTop } from './utils'

const svgHeight = 34

export const ScrollTopButton = () => {
  const isShow = useVisibilityToggle()

  return (
    <button className={twMerge(className.button, !isShow && className.buttonHide)} onClick={scrollToPageTop}>
      <ArrowUp width={svgHeight} height={svgHeight} />
    </button>
  )
}
