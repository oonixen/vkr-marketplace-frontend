export const clearMask = (phone: string) => {
  return phone.replace(/[\s,+]/g, '')
}

export const apllyMask = (phone: string): string =>
  phone.replace(/^(\d{1}|.{2})(\d{3})(\d{3})(\d{2})(\d{2})$/g, '$1 $2 $3 $4 $5')
