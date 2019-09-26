import numeral from 'numeral'
import { currencyFormat, bankSlipFormat, minutesFormat } from './formats/'

export default function format (type, value) {
  const parsedValue = parseFloat(value, 10)
  switch (type) {
  case 'cpf':
    return numeral(value).format('000.000.000-00')
  case 'newCurrency':
    return currencyFormat(value)
  case 'currency':
    return numeral(parsedValue).format('$ 0,0.00')
  case 'currencyRounded':
    return numeral(parsedValue).format('$ 0,0')
  case 'number':
    return numeral(parsedValue).format('0,0.00')
  case 'percentage':
    return numeral(parsedValue).format('0.00%')
  case 'percentageRounded':
    return numeral(parsedValue).format('0%')
  case 'bankSlip':
    return bankSlipFormat(value)
  case 'minutes':
    return minutesFormat(value)
  default:
    return value
  }
}
