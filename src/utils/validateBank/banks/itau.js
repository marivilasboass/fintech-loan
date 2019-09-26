export const bankCode = '341'

export const branchNumberLength = 4
export const hasBranchDigit = false

export const accountNumberLength = 5
export const hasAccountDigit = true

export const getBranchDigit = (branchNumber) => {
  if (branchNumber.length !== branchNumberLength) {
    throw new Error(`itau branch number length must be ${branchNumberLength}`)
  }

  throw new Error("itau doesn't have branch digit")
}

export const getAccountDigit = (accountNumber, agencyNumber) => {
  if (accountNumber.length !== 5) {
    throw new Error(`itau account number length must be ${accountNumberLength}`)
  }

  const allDigits = agencyNumber + '' + accountNumber

  const verificators = '212121212'

  let weight = 0
  for (let i = 0; i < allDigits.length; i++) {
    const sum = parseInt(allDigits[i]) * parseInt(verificators[i])

    if (sum > 9) { weight += parseInt(String(sum)[0]) + parseInt(String(sum)[1]) } else { weight += sum }
  }

  const rest = weight % 10

  if (rest === 0) { return rest }

  return 10 - rest
}
