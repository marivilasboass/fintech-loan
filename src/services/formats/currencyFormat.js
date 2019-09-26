const reverseValue = (value) => String(value).split('').reverse()

const backToNormal = (array) => array.reverse().join('')

export default (value) => {
  let strValue = ''
  if (typeof value === 'number') {
    strValue = value.toFixed(2)
  }
  strValue = String(strValue || value).replace(/[^0-9]/g, '')
  while (strValue[0] === '0') {
    strValue = strValue.substr(1)
  }

  if (!strValue) return `0,00`

  if (strValue.length <= 3) {
    const reversedValue = reverseValue(strValue)

    while (reversedValue.length < 3) {
      reversedValue.push('0')
    }

    reversedValue.splice(2, 0, ',')
    strValue = backToNormal(reversedValue)
    return strValue
  }

  if (strValue.length > 3) {
    const reversedValue = reverseValue(strValue)
    reversedValue.splice(2, 0, ',')
    const decimals = reversedValue.splice(0, 3)
    let count = 0

    const numbers = reversedValue.reduce((accu, curr) => {
      count++
      accu.push(curr)
      if (count % 3 === 0 && count !== reversedValue.length) {
        accu.push('.')
      }
      return accu
    }, [])

    return backToNormal(numbers) + backToNormal(decimals)
  }
}
