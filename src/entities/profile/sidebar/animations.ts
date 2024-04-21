import { getRightAnimationPosition } from './utils'

const transition = {
  duration: 0.4,
}

export const hoverContainerAnimationList = {
  visible: {
    visibility: 'visible',
    opacity: 1,
    transition,
  },
  hidden: {
    opacity: 0,
    transition,
    transitionEnd: { visibility: 'hidden' },
  },
}

export const getSectionAnimationList = () => ({
  visible: {
    display: 'flex',
    right: 0,
    transition,
  },
  hidden: {
    right: getRightAnimationPosition(),
    transition,
    transitionEnd: { display: 'none' },
  },
})
