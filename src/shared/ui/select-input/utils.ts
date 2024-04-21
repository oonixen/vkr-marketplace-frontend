import { ThemeConfig, ClassNamesConfig, GroupBase } from 'react-select'
import { twMerge } from 'tailwind-merge'
import { className as classNameStyles } from './styles'

type GetClassNamesProps = { className?: string }
type GetClassNamesType = (props: GetClassNamesProps) => ClassNamesConfig<unknown, boolean, GroupBase<unknown>>

export const getTheme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: theme.colors.neutral80,
    primary75: theme.colors.neutral70,
    primary50: theme.colors.neutral5,
    primary25: theme.colors.neutral5,
  },
})

export const getClassNames: GetClassNamesType = ({ className }) => ({
  container: () => twMerge(className && className),
  control: () => classNameStyles.control,
  indicatorSeparator: () => classNameStyles.indicatorSeparator,
  menu: () => classNameStyles.menu,
})
