import { AnimatePresence, motion } from 'framer-motion'
import { pageAnimationList } from '@shared/animations'
import { StageType } from '../stage'

type AnimationContainerProps = { className?: string; children?: JSX.Element; stage: StageType }

export const AnimationContainer = ({ className, children, stage }: AnimationContainerProps) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={stage}
        className={className}
        initial={pageAnimationList.hidden}
        animate={pageAnimationList.visible}
        exit={pageAnimationList.hidden}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
