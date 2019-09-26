import * as bancoDoBrasil from './banks/bancoDoBrasil'
import * as santander from './banks/santander'
import * as banrisul from './banks/banrisul'
import * as caixaEconomica from './banks/caixaEconomica'
import * as inter from './banks/inter'
import * as bradesco from './banks/bradesco'
import * as itau from './banks/itau'
import padStart from 'string.prototype.padstart'

export const validateBank = ({ code, branchNumber, branchDigit, operation, accountNumber, accountDigit }) => {
  const bankCodeMap = {
    '001': bancoDoBrasil,
    '033': santander,
    '041': banrisul,
    '077': inter,
    104: caixaEconomica,
    237: bradesco,
    341: itau
  }

  const bankValidator = bankCodeMap[`${code}`]

  if (!bankValidator) {
    throw new Error(`We don't support a bank with code ${code}`)
  }

  if (`${branchNumber}`.length !== bankValidator.branchNumberLength) {
    return {
      valid: false,
      reason: {
        code: 'INVALID_BRANCH_NUMBER_LENGTH',
        expected: bankValidator.branchNumberLength
      }
    }
  }

  if (bankValidator.hasBranchDigit) {
    const expectedBranchDigit = `${bankValidator.getBranchDigit(branchNumber)}`

    if (expectedBranchDigit !== `${branchDigit}`) {
      return {
        valid: false,
        reason: {
          code: 'INVALID_BRANCH_DIGIT',
          expected: expectedBranchDigit
        }
      }
    }
  }

  const paddedAccountNumber = getPaddedAccountNumber(accountNumber, bankValidator.accountNumberLength)

  if (bankValidator.hasOperation && `${operation}`.length !== bankValidator.operationLength) {
    return {
      valid: false,
      reason: {
        code: 'INVALID_OPERATION_LENGTH',
        expected: bankValidator.operationLength
      }
    }
  }

  if (bankValidator.hasAccountDigit) {
    const expectedAccountDigit = `${bankValidator.getAccountDigit(paddedAccountNumber, branchNumber, operation)}`

    if (expectedAccountDigit !== `${accountDigit}`) {
      return {
        valid: false,
        reason: {
          code: 'INVALID_ACCOUNT_DIGIT',
          expected: expectedAccountDigit
        }
      }
    }
  }

  return { valid: true, paddedAccountNumber }
}

const getPaddedAccountNumber = (accountNumber, expectedAccountLength) => {
  const currentLength = `${accountNumber}`.length

  if (currentLength === expectedAccountLength) {
    return accountNumber
  }

  return padStart(accountNumber, expectedAccountLength, '0')
}
