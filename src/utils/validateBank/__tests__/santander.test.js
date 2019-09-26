import { validateBank } from '../validateBank'

const code = '033'

describe('validateBank santander', () => {
  it('should validate a correct account', () => {
    const validationResult = validateBank({
      code,
      branchNumber: '3348',
      accountNumber: '01003543',
      accountDigit: '0'
    })

    expect(validationResult.valid).toEqual(true)
  })
})
