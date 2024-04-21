import { ForwardedRef, forwardRef } from 'react'
import Select, { Props } from 'react-select'

import { getTheme, getClassNames } from './utils'

type SelectInputProps = Props

export const SelectInput = forwardRef((props: SelectInputProps, ref: ForwardedRef<any>) => {
  const { className, ...restProps } = props

  return <Select ref={ref} {...restProps} theme={getTheme} classNames={getClassNames({ className })} />
})
