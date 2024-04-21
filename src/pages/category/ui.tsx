import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { displayList } from '@features/product'
import { navbar } from '@entities/category'
import { pageAnimationList } from '@shared/animations'
import { ScrollTopButton } from '@shared/ui'

import { className } from './styles'

export const Category = () => {
  return (
    <main className={twMerge(className.main)}>
      <motion.div initial={pageAnimationList.hidden} animate={pageAnimationList.visible}>
        <navbar.Navbar navClassName={className.navigateCategoryNavBlock} />
      </motion.div>
      <displayList.List />
      <ScrollTopButton />
    </main>
  )
}
