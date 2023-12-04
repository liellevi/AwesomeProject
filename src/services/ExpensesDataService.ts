import moment from 'moment'
import { ExpenseData, ExpensesListData } from '../types'

export const sortExpensesByDateSections = (
  rawData: ExpenseData[],
): ExpensesListData[] => {
  let retVal: ExpensesListData[] = []
  if (rawData && rawData.length > 0) {
    let prevPairIsSameDay = false

    const expenseDataWithDates: ExpenseData[] = rawData.map((item) => {
      return { ...item, date: item.date }
    })
    expenseDataWithDates.sort((a, b) => Number(b?.date?.valueOf()) - Number(a?.date?.valueOf()))

    for (let i = 0; i < expenseDataWithDates.length; i++) {
      const expense1 = expenseDataWithDates[i]
      const expense2 = expenseDataWithDates[i + 1]
      const currentItemId = i.toString()
      if (
        moment(new Date(expense1.date)).isSame(new Date(expense2?.date), 'day')
      ) {
        expense1.sectionTitle = prevPairIsSameDay
          ? ''
          : moment(expense2.date, 'YYYY-MM-DD').format('YYYY-MM-DD')
        retVal.push({ id: currentItemId, data: expense1 })
        prevPairIsSameDay = true
      } else {
        expense1.sectionTitle = prevPairIsSameDay
          ? ''
          : moment(expense1.date, 'YYYY-MM-DD').format('YYYY-MM-DD')
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
