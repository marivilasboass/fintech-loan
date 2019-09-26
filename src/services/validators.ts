import {
  isValidNumber as isValidNumberCustom
} from 'libphonenumber-js/custom'

import metadata from '../../metadata.mobile.json'

export const isValidNumber = (phone:string, country:string) => 
  isValidNumberCustom(phone, country, metadata)

const validDdds = [
  '11', '12', '13', '14', '15', '16', '17', '18', '19',
  '21', '22', '24', '27', '28',
  '31', '32', '33', '34', '35', '37', '38',
  '41', '42', '43', '44', '45', '46', '47', '48', '49',
  '51', '53', '54', '55',
  '63', '61', '62', '64', '65', '66', '67', '68', '69',
  '71', '73', '74', '75', '77', '79',
  '81', '87', '82', '83', '84', '85', '88', '89', '86',
  '91', '93', '94', '92', '96', '95', '97', '98', '99'
]

export const isPhone = (phone: string): boolean => {
  const isValid = isValidNumber(phone, 'BR')
  const phoneDdd = phone.substring(1, 3)
  return isValid && validDdds.includes(phoneDdd)
}
