import { animatedList } from '@entities/product'

import { useLocationChange } from './hooks'

export const List = () => {
  const location = useLocationChange()

  return <animatedList.AnimatedList location={location} />
}
