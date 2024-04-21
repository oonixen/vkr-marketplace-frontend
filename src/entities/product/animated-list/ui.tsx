import { AnimatePresence, motion } from 'framer-motion'
import { Location } from 'react-router-dom'
import { pageAnimationList } from '@shared/animations'

import { List } from '../list'
import { className } from './styles'

type AnimatedListProps = { location: Location<any> }

export const AnimatedList = ({ location }: AnimatedListProps) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        className={className.viewProductListSection}
        initial={pageAnimationList.hidden}
        animate={pageAnimationList.visible}
        exit={pageAnimationList.hidden}
      >
        <List />
      </motion.div>
    </AnimatePresence>
  )
}
