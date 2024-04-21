import { createEffect, createEvent, createStore, sample } from 'effector'
import { id as idUtils } from '@shared/utils'

export type NotificationType = { id?: string; timer?: number; message: string }
type CreateNotificationFxProps = { notification: NotificationType; notifications: NotificationType[] }
type DeleteNotificationFxProps = CreateNotificationFxProps

export const createNotification = createEvent<NotificationType>()
const deleteNotification = createEvent<NotificationType>()

export const $notifications = createStore<NotificationType[]>([])

const createNotificationFx = createEffect<CreateNotificationFxProps, NotificationType[]>(
  ({ notification, notifications }) => {
    const id = idUtils.getUniqueID()
    const timer = 4000
    notification = { id, timer, ...notification }

    setTimeout(() => deleteNotification(notification), notification.timer)
    return [...notifications, notification]
  },
)

const deleteNotificationFx = createEffect<DeleteNotificationFxProps, NotificationType[]>(
  ({ notification, notifications }) => {
    const newNotifications = notifications.filter((noti) => noti.id !== notification.id)
    return newNotifications
  },
)

$notifications.on(createNotificationFx.doneData, (_, payload) => payload)
$notifications.on(deleteNotificationFx.doneData, (_, payload) => payload)

sample({
  clock: deleteNotification,
  source: $notifications,
  fn: (source, clock) => ({ notification: clock, notifications: source }),
  target: deleteNotificationFx,
})

sample({
  clock: createNotification,
  source: $notifications,
  fn: (source, clock) => ({ notification: clock, notifications: source }),
  target: createNotificationFx,
})
