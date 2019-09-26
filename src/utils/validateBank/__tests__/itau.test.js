import { validateBank } from '../validateBank'

const code = '341'

describe('validateBank itau', () => {
  it('should validate a correct account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0733',
      accountNumber: '00345',
      accountDigit: '3'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should pad a correct account without zeros', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0733',
      accountNumber: '345',
      accountDigit: '3'
    })

    expect(validationResult.valid).toEqual(true)
    expect(validationResult.paddedAccountNumber).toEqual('00345')
  })

  it('should reject an incorrect account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0733',
      accountNumber: '1234',
      accountDigit: '3'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_ACCOUNT_DIGIT',
        expected: '8'
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
      branchNumber: '0733',
      accountNumber: '00345',
      accountDigit: '9'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_ACCOUNT_DIGIT',
        expected: '3'
      }
    })
  })
})
