export function capitalize(str: string) {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

export function hexToASCII(hexString: string) {
  const hex = hexString.replace('0x', '')

  let ascii = ''
  for (let i = 0; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16))
  }

  return ascii
}

export function asciiToHex(asciiString: string) {
  let hex = ''
  for (let i = 0; i < asciiString.length; i++) {
    hex += asciiString.charCodeAt(i).toString(16).padStart(2, '0')
  }
  return '0x' + hex
}
