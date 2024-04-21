import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Spinner } from '@shared/icons'
import { button } from '@shared/styles'

import { className } from './styles'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  isLoading?: boolean
  themeStyle?: 'default' | 'animated'
}

const { className: buttonClassName } = button

const svgWidth = 15

export const Button = ({ children, isLoading, themeStyle = 'animated', ...props }: ButtonProps) => {
  const classes = themeStyle === 'animated' ? twMerge(buttonClassName.button, buttonClassName.buttonAnimation) : ''

  return (
    <button {...props} className={twMerge(buttonClassName.defaultButton, classes, props.className)}>
      {isLoading && (
        <div className={className.spinnerContainer}>
          <Spinner width={svgWidth} height={svgWidth} />
        </div>
      )}
      <div className={twMerge(isLoading && className.childrenInvisible)}>{children}</div>
    </button>
  )
}
