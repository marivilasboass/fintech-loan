import { schema } from 'normalizr'

import { userSchema } from '../users/schema'

export const loanSchema = new schema.Entity('loan', {
  borrower: userSchema,
  investor: userSchema
},
{
  idAttribute: '_id'
})

export const loansSchema = [ loanSchema ]
