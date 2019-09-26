export const getRequestLoanState = (state) => state.requestLoan

export const getNumberOfInstallments = (state) => getRequestLoanState(state).numberOfInstallments

export const getBestPayDay = (state) => getRequestLoanState(state).bestPayDay

export const getRequestedAmountCents = (state) => getRequestLoanState(state).requestedAmountCents

export const getInitialRequestedAmountCents = (state) => getRequestLoanState(state).initialRequestedAmountCents

export const getCountdown = (state) => getRequestLoanState(state).countdown

export const getRefreshCount = (state) => getRequestLoanState(state).refreshCount

export const getTotalToInvestmentCents = (state) => getRequestLoanState(state).totalToInvestmentCents

export const getLoan = (state) => getRequestLoanState(state).loan

export const getLoading = (state) => getRequestLoanState(state).loading

export const getOptionsOfLoan = (state) => getRequestLoanState(state).optionsOfLoan

export const getMotive = (state) => getRequestLoanState(state).motive

export const getSimulationResults = (state) => {
  const { simulationResults } = getRequestLoanState(state)
  const simulationsKeys = Object.keys(simulationResults)
  if (!simulationsKeys.length) return {}
  return simulationsKeys.reduce((acc, cur) => {
    let value = simulationResults[cur]
    if (cur.match(/cents/gi)) {
      value = value / 100
    }
    return {
      ...acc,
      [cur]: value
    }
  }, {})
}

export const getCreditReport = (state) => getRequestLoanState(state).creditReport

export const getInterestRate = (state) => getCreditReport(state).interestRate

export const isRefused = (state) => {
  const creditReport = getCreditReport(state)
  if (!creditReport) {
    return true
  }

  return (!Array.isArray(creditReport.loanRequestOptions) || creditReport.loanRequestOptions.length === 0 || creditReport.score === 'F')
}

export const hasFirstOptionApproved = (state) => {
  const creditReport = getCreditReport(state)
  if (!creditReport) {
    return false
  }

  const numberOfInstallments = getNumberOfInstallments(state)
  const requestedAmountCents = getRequestedAmountCents(state)

  const chosenLoanRequestOption = creditReport.loanRequestOptions.find(loanRequestOption => loanRequestOption.numberOfInstallments === numberOfInstallments)
  if (!chosenLoanRequestOption) {
    return false
  }

  return (requestedAmountCents <= chosenLoanRequestOption.requestAmountCents)
}
