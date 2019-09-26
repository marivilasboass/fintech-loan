export const bankCode = '033'

export const branchNumberLength = 4
export const hasBranchDigit = false

export const accountNumberLength = 8
export const hasAccountDigit = true

export const getBranchDigit = (branchNumber) => {
  if (branchNumber.length !== branchNumberLength) {
    throw new Error(`santander branch number length must be ${branchNumberLength}`)
  }

  throw new Error("santander doesn't have branch digit")
}

export const getAccountDigit = (accountNumber, branchNumber) => {
  if (accountNumber.length !== accountNumberLength) {
    throw new Error(`santander agency number length must be ${accountNumberLength}`)
  }

  if (!branchNumber) {
    throw new Error('santander account dv need branch number to calculate')
  }

  const verificators = '97310097131973'

  const allDigits = branchNumber + '00' + accountNumber

  let weight = 0
  for (let i = 0; i < allDigits.length; i++) {
    weight += parseInt(String(parseInt(allDigits[i]) * parseInt(verificators[i])).slice(-1))
  }

  if (parseInt(String(weight).slice(-1)) === 0) { return 0 }

  return 10 - parseInt(String(weight).slice(-1))
}
