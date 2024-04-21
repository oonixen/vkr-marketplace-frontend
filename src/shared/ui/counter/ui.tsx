import { ArrowUp } from '@shared/icons'
import { className } from './styles'

type CounterProps = { onClickIncrease?: () => void; onClickDecrese?: () => void; amount: number }

const svgWidth = 12

export const Counter = ({ onClickIncrease, onClickDecrese, amount }: CounterProps) => {
  return (
    <div className={className.container}>
      <span className={className.title}>Кол-во</span>
      <div className={className.controllerContainer}>
        <button className={className.button} onClick={onClickDecrese}>
          <ArrowUp width={svgWidth} height={svgWidth} className={className.minusArrow} />
        </button>
        <span className={className.count}>{amount}</span>
        <button className={className.button} onClick={onClickIncrease}>
          <ArrowUp width={svgWidth} height={svgWidth} className={className.plusArrow} />
        </button>
      </div>
    </div>
  )
}
