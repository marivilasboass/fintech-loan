const mask = {
  5: '.',
  11: ' ',
  17: '.',
  24: ' ',
  30: '.',
  37: ' ',
  39: ' '
}

export default (value) => {
  const barCode = value.split('')
  Object.keys(mask).map(position => {
    barCode.splice(position, 0, mask[position])
  })
  return barCode.join('')
}
