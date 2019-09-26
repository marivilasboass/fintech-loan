import moment from 'moment'

export default (date) => {
  const minute = 1
  const hour = minute * 60
  const day = hour * 24
  const diff = moment().diff(date, 'minutes')

  if (diff < minute) {
    return 'agora'
  }

  if (diff < hour) {
    const m = moment().diff(date, 'minutes')
    return `há ${m}m`
  }

  if (diff < day) {
    const h = moment().diff(date, 'hours')
    return `há ${h}h`
  }

  if (diff < day * 7) {
    const d = moment().diff(date, 'days')
    return `há ${d}d`
  }

  return moment(date).format('DD/MM/YY')
}
