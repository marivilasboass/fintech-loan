export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1)

export const fullNameAbbreviation = (fullName) => {
  if (!fullName) {
    return fullName
  }
  const name = fullName.trim()
  const nameWithoutExcessiveSpaces = name.replace(/\s{2,}/g, ' ')
  const names = nameWithoutExcessiveSpaces.split(' ')
  if (names.length > 1) {
    const secondNameFirstLetter = names[1].charAt(0)
    const abbreviation = `${names[0]} ${secondNameFirstLetter}.`
    return abbreviation
  }
  return fullName
}

export const toTheHouseOfTen = (number) => {
  if (number > 9) {
    return number
  }
  return `0${number}`
}

export const getFirstAndLastName = (fullName) => {
  const names = fullName.split(' ')
  const firstName = names[0]
  const lastName = names[names.length - 1]
  return `${firstName} ${lastName}`
}
