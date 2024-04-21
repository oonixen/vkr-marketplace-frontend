const style = getComputedStyle(document.body)

export const getAnimations = () => ({
  visible: {
    left: '0%',
    opacity: 1,
  },
  hidden: {
    left: `calc(100% + ${style.getPropertyValue('--notification-container-right')})`,
    opacity: 0,
  },
})
