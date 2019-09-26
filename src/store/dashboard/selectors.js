import moment from 'moment'
import format from '~/services/format'
import descriptionTexts from '~/constants/dashboardDescriptions'
import R from 'ramda'

export const getDashboard = (state) => state.dashboard

export const getDashboardActiveConfig = (state) => getDashboard(state).dashboardActiveConfig

export const getStatusActiveConfig = (state) => getDashboard(state).statusActiveConfig

export const getTotalEffected = (state) => getDashboard(state).totalEffected

export const getTotalPending = (state) => getDashboard(state).totalPending

export const getTotalPlanned = (state) => getDashboard(state).totalPlanned

export const getTotalReceived = (state) => getDashboard(state).totalReceived

export const getTotalReceivedOnCurrentMonth = (state) => getDashboard(state).totalReceivedOnCurrentMonth

export const getInstallmentsReceived = (state) => getDashboard(state).installmentsReceived

export const getTotalRecovered = (state) => getDashboard(state).totalRecovered

export const getTotalDefaulters = (state) => getDashboard(state).totalDefaulters

export const getTotalLoansApprovedPerScore = (state) => getDashboard(state).totalLoansApprovedPerScore

export const getLineGraphicValues = (state) => getDashboard(state).lineGraphicValues

export const getTotalReturned = (state) => getDashboard(state).totalReturned

export const getLateLoans = (state) => getDashboard(state).lateLoans

export const getLoading = (state) => getDashboard(state).loading

export const getError = (state) => getDashboard(state).error

const formatCurrency = (currencies) => {
  if (!Array.isArray(currencies)) return format('newCurrency', currencies / 100)
  return currencies.map(currency => {
    return format('newCurrency', currency / 100)
  })
}

const formatPercentage = (percentages) => {
  if (!Array.isArray(percentages)) return Math.round(percentages * 100)
  return percentages.map(percentage => {
    return Math.round(percentage * 100)
  })
}

export const getTopAreaInfo = (state) => {
  const investimentsInfo = getTotalEffected(state)
  const pendingInfo = getTotalPending(state)

  const [investimentsValue, pendingValue] = formatCurrency([investimentsInfo.totalFinancedAmountCents,
    pendingInfo.totalFinancedAmountCents])

  const investiments = { value: investimentsValue, amount: investimentsInfo.total }
  const pending = { value: pendingValue, amount: pendingInfo.total }

  return { investiments, pending }
}

export const getInfoChartAreaValues = (state) => {
  const { totalCents, totalWithDefaultRateCents } = getTotalPlanned(state)
  const { totalCents: totalCentsReceived, totalToReceivedWithLateFinesCents, normalPercentCompared, withDefaultRatePercentCompared,
    plannedToReceivedNormalPercentCompared, plannedToReceivedWithDefaultRatePercentCompared } = getTotalReceived(state)
  const { investedCents, investedPercent, interestCents, interestPercent } = getInstallmentsReceived(state)

  const [realized, plannedToReceive, primary, interest, planned, adjusted] = formatCurrency([totalCentsReceived, totalToReceivedWithLateFinesCents, investedCents,
    interestCents, totalCents, totalWithDefaultRateCents])

  const [ percentageReceived, plannedPercentageReceived, adjustedPercentageReceived,
    adjustedPlannedPercentageReceived, primaryPercentage, interestPercentage ] = formatPercentage([normalPercentCompared,
    plannedToReceivedNormalPercentCompared, withDefaultRatePercentCompared, plannedToReceivedWithDefaultRatePercentCompared,
    investedPercent, interestPercent ])

  const installmentsInfo = { primary, primaryPercentage, interest, interestPercentage }

  if (getDashboardActiveConfig(state) === 'Máximo') {
    return {
      plannedValue: planned,
      realizedValue: realized,
      plannedToReceiveValue: plannedToReceive,
      percentageReceived,
      plannedPercentageReceived,
      installmentsInfo,
      descriptions: { left: descriptionTexts.maximum, right: descriptionTexts.realized, main: descriptionTexts.main }

    }
  }
  return {
    plannedValue: adjusted,
    realizedValue: realized,
    percentageReceived: adjustedPercentageReceived,
    plannedPercentageReceived: adjustedPlannedPercentageReceived,
    installmentsInfo,
    descriptions: { left: descriptionTexts.adjusted, right: descriptionTexts.realized, main: descriptionTexts.main }
  }
}

export const getRecoveredInfo = (state) => {
  const { investmentRecoveredCents, investmentRecoveredPercent, loansRecovered } = getTotalRecovered(state)
  const recovered = formatCurrency(investmentRecoveredCents)
  const percentage = formatPercentage(investmentRecoveredPercent)
  return {
    recovered,
    percentage,
    amount: loansRecovered,
    descriptions: { recovered: descriptionTexts.recovered }
  }
}

export const getDefaultsInfo = (state) => {
  const { totalInvestmentsLateCents, lateLoansPercent, lateLoans } = getTotalDefaulters(state)
  const lateInvestments = formatCurrency(totalInvestmentsLateCents)
  const percentage = formatPercentage(lateLoansPercent)
  return { lateInvestments, percentage, amount: lateLoans }
}

export const getScoresAreaInfo = (state) => {
  const scoresInfo = getTotalLoansApprovedPerScore(state)
  const scoreList = [scoresInfo.A, scoresInfo.B, scoresInfo.C, scoresInfo.D, scoresInfo.E]
  const scoreInfo = scoreList.map(score => {
    return { ...score, totalPercent: formatPercentage(score.totalPercent) }
  })
  return scoreInfo
}

export const getReccurenceAreaInfo = (state) => {
  // LineGraphic
  const lineGraphicValues = getLineGraphicValues(state)
  const monthlyProfitData = R.reverse(lineGraphicValues).map(({ monthlyProfitPercent, referenceDate }) => ({
    x: moment(referenceDate).toDate(),
    y: formatPercentage(monthlyProfitPercent)
  }))
  const defaultMonthlyProfitData = R.reverse(lineGraphicValues).map(({ monthlyProfitPercentWithDefaultRate, referenceDate }) => ({
    x: moment(referenceDate).toDate(),
    y: formatPercentage(monthlyProfitPercentWithDefaultRate)
  }))

  const { totalReturnedPercents, totalReturnedPercentsWithDefaultRate,
    cdiComparedMonthlyProfitPercent, cdiComparedMonthlyProfitPercentWithDefaultRate } = getTotalReturned(state)
  const [ cdiMonthlyProfitPercent, cdiDefaultMonthlyProfitPercent ] = formatPercentage([cdiComparedMonthlyProfitPercent, cdiComparedMonthlyProfitPercentWithDefaultRate])
  const [ profitPercent, defaultProfitPercent ] = formatPercentage([totalReturnedPercents, totalReturnedPercentsWithDefaultRate])

  const activeConfig = getDashboardActiveConfig(state)

  if (activeConfig === 'Máximo') {
    return {
      primaryRate: activeConfig,
      secondaryRate: 'Esperado',
      primaryProfit: profitPercent,
      secondaryProfit: defaultProfitPercent,
      primaryData: monthlyProfitData,
      secondaryData: defaultMonthlyProfitData,
      cdiRate: cdiMonthlyProfitPercent,
      descriptionText: descriptionTexts.maximumReturn
    }
  }
  return {
    primaryRate: activeConfig,
    secondaryRate: 'Máximo',
    primaryProfit: defaultProfitPercent,
    secondaryProfit: profitPercent,
    primaryData: defaultMonthlyProfitData,
    secondaryData: monthlyProfitData,
    cdiRate: cdiDefaultMonthlyProfitPercent,
    descriptionText: descriptionTexts.adjustedReturn
  }
}

const getTotalValue = (loans) => {
  const { amount, value, percentage } = loans.reduce((accu, curr) => {
    return {
      amount: accu.amount + curr.total,
      value: accu.value + curr.totalCents,
      percentage: accu.percentage + curr.totalPercentsComparedWithOthers
    }
  }, {
    amount: 0,
    value: 0,
    percentage: 0
  })
  return { amount, value: formatCurrency(value), percentage: formatPercentage([percentage]) }
}

export const getStatusAreaInfo = (state) => {
  // TotalReceived
  const { totalCents: received, totalToReceivedWithLateFinesCents: plannedToReceive } = getTotalReceived(state)

  const { totalCents, totalToReceivedCents } = getTotalReceivedOnCurrentMonth(state)

  const [ totalReceived, totalPlanned,
    receivedInCurrentMonth, plannedInCurrentMonth ] = formatCurrency([received, plannedToReceive,
    totalCents, totalToReceivedCents])

  // LateLoans
  const { firstRange, secondRange, thirtyRange, lastRange } = getLateLoans(state)
  const generalLateLoans = [firstRange, secondRange, thirtyRange, lastRange]
  const monthlyLateLoans = generalLateLoans.slice(0, 2)

  let lateLoans = Object.keys(generalLateLoans).map(key => generalLateLoans[key])
  lateLoans = generalLateLoans.map(({ total, totalCents, totalPercentsComparedWithOthers }) => ({
    amount: total,
    value: formatCurrency(totalCents),
    percentage: formatPercentage(totalPercentsComparedWithOthers)
  }))

  const generalTotal = getTotalValue(generalLateLoans)
  const monthlyTotal = getTotalValue(monthlyLateLoans)

  if (getStatusActiveConfig(state) === 'General') {
    return {
      received: totalReceived,
      planned: totalPlanned,
      lateLoans: [generalTotal, ...lateLoans],
      dateRange: ['Total', '5-15 D', '16-30 D', '31-90 D', '+90 D']
    }
  }
  return {
    received: receivedInCurrentMonth,
    planned: plannedInCurrentMonth,
    lateLoans: [monthlyTotal, ...lateLoans],
    dateRange: ['Total', '5-15 D', '16-30 D']
  }
}
