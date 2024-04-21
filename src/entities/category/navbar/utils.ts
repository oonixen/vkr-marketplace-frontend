type GetActiveElemProps = {
  nav: HTMLElement
}

export const getNavElements = ({ nav }: GetActiveElemProps) => {
  const aElements = Array.from(nav.getElementsByTagName('a'))
  const activeElement = aElements.find((elem) => elem.classList.contains('active'))!
  return { aElements, activeElement }
}
