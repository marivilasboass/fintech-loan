import { schema } from 'normalizr'

export const transactionSchema = new schema.Entity('transaction', {}, {
  idAttribute: '_id'
})

export const transactionsSchema = [ transactionSchema ]
