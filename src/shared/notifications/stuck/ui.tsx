import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'

import { Notification, $notifications } from '../notification'

import { className } from './styles'

export const NotificationsStuck = () => {
  const notifications = useStore($notifications)

  return (
    <div className={className.container}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={`notification-${notification.id}`} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  )
}
