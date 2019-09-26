import numeral from 'numeral'

export const parse = (type, value) => {
  switch (type) {
  case 'CPF':
    return value.replace(/[./-]/g, '')
  case 'currency':
    return numeral(value).value()
  default:
    return value
  }
}
