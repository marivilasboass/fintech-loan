export const bankCode = '041'

export const branchNumberLength = 4
export const hasBranchDigit = false

export const accountNumberLength = 9
export const hasAccountDigit = true

export const getAccountDigit = (accountNumber) => {
  if (accountNumber.length !== accountNumberLength) {
    throw new Error(`banrisul agency number length must be ${accountNumberLength}`)
  }

  const numbers = accountNumber.split('')
  let sumSeq = 0

  for (var i = 0; i < numbers.length; i++) {
    var number = parseInt(numbers[i])
    sumSeq += multiplyAccordingWeight(number, i)
  }

  return moduleEleven(sumSeq)
}

const multiplyAccordingWeight = (number, index) => {
  var weight = [3, 2, 4, 7, 6, 5, 4, 3, 2]
  return number * weight[index]
}

const moduleEleven = (sumSeq) => {
  var module = sumSeq % 11
  if (module === 0) {
    return 0
  } else if (module === 1) {
    return 6
  }
  return 11 - module
}
