import { Colors } from '~/newUI'
import { getPaymentStatusInfo } from './loanStatuses'

const colors = {
  yellow: ['#fbbc00', Colors.orange],
  red: ['#f05836', Colors.cinnabar],
  gray: ['#bdbdbd', '#919191'],
  green: ['#1cda7a', Colors.darkPastelGreen]
}

export const getStatus = (investment) => {
  const investmentEffectStatus = getEffectStatus(investment.effectStatus)
  if (investmentEffectStatus) {
    return investmentEffectStatus
  }

  return getPaymentStatus(investment.paymentStatus)
}

const getPaymentStatus = (paymentStatus) => {
  if (paymentStatus === 'returned' || paymentStatus === 'partiallyReturned') {
    return {
      title: 'Seu investimento foi estornado',
      color: colors.green
    }
  }
  if (paymentStatus === 'paid' || paymentStatus === 'liquidated') {
    return {
      title: 'Seu investimento está quitado',
      color: colors.green
    }
  }
  if (paymentStatus === 'legalCollection') {
    return {
      title: 'Em cobrança extrajudicial',
      color: colors.red
    }
  }
  if (paymentStatus === 'late') {
    return {
      title: 'Seu investimento está em atraso',
      color: colors.red
    }
  }
  return {
    title: 'Seu investimento está em dia',
    color: colors.green
  }
}

const getEffectStatus = (effectStatus) => {
  if (
    effectStatus === 'requestToCreateProposal' || effectStatus === 'sentToCreateProposal' ||
    effectStatus === 'waitingTransfer' || effectStatus === 'moneyTransferedToDefault'
  ) {
    return {
      title: 'Em efetivação',
      subTitle: 'Seu investimento está em processo de efetivação financeira.',
      color: colors.yellow
    }
  }
  if (effectStatus === 'started') {
    return {
      title: 'Em captação',
      subTitle: 'O empréstimo está aguardando que todas as cotas sejam compradas.',
      color: colors.yellow
    }
  }
  if (effectStatus === 'cancelled' || effectStatus === 'canceled') {
    return {
      title: 'Seu investimento foi cancelado',
      subTitle: 'Por analise interna ou cotas que não foram comprados seu investimento foi cancelado.',
      color: colors.gray
    }
  }
  if (effectStatus === 'expired') {
    return {
      title: 'Seu investimento expirou',
      subTitle: 'As cotas não foram comprados a tempo por isso seu investimento expirou.',
      color: colors.gray
    }
  }
}

export const getStatusInfo = (investment) => {
  const { paymentStatus, onSpcAt, effectStatus } = investment

  if (onSpcAt) {
    return {
      name: 'Negativado',
      color: 'error'
    }
  }
  const effectStatusInfo = getEffectStatusInfo(effectStatus)

  if (effectStatusInfo) {
    return effectStatusInfo
  }

  const paymentStatusInfo = getPaymentStatusInfo(paymentStatus)

  if (paymentStatusInfo) {
    return paymentStatusInfo
  }
}

export const getEffectStatusInfo = (effectStatus) => {
  if (
    effectStatus === 'requestToCreateProposal' || effectStatus === 'sentToCreateProposal' ||
    effectStatus === 'waitingTransfer' || effectStatus === 'moneyTransferedToDefault'
  ) {
    return {
      name: 'Em análise financeira',
      color: 'pending'
    }
  }
  if (effectStatus === 'started') {
    return {
      name: 'Em captação',
      color: 'success'
    }
  }
  if (effectStatus === 'cancelled' || effectStatus === 'canceled') {
    return {
      name: 'Cancelado',
      color: 'error'
    }
  }
  if (effectStatus === 'expired') {
    return {
      name: 'Expirado',
      color: 'error'
    }
  }
}
