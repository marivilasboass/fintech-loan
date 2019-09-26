import * as R from 'ramda'

export const resolvedStatuses = ['approved', 'analysis', 'loading', 'solved']

export const isResolvedStatus = (status) => resolvedStatuses.includes(status)

export const getIdentificationStatus = (pendencies) => {
  return getMostImportantPendencyStatus(
    [['idDocuments', 'front'], ['idDocuments', 'back'], ['selfie']],
    pendencies
  )
}

export const getAddressStatus = (pendencies) => {
  return getMostImportantPendencyStatus(
    [['address'], ['addressProof']],
    pendencies
  )
}

export const getGeneralStatus = (pendencies) => {
  return getMostImportantPendencyStatus(
    [['idDocuments', 'front'], ['idDocuments', 'back'], ['selfie'], ['personalInformation'], ['bank'], ['address'], ['addressProof']],
    pendencies
  )
}

export const getResolvedReport = (pendencies) => {
  const identificationStatus = getIdentificationStatus(pendencies)
  const addressStatus = getAddressStatus(pendencies)

  const simplifiedStatuses = [
    identificationStatus,
    addressStatus,
    pendencies.personalInformation.status,
    pendencies.bank.status
  ]

  const total = simplifiedStatuses.length
  const resolved = simplifiedStatuses.filter(status => resolvedStatuses.includes(status)).length

  return { resolved, total }
}

// Gets the most important pendency in a list of pendencies (move to `~/services` if it is used somewhere else)
export const getMostImportantPendencyStatus = (pendencyPaths, pendencies) => {
  const pendencyStatuses = getPendenciesStatus(pendencyPaths, pendencies)

  const priorities = getPrioritiesFromStatuses(pendencyStatuses)

  const sortedPriorities = R.sort(R.ascend(R.identity), priorities)

  const highestPriority = sortedPriorities[0]

  const mostImportantPendencyStatus = Object.keys(pendencyToPriorityMap)[highestPriority]

  return mostImportantPendencyStatus
}

const getPendenciesStatus = (pendencyPaths, pendencies) => {
  const statuses = pendencyPaths.map(pendencyPath => R.path([...pendencyPath, 'status'], pendencies))

  return statuses
}

const getPrioritiesFromStatuses = (pendencyStatuses) => {
  const pendenciesWithPriority = pendencyStatuses.map(pendencyStatus => pendencyToPriorityMap[pendencyStatus])

  return pendenciesWithPriority
}

const pendencyToPriorityMap = {
  rejected: 0,
  pending: 1,
  loading: 2,
  analysis: 3,
  approved: 4,
  solved: 5
}
