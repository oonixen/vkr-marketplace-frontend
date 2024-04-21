import { RemoveScrollBar as ReactRemoveScrollBar } from 'react-remove-scroll-bar'

import { useDisableDocumentScroll } from './hooks'

export const RemoveScrollBar = () => {
  useDisableDocumentScroll()

  return <ReactRemoveScrollBar />
}
