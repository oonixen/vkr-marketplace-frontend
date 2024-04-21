export function checkValidPhone(phone: string): boolean {
  return /^7(\d){10}$/.test(phone)
}
