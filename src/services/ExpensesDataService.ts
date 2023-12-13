import moment from 'moment'
import { ExpenseData, ExpensesListData } from '../types'

export const sortExpensesByDateSections = (
  rawData: ExpenseData[],
): ExpensesListData[] => {
  let retVal: ExpensesListData[] = []
  if (rawData && rawData.length > 0) {
    let prevPairIsSameDay = false

    const expenseDataWithDates: ExpenseData[] | any = rawData.map((item) => {
      return { ...item, date: item.date }
    })

    const sortedData = expenseDataWithDates.sort((a, b) => {
      const timestamp1 = moment(a?.date, 'YYYY-MM-DD').unix()
      const timestamp2 = moment(b?.date, 'YYYY-MM-DD').unix()
      return moment(timestamp1).diff(timestamp2)
    })

    for (let i = 0; i < sortedData.length; i++) {
      const expense1 = sortedData[i]
      const expense2 = sortedData[i + 1]
      const currentItemId = i.toString()
      if (moment(moment(expense1.date, 'YYYY-MM-DD')).isSame(moment(expense2?.date, 'YYYY-MM-DD'),'day',)) {
        expense1.sectionTitle = prevPairIsSameDay ? '' : moment(expense2.date, 'YYYY-MM-DD').calendar()
        retVal.push({ id: currentItemId, data: expense1 })
        prevPairIsSameDay = true
      } else {
        expense1.sectionTitle = prevPairIsSameDay ? '' : moment(expense1.date, 'YYYY-MM-DD').calendar()
        retVal.push({ id: currentItemId, data: expense1 })
        prevPairIsSameDay = false
      }
    }
  }
  return retVal
}

export const calculateTotalAmount = (
  userExpensesData: ExpenseData[] | null,
): number => {
  let totalExpensesAmount = 0
  if (userExpensesData) {
    userExpensesData?.forEach((expense) => {
      totalExpensesAmount += expense.amount
    })
  }
  return totalExpensesAmount
}
