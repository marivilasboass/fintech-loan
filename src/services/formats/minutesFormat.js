const fillValue = (str) => str.length === 1 ? `0${str}` : str

export default (value) => {
  const minutes = String(Math.floor(value / 60))
  const seconds = String(value % 60)
  return `${fillValue(minutes)}:${fillValue(seconds)}`
}
