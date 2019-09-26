export const bankCode = '001'

export const branchNumberLength = 4
export const hasBranchDigit = true

export const accountNumberLength = 8
export const hasAccountDigit = true

export const getBranchDigit = (branchNumber) => {
  if (branchNumber.length !== branchNumberLength) {
    throw new Error('bancoBrasil branch number length must be 4')
  }

  let weight = 0
  let j = 0
  for (let i = branchNumber.length + 1; i > 1; i--) {
    weight += branchNumber[j] * i
    j++
  }

  const dv = 11 - (weight % 11)

  if (dv === 11) { return 0 } else if (dv === 10) { return 'X' }
  return dv
}

export const getAccountDigit = (accountNumber) => {
  if (accountNumber.length !== 8) {
    throw new Error('bancoBrasil agency number length must be 8')
  }

  let weight = 0
  let j = 0
  for (let i = accountNumber.length + 1; i > 1; i--) {
    weight += accountNumber[j] * i
    j++
  }

  const dv = 11 - (weight % 11)

  if (dv === 11) { return 0 } else if (dv === 10) { return 'X' }
  return dv
}
