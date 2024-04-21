import { motion } from 'framer-motion'

import { getAnimations } from './animations'
import { NotificationType } from './model'
import { className } from './styles'
import './styles.css'

type NotificationProps = { notification: NotificationType }

export const Notification = ({ notification }: NotificationProps) => {
  const animations = getAnimations()

  return (
    <motion.div
      className={className.notificationContainer}
      initial={animations.hidden}
      animate={animations.visible}
      exit={animations.hidden}
    >
      <span className={className.message}>{notification.message}</span>
    </motion.div>
  )
}
