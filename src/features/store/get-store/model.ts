import { sample } from 'effector'
import { user } from '@entities/profile'
import { store } from '@entities/store'

sample({
  clock: user.$user,
  source: store.$stores,
  filter: (store) => !store.length,
  target: store.getStores,
})
