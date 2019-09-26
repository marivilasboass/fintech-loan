export default isSame => (item, i, arr) => {
  const previous = arr[i - 1]
  const next = arr[i + 1]
  const sameAsPrevious = previous && isSame(item, previous)
  const sameAsNext = next && isSame(item, next)
  return { ...item, sameAsPrevious, sameAsNext }
}
