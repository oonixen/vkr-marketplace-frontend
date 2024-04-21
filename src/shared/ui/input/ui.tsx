import InputMask, { Props as ReactInputMaskProps } from 'react-input-mask'
import { twMerge } from 'tailwind-merge'

import { className } from './styles'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  Partial<ReactInputMaskProps> & { containerClassName?: string }

export const Input = ({ containerClassName, ...props }: InputProps) => {
  props.className = twMerge(className.input, props.className)
  //@ts-ignore
  const input = props.mask ? <InputMask {...props} /> : <input {...props} />
  const title = props.title ? <span>{props.title}</span> : null

  return (
    <div className={containerClassName}>
      {title}
      {input}
    </div>
  )
}
