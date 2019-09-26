import moment from 'moment'

export const isLate = installments => installments.some(installment => isInstallmentLate(installment))

export const isInstallmentLate = ({ late, status }) => late && status !== 'paid'

export const isPaid = ({ status }) => status === 'paid'

export const isInstallmentPaidLate = ({ status, late }) => status === 'paid' && late

export const getInstallmentsToReceive = installments => installments.filter(({ status }) => status !== 'paid')

export const getFirstInstallmentToReceive = installments => getInstallmentsToReceive(installments)[0]

export const isCurrent = dueDate => moment().isSame(dueDate, 'year') && moment().isSame(dueDate, 'month')

export const getCurrent = installments => installments.find(({ dueDate }) => isCurrent(dueDate))

export const getAmountToReceiveCents = installments =>
  installments.reduce((acc, { status, amountCents }) => {
    if (status === 'unpaid') {
      return acc + amountCents
    }
    return acc
  }, 0)
