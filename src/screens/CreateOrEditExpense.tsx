import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native'
import { PURPLE_COLOR, WHITE } from '../consts'
import { ExpenseData } from '../types'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { setExpensesData } from '../expensesSlice'
import { RootStackParamList } from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'

type Props = NativeStackScreenProps<RootStackParamList, 'CreateOrEditExpense'>

export const CreateOrEditExpense = ({
  navigation,
  route,
}: Props): JSX.Element => {
  let editMode = route.params?.isEditMode || false

  const { expensesData } = useAppSelector((state: RootState) => state.expenses)
  const dispatch = useAppDispatch()

  const [title, onChangeTitle] = React.useState<string>('')
  const [amount, onChangeAmount] = React.useState<string>('')
  const [date, onChangeDate] = React.useState<string>('')

  const setParamsData = (): void => {
    const expenseId = route.params?.expenseId
    onChangeTitle(expensesData[expenseId].title)
    onChangeAmount(expensesData[expenseId].amount.toString())
    onChangeDate(expensesData[expenseId].date)
  }

  useEffect(() => {
    editMode && setParamsData()
  }, [])

  const dispatchNewExpenseData = () => {
    if (title && amount && date) {
      let newExpenseData: ExpenseData[] = [
        {
          title,
          amount: parseFloat(amount),
          date,
        },
      ]
      let oldUserData = expensesData
      if (editMode) {
        oldUserData = expensesData.filter(
          (expense) => expense != expensesData[route.params?.expenseId],
        )
      }
      const updatedUserData = newExpenseData.concat(oldUserData)
      updatedUserData && dispatch(setExpensesData(updatedUserData))
      navigation.goBack()
    }
  }
  const navigateBack = (): void => {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={navigateBack}>
        <Image
          source={require('../images/closeIcon.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {editMode ? 'Edit Expense' : 'Create Expense'}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Amount"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeDate}
        value={date}
        keyboardType="numeric"
        placeholder="Date (YYYY-MM-DD)"
      />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={dispatchNewExpenseData}
      >
        <Text style={styles.actionText}> {editMode ? 'Save' : 'Create'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  closeIcon: {
    height: 20,
    width: 24,
  },
  closeButton: {
    paddingTop: 20,
    paddingRight: 20,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    paddingTop: 10,
  },
  input: {
    paddingTop: 50,
    height: 80,
    width: 350,
    backgroundColor: WHITE,
    borderColor: 'black',
    borderBottomWidth: 0.2,
    paddingLeft: 6,
  },
  actionButton: {
    backgroundColor: PURPLE_COLOR,
    height: 50,
    borderRadius: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    top: 200,
  },
  actionText: {
    color: WHITE,
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: '700',
  },
})
