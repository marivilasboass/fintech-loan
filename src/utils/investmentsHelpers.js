export const isFinished = ({ effectStatus }) => effectStatus === 'finished'

const isLiquidated = paymentStatus => paymentStatus === 'liquidated' || paymentStatus === 'paid'

const isReturned = paymentStatus => paymentStatus === 'returned' || paymentStatus === 'partiallyReturned'

export const isInAnalysis = ({ analysisStatus }) =>
  analysisStatus === 'internal' || analysisStatus === 'harpia' || analysisStatus === 'financial'

export const hasInstallmentsToPay = ({ paymentStatus }, installments) => {
  if (isLiquidated(paymentStatus)) {
    return false
  }

  if (isReturned(paymentStatus)) {
    return false
  }

  if (installments.length === 0) {
    return false
  }

  return true
}
