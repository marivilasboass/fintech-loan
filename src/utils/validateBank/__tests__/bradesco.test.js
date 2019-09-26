import { validateBank } from '../validateBank'

const code = '237'

describe('validateBank bradesco', () => {
  it('should validate a correct branch', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '0393',
      branchDigit: '0',
      accountNumber: '0117998',
      accountDigit: '5'
    })

    expect(validationResult.valid).toEqual(true)
  })

  it('should validate a correct account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '1463',
      branchDigit: '0',
      accountNumber: '0097613',
      accountDigit: '0'
    })

    expect(validationResult.valid).toEqual(true)
  })
})
