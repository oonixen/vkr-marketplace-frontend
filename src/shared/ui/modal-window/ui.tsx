import { createPortal } from 'react-dom'
import { RemoveScrollBar } from '@shared/ui'

import { className } from './styles'

type ModalWindowProps = { children?: JSX.Element }

export const ModalWindow = ({ children }: ModalWindowProps) => {
  return createPortal(
    <>
      <div className={className.bg}>
        <div className={className.container}>{children}</div>
      </div>
      <RemoveScrollBar />
    </>,
    document.getElementById('modals')!,
  )
}
