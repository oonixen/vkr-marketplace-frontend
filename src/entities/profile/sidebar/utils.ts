export const getRightAnimationPosition = () => {
  const clientWidth = document.body.clientWidth

  if (clientWidth < 768) return `-100vw`
  else if (clientWidth < 992) return `-50vw`
  return `-40vw`
}
