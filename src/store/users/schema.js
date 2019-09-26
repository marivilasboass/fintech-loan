import { schema } from 'normalizr'
import moment from 'moment'

const processStrategy = (user) => ({
  ...user,
  age: user.age ? user.age : moment().diff(user.birthDate, 'years'),
  firstName: user.nickname.split(' ')[0]
})

export const userSchema = new schema.Entity('user', {},
  { processStrategy, idAttribute: '_id' })

export const usersSchema = [ userSchema ]
