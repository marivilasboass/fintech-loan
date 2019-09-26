import { isValid as isValidCpf } from '@fnando/cpf/dist/node'
import { isEmail } from 'validator'

import { isPhone } from '~/services/validators'

export const emailValidator = email => email.length > 0 && !isEmail(email) ? 'E-mail inválido' : null
export const CPFValidator = username => username.length > 0 && !isValidCpf(username) ? 'CPF inválido' : null
export const phoneValidator = phone => phone.length > 0 && !isPhone(phone) ? 'Telefone Inválido' : null
export const nicknameValidator = nickname => !nickname || !(nickname.length > 0) ? 'Favor preencher seu nome' : null

export const dataValidator = ({ username, email, phone, userType, nickname }) =>
  isValidCpf(username) && isEmail(email) && isPhone(phone) && nicknameValidator(nickname) === null && userType !== null
