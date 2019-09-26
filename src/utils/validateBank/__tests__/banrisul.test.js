import { validateBank } from '../validateBank'

const code = '041'

describe('validateBank banrisul 1', () => {
  it('should validate a correct account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1234',
      accountNumber: '358507671',
      accountDigit: '8'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should validate a correct account 2', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0979',
      accountNumber: '390194450',
      accountDigit: '4'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should reject an incorrect account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1234',
      accountNumber: '358507671',
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
      branchNumber: '01234',
      accountNumber: '358507671',
      accountDigit: '8'
    })

    expect(validationResult).toEqual({
      valid: false,
      reason: {
        code: 'INVALID_BRANCH_NUMBER_LENGTH',
        expected: 4
      }
    })
  })
})
