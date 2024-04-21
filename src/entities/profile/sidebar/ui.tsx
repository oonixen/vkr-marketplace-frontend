import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { Cross } from '@shared/icons'
import { RemoveScrollBar } from '@shared/ui'

import { BackButton } from '../back-button'
import { hoverContainerAnimationList, getSectionAnimationList } from './animations'
import { $isShowSidebar, hideSidebar } from './model'
import { className } from './styles'

type SidebarProps = { children?: JSX.Element }

export const Sidebar = ({ children }: SidebarProps) => {
  const isShowLoginSection = useStore($isShowSidebar)
  const sectionAnimationList = getSectionAnimationList()

  return (
    <>
      {isShowLoginSection && <RemoveScrollBar />}
      <motion.div
        initial={false}
        //@ts-ignore
        animate={isShowLoginSection ? hoverContainerAnimationList.visible : hoverContainerAnimationList.hidden}
        className={className.hoverContainer}
        onClick={hideSidebar}
      />
      <motion.section
        initial={false}
        animate={isShowLoginSection ? sectionAnimationList.visible : sectionAnimationList.hidden}
        className={className.section}
      >
        {children}
        <BackButton />
        <button className={className.close} onClick={hideSidebar}>
          <Cross width={25} />
        </button>
      </motion.section>
    </>
  )
}
