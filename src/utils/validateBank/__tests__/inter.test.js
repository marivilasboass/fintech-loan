import { validateBank } from '../validateBank'

const code = '077'

describe('validateBank inter', () => {
  it('should validate a correct account 1', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0001',
      accountNumber: '000941605',
      accountDigit: '6'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should validate a correct account 2', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0001',
      accountNumber: '000832725',
      accountDigit: '4'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should validate a correct account 3', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0001',
      accountNumber: '001330616',
      accountDigit: '2'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should validate a correct account 4', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0001',
      accountNumber: '000721596',
      accountDigit: '7'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should reject an incorrect account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0001',
      accountNumber: '00941605',
      accountDigit: '3'
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
      branchNumber: '01234',
      accountNumber: '941605',
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
})
