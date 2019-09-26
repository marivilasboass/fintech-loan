export const bankCode = '104'
export const branchNumberLength = 4
export const hasBranchDigit = false

export const operationLength = 3
export const hasOperation = true

export const accountNumberLength = 8
export const hasAccountDigit = true

export const getBranchDigit = (branchNumber) => {
  if (branchNumber.length !== branchNumberLength) {
    throw new Error(`caixa economica branch number length must be ${branchNumberLength}`)
  }

  throw new Error("caixa economica doesn't have branch digit")
}

export const getAccountDigit = (accountNumber, agencyNumber, operation) => {
  if (accountNumber.length !== accountNumberLength) {
    throw new Error(`caixa economica account number length must be ${accountNumberLength}`)
  }

  if (operation.length !== operationLength) {
    throw new Error(`caixa economica account operation length must be ${operationLength}`)
  }

  if (!agencyNumber) {
    throw new Error('caixa economica account dv need agency number to calculate')
  }

  const verificators = '876543298765432'

  const allDigits = `${agencyNumber}${operation}${accountNumber}`

  let weight = 0
  for (let i = 0; i < allDigits.length; i++) {
    weight += parseInt(allDigits[i]) * parseInt(verificators[i])
  }

  weight = weight * 10

  const rest = weight - ((parseInt(weight / 11)) * 11)
  if (rest > 9) { return 0 }

  return rest
}
