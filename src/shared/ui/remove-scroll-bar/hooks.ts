import { useEffect } from 'react'

export const useDisableDocumentScroll = () => {
  useEffect(() => {
    const htmlElem = document.querySelector('html')

    if (htmlElem) htmlElem.style.overflowX = 'unset'

    return () => {
      if (htmlElem) htmlElem.style.overflowX = 'clip'
    }
  })
}
