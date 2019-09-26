export const getStatusInfo = (loan) => {
  const { marketplaceStatus, paymentStatus, analysisStatus, onSpcAt } = loan

  if (onSpcAt) {
    return {
      name: 'Negativado',
      color: 'error'
    }
  }

  const marketplaceStatusInfo = getMarketplaceStatusInfo(marketplaceStatus)
  if (marketplaceStatusInfo) {
    return marketplaceStatusInfo
  }

  const analysisStatusInfo = getAnalysisStatusInfo(analysisStatus)

  if (analysisStatusInfo) {
    return analysisStatusInfo
  }

  const paymentStatusInfo = getPaymentStatusInfo(paymentStatus)

  if (paymentStatusInfo) {
    return paymentStatusInfo
  }
}

const getMarketplaceStatusInfo = marketplaceStatus => {
  if (marketplaceStatus === 'requested') {
    return {
      name: 'Em simulação',
      color: 'pending'
    }
  }

  if (marketplaceStatus === 'pending') {
    return {
      name: 'Pendente envio de documentos',
      color: 'pending'
    }
  }

  if (marketplaceStatus === 'rejected') {
    return {
      name: 'Pedido rejeitado',
      color: 'error'
    }
  }

  if (marketplaceStatus === 'published') {
    return {
      name: 'Aguardando interessado',
      color: 'success'
    }
  }

  if (marketplaceStatus === 'canceled') {
    return {
      name: 'Pedido cancelado',
      color: 'disabled'
    }
  }

  if (marketplaceStatus === 'expired') {
    return {
      name: 'Pedido expirado',
      color: 'disabled'
    }
  }

  if (marketplaceStatus !== 'invested') {
    return {
      name: 'Erro ao buscar situação',
      color: 'error'
    }
  }

  return false
}

const getAnalysisStatusInfo = analysisStatus => {
  if (analysisStatus === 'internal') {
    return {
      name: 'Em análise interna',
      color: 'pending'
    }
  }

  if (analysisStatus === 'harpia') {
    return {
      name: 'Em análise documental',
      color: 'pending'
    }
  }

  if (analysisStatus === 'financial') {
    return {
      name: 'Em análise financeira',
      color: 'pending'
    }
  }

  if (analysisStatus === 'rejected') {
    return {
      name: 'Pedido rejeitado',
      color: 'error'
    }
  }

  if (analysisStatus !== 'approved') {
    return {
      name: 'Erro ao buscar situação',
      color: 'error'
    }
  }

  return false
}

export const getPaymentStatusInfo = paymentStatus => {
  if (paymentStatus === 'regular') {
    return {
      name: 'Pagamento em dia',
      color: 'success'
    }
  }

  if (paymentStatus === 'late') {
    return {
      name: 'Pagamento em atraso',
      color: 'error'
    }
  }

  if (paymentStatus === 'lateOverThirtyDays') {
    return {
      name: 'Mais de 30 dias de atraso',
      color: 'error'
    }
  }

  if (paymentStatus === 'legalCollection') {
    return {
      name: 'Em cobrança extrajudicial',
      color: 'error'
    }
  }

  if (paymentStatus === 'paid' || paymentStatus === 'liquidated') {
    return {
      name: 'Quitado',
      color: 'success'
    }
  }

  if (paymentStatus === 'returned' || paymentStatus === 'partiallyReturned') {
    return {
      name: 'Estornado',
      color: 'disabled'
    }
  }

  return {
    name: 'Erro ao buscar situação',
    color: 'error'
  }
}
