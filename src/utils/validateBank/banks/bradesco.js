export const bankCode = '237'

export const branchNumberLength = 4
export const hasBranchDigit = true

export const accountNumberLength = 7
export const hasAccountDigit = true

export const getBranchDigit = (branchNumber) => {
  if (branchNumber.length !== branchNumberLength) {
    throw new Error(`bradesco branch number length must be ${branchNumberLength}`)
  }

  let weight = 0
  let j = 0
  for (let i = branchNumber.length + 1; i > 1; i--) {
    weight += branchNumber[j] * i
    j++
  }

  const dv = 11 - (weight % 11)

  if (dv === 11 || dv === 10) {
    return 0
  }

  return dv
}

export const getAccountDigit = (accountNumber) => {
  if (accountNumber.length !== accountNumberLength) {
    throw new Error(`bradesco agency number length must be ${accountNumberLength}`)
  }

  const verificators = '2765432'

  let weight = 0
  for (let i = 0; i < accountNumber.length; i++) {
    weight += parseInt(accountNumber[i]) * parseInt(verificators[i])
  }

  const rest = weight % 11
  if (rest === 0 || rest === 1) {
    return 0
  } else {
    return 11 - rest
  }
}
