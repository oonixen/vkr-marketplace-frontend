type GetNumeralWordProps = { numeral: number; plural: string; tenthPlural: string; single: string }

export const getNumeralWord = ({ numeral, plural, tenthPlural, single }: GetNumeralWordProps): string => {
  let name = plural
  const tenthsMod = numeral % 10
  const hundredthsMod = numeral % 100

  if (hundredthsMod === 11 || hundredthsMod === 12 || hundredthsMod === 13 || hundredthsMod === 14) {} 
  else if (tenthsMod === 1) name = single
  else if (tenthsMod === 2 || tenthsMod === 3 || tenthsMod === 4) name = tenthPlural

  return `${name}`
}
