import {moneyFormatter} from '../number'
import {getNumeralWord} from './numeral-word'

export const getPoints = (price: number) => {
  return `${moneyFormatter(price)} ${getNumeralWord({numeral: price, single: 'балл', plural: 'баллов', tenthPlural: 'балла'})}`
}