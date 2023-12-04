import moment from 'moment';
import {ExpenseData, ExpensesListData} from '../types';

export const sortExpensesByDateSections = (
  rawData: ExpenseData[]
): ExpensesListData[] => {
  let retVal: ExpensesListData[] = [];
  if (rawData && rawData.length > 0) {
    
   let prevPairIsSameDay = false;

    const expenseDataWithDates: ExpenseData[]|any = rawData.map(item => {
      return {...item, date: item.date};
    });
    for (let i = 0; i < expenseDataWithDates.length; i++) {
      const expense1 = expenseDataWithDates[i];
      const expense2 = expenseDataWithDates[i + 1];
      const currentItemId = i.toString();
      if (moment(moment(expense1.date, 'YYYY-MM-DD')).isSame(moment(expense2?.date,'YYYY-MM-DD'), 'day')){
        expense1.sectionTitle = prevPairIsSameDay ? '' : moment(expense2.date,'YYYY-MM-DD').calendar();
        retVal.push({id: currentItemId, data: expense1});
        prevPairIsSameDay = true;
      } else {
        expense1.sectionTitle = prevPairIsSameDay ? '' : moment(expense1.date,'YYYY-MM-DD').calendar();
        retVal.push({id: currentItemId, data: expense1});
        prevPairIsSameDay = false;
      }
    }
  }
  return retVal;
};


export const calculateTotalAmount = (
  userExpensesData: ExpenseData[] | null,
): number => {
  let totalExpensesAmount = 0;
  if (userExpensesData) {
    userExpensesData?.forEach(expense => {
      totalExpensesAmount += expense.amount;
    });
  }
  return totalExpensesAmount;
};