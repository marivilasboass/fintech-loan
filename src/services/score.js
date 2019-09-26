export const fullRiskScale = {
  'A+': { pd: 0.0312, risk: 'baixo' },
  A: { pd: 0.0668, risk: 'baixo' },
  'A-': { pd: 0.0831, risk: 'baixo' },
  'B+': { pd: 0.0834, risk: 'baixo' },
  B: { pd: 0.1218, risk: 'baixo' },
  'B-': { pd: 0.1506, risk: 'baixo' },
  'C+': { pd: 0.1513, risk: 'médio' },
  C: { pd: 0.2053, risk: 'médio' },
  'C-': { pd: 0.2625, risk: 'médio' },
  'D+': { pd: 0.2635, risk: 'médio' },
  D: { pd: 0.3053, risk: 'médio' },
  'D-': { pd: 0.3597, risk: 'médio' },
  'E+': { pd: 0.3609, risk: 'alto' },
  E: { pd: 0.3903, risk: 'alto' },
  'E-': { pd: 0.4315, risk: 'alto' },
  F: { pd: 0.4327, risk: 'alto' },
  'F-': { pd: 0.761, risk: 'alto' }
}

export const getChanceText = (scoreFull) => {
  if (!fullRiskScale[scoreFull]) {
    return ''
  }

  const { pd } = fullRiskScale[scoreFull]

  const per1000 = Math.round(pd * 1000)

  return `${per1000} pessoas a cada 1.000 não pagarão`
}

export const getRiskText = (scoreFull) => {
  if (!fullRiskScale[scoreFull]) {
    return `não definido`
  }

  const { risk } = fullRiskScale[scoreFull]

  return `${risk} risco`
}

export const getScoreLetter = scoreFull => scoreFull ? scoreFull.charAt(0) : '?'
