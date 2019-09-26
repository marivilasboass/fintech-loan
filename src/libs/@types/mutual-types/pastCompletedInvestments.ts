export interface BorrowerMarketplaceData {
  address: {
    state: string,
    city: string
  },
  nickname: string
}

export interface LoansApproved {
  publishedAt: Date,
  fullInvestmentAt: Date,
  borrowerMarketplaceData: BorrowerMarketplaceData,
  finalizedSimulation: {
    financedAmountCents: number
  },
  score: string,
  scoreFull: string
}