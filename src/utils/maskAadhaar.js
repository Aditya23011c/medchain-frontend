/** Always show only the last 4 digits. */
export function maskAadhaar(value = '') {
  const digits = String(value).replace(/\D/g, '');
  return digits.length >= 4 ? `XXXX XXXX ${digits.slice(-4)}` : 'XXXX XXXX XXXX';
}
/** Format typed input as "1234 5678 9012" (max 12 digits). */
export function formatAadhaarInput(value = '') {
  return value.replace(/\D/g, '').slice(0, 12).replace(/(\d{4})(?=\d)/g, '$1 ');
}
