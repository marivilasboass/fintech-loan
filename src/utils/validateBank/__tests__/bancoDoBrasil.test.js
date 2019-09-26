import { validateBank } from '../validateBank'

const code = '001'

describe('validateBank bancoDoBrasil', () => {
  it('should validate a correct account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1584',
      branchDigit: '9',
      accountNumber: '00210169',
      accountDigit: '6'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should pad a correct account without zeros', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1584',
      branchDigit: '9',
      accountNumber: '210169',
      accountDigit: '6'
    })

    expect(validationResult.valid).toEqual(true)
    expect(validationResult.paddedAccountNumber).toEqual('00210169')
  })

  it('should reject an incorrect account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1584',
      branchDigit: '9',
      accountNumber: '123456',
      accountDigit: '6'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_ACCOUNT_DIGIT',
        expected: '0'
      }
    })
  })

  it('should reject a branch with incorrect length', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '15841',
      branchDigit: '9',
      accountNumber: '00210169',
      accountDigit: '6'
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
      branchNumber: '1584',
      branchDigit: '9',
      accountNumber: '00210169',
      accountDigit: '1'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_ACCOUNT_DIGIT',
        expected: '6'
      }
    })
  })

  it('should reject a branch with invalid digit', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1584',
      branchDigit: '2',
      accountNumber: '00210169',
      accountDigit: '6'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_BRANCH_DIGIT',
        expected: '9'
      }
    })
  })
})
