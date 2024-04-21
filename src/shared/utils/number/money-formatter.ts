const iNumberFormat = new Intl.NumberFormat('ru-RU')

export const moneyFormatter = (number: number): string => {
  return iNumberFormat.format(number)
}