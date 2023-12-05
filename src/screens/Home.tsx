import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'
import { GRAY, LIGHT_RED, WHITE_BACKGROUND } from '../consts'
import { ExpensesListData } from '../types'
import {
  sortExpensesByDateSections,
  calculateTotalAmount,
} from '../services/ExpensesDataService'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { RootStackParamList } from '../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>

export const HomeScreen = ({ navigation, route }: Props): JSX.Element => {
  const { userName, expensesData, filteredData } = useAppSelector((state: RootState) => state.expenses)
  const totalAmounToDisplay = calculateTotalAmount(route.params?.filterMode ? filteredData : expensesData)
  const fractionalPart = totalAmounToDisplay.toString().split('.')[1]

  useEffect(() => {
    navigation.setOptions({ title: userName })
  }, [])

  const getListData = (): ExpensesListData[] => {
    let returnVal: ExpensesListData[] | null = []
    const dataToDisplay = route.params?.filterMode ? filteredData : expensesData
    if (dataToDisplay && dataToDisplay.length > 0) {
      const sortedExpensesDates = sortExpensesByDateSections(dataToDisplay)
      returnVal = sortedExpensesDates
    }
    return returnVal
  }
  const navigateToFilterExpnseScreen = (): void => {
    navigation.navigate('FilterExpense')
  }

  const renderItem = ({ item }: any): JSX.Element | null => {
    const navigateToEditExpenseScreen = (): void => {
      const screenParams = {
        isEditMode: true,
        expenseId: parseInt(item.id, 10),
      }
      navigation.navigate('CreateOrEditExpense', screenParams)
    }
    const fractionalPart = item.data.amount?.toString().split('.')[1] || '00'
    let returnVal: JSX.Element | null = null
    returnVal = (
      <View>
        {item.data?.sectionTitle && (
          <View style={styles.sectionView}>
            <Text style={styles.sectionText}>{item.data?.sectionTitle}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={navigateToEditExpenseScreen}
          style={
            item.data?.sectionTitle
              ? styles.expenseItem
              : styles.expenseItemWithSeperator
          }
        >
          <View style={styles.expenseView}>
            <Text style={styles.expenseText}>{item.data.title}</Text>
            <Text style={styles.expenseText}>
              ${Math.trunc(item.data.amount)}
              <Text style={styles.fractionalPart}>
                .{fractionalPart.padEnd(2, '00')}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )

    return returnVal
  }

  return (
    <View style={styles.container}>
      <View style={styles.totalExpenses}>
        <Text style={styles.totalExpensesText}>Total Expenses: </Text>
        <Text style={styles.totalAmount}>
          ${Math.trunc(totalAmounToDisplay)}
          {totalAmounToDisplay > 0 && (
            <Text style={styles.fractionalPart}>.{fractionalPart?.padEnd(2, '00')|| '00'}</Text>
          )}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={navigateToFilterExpnseScreen}
      >
        <Image
          source={require('../images/filter.png')}
          style={styles.filterIcon}
        />
        <Text style={styles.filterText}>Filters</Text>
      </TouchableOpacity>
      <FlatList
        data={getListData()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_BACKGROUND,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  totalExpensesText: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 24,
  },
  fractionalPart: {
    fontSize: 16,
  },
  totalExpenses: {
    paddingTop: 28,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseText: {
    fontSize: 20,
    color: 'black',
  },
  expenseView: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseItem: {
    height: 62,
    justifyContent: 'center',
  },
  expenseItemWithSeperator: {
    height: 62,
    justifyContent: 'center',
    borderTopWidth: 0.2,
    borderBottomColor: 'black',
  },
  sectionView: {
    backgroundColor: LIGHT_RED,
    height: 40,
    paddingLeft: 11,
    justifyContent: 'center',
  },
  sectionText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    lineHeight: 14,
  },
  filterIcon: {
    height: 20,
    width: 20,
  },
  filterButton: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: 'row',
    height: 29,
    width: 94,
    borderRadius: 60,
    backgroundColor: GRAY,
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
  },
})
