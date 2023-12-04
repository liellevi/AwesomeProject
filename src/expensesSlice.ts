import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExpenseData } from './types'

interface ExpensesState {
  userName: string
  expensesData: ExpenseData[]
  filteredData: ExpenseData[]
}

// Define the initial state using that type
const initialState: ExpensesState = {
  userName: '',
  expensesData: [],
  filteredData: [],
}

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    setExpensesData: (state, action: PayloadAction<ExpenseData[]>) => {
      state.expensesData = action.payload
    },
    setFilteredData: (state, action: PayloadAction<ExpenseData[]>) => {
      state.filteredData = action.payload
    },
    clearAppData: (state) => {
      ;(state.userName = ''),
        (state.expensesData = []),
        (state.filteredData = [])
    },
  },
})

export const { setUserName, setFilteredData, setExpensesData, clearAppData } =
  expensesSlice.actions

// export const selectUserName = (state: RootState) => state.expenses

export default expensesSlice.reducer
