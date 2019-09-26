import { validateBank } from '../validateBank'

const code = '104'
const operation = '001'

describe('validateBank caixaEconomica', () => {
  it('should validate a correct account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1611',
      accountNumber: '00026107',
      operation,
      accountDigit: '9'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should pad a correct account without zeros', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1611',
      operation,
      accountNumber: '26107',
      accountDigit: '9'
    })

    expect(validationResult.valid).toEqual(true)
    expect(validationResult.paddedAccountNumber).toEqual('00026107')
  })

  it('should reject an invalid operation length', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1611',
      operation: '11',
      accountNumber: '1234',
      accountDigit: '9'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_OPERATION_LENGTH',
        expected: 3
      }
    })
  })

  it('should reject an incorrect account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1611',
      operation,
      accountNumber: '1234',
      accountDigit: '9'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_ACCOUNT_DIGIT',
        expected: '6'
      }
    })
  })

  it('should reject a branch with incorrect length', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '07333',
      accountNumber: '00345',
      accountDigit: '3'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_BRANCH_NUMBER_LENGTH',
        expected: 4
      }
    })
  })

  it('should reject an account with invalid digit', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1611',
      operation,
      accountNumber: `00026107`,
      accountDigit: '0'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_ACCOUNT_DIGIT',
        expected: '9'
      }
    })
  })
})
