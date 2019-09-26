import { schema } from 'normalizr'

export const noticeSchema = new schema.Entity('notice', {}, {
  idAttribute: '_id'
})

export const noticesSchema = [ noticeSchema ]
