export interface ExpenseData {
  date: string
  amount: number
  title: string
  sectionTitle?: string
}

export interface ExpensesListData {
  id: string
  data: ExpenseData
}
