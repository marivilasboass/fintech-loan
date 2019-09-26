import { PersonType } from './account'

export interface LoanInstallment {
  dueDate: Date,
  interestAmountCents: number,
  amortizationAmountCents: number,
  totalAmountCents: number
}

export interface SimulatedLoan {
  requestedAmountCents: number,
  numberOfInstallments: number,
  extraDays: number,
  installmentAmountCents: number,
  iofAmountCents: number,
  iofPercentage: number,
  financedAmountCents: number,
  totalAmountCents: number,
  cetPercentagePerMonth: number,
  cetPercentagePerYear: number,
  interestPercentagePerMonth: number,
  interestPercentagePerYear: number,
  investorTotalProfitCents: number,
  investorTotalProfitPercentage: number,
  interestTotalAmountCents: number,
  bestPayDay: number,
  contractDate: Date,
  firstDueDate: Date,
  expensesTotalAmountCents: number,
  installments: LoanInstallment[],
  feeDiscount: number,
  personType: PersonType
}
