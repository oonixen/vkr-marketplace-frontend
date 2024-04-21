import { twMerge } from 'tailwind-merge'
import { className } from './styles'

export const Loader = () => {
  return <span className={twMerge(className.loader, className.loaderAfter)} />
}
