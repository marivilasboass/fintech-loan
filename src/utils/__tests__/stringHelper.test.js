import { capitalize, fullNameAbbreviation } from '../stringHelper'

describe('stringHelper', () => {
  it('capitalize', () => {
    const str = 'massachusetts'
    expect(capitalize(str)).toEqual('Massachusetts')
  })
  it('fullNameAbbreviation with spaces', () => {
    const str = 'Name     Secondname'
    expect(fullNameAbbreviation(str)).toEqual('Name S.')
  })
  it('fullNameAbbreviation without spaces', () => {
    const str = 'Name'
    expect(fullNameAbbreviation(str)).toEqual('Name')
  })
})
