import InvestmentType from '../views/InvestmentType'
import Filter from '../views/Filter'
import AmountToInvest from '../views/AmountToInvest'
import Summary from '../views/Summary'
import Terms from '../views/Terms'

const whitePages = {
  backgroundType: 'none'
}

export const steps = [
  {
    component: InvestmentType,
    ...whitePages,
    buttonBorder: true
  },
  {
    component: AmountToInvest,
    ...whitePages
  },
  {
    component: Filter,
    ...whitePages,
    contentStyle: {
      marginHorizontal: 0
    },
    buttonBorder: true
  },
  {
    component: Summary,
    blueHeader: true
  }
]

export const terms = {
  component: Terms,
  ...whitePages,
  blueHeader: true
}
