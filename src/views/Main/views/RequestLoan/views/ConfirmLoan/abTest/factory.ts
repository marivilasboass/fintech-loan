import { ComponentClass } from 'react'

import { Props } from '../ConfirmLoanContainer'
import { ConfirmLoanA, ConfirmLoanB, ConfirmLoanC, ConfirmLoanD } from './Views'

export default (flag):ComponentClass<Partial<Props>> => {
  switch (flag) {
  case 'B': return ConfirmLoanB
  case 'C': return ConfirmLoanC
  case 'D': return ConfirmLoanD
  case 'A':
  default: return ConfirmLoanA
  }
}
