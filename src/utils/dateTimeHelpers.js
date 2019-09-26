import moment from 'moment-timezone'

const dateFormat = 'DD/MM/YYYY'
const timeFormat = 'HH:mm:ss'

const BRAZIL_TIMEZONE = 'America/Sao_Paulo'

export const formatInBrazil = (date, format) => {
  return moment.tz(date, BRAZIL_TIMEZONE).format(format)
}

export const formatDatetime = date => {
  if (!date) {
    return '-'
  }

  return `${formatDate(date)} às ${formatTime(date)}`
}

export const formatDate = date => {
  if (!date) {
    return '-'
  }
  return formatInBrazil(date, dateFormat)
}

export const formatTime = date => {
  if (!date) {
    return '-'
  }
  return formatInBrazil(date, timeFormat)
}
