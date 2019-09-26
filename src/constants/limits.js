export default {
  returnPercent: {
    min: 10
  },
  loan: {
    default: 1200,
    min: 500,
    max: 50000
  },
  installments: [6, 9, 12, 18],
  invoiceMaturity: [5, 10, 15, 20, 25],
  addResources: {
    min: 25,
    max: 100000
  },
  withdrawResources: {
    min: 5
  },
  interestRate: {
    min: 0.034,
    max: 0.053
  }
}
