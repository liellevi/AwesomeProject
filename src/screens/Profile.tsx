import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { WHITE_BACKGROUND} from '../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { clearAppData } from '../expensesSlice';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
export interface ProileScreenProps {
  navigation: NavigationProp<ParamListBase>
}

export const ProfileScreen = ({navigation}: ProileScreenProps): JSX.Element => {
  const { expensesData } = useAppSelector((state: RootState) => state.expenses);
  const dispatch = useAppDispatch();

  const onSignOutPress = (): void => {
    navigation.navigate('LoginScreen');
    dispatch(clearAppData())
  };
  return (
    <View style={styles.container}>
      <View style={styles.textItem}>
        <Text style={styles.totalText}>
          Total Expenses Items: {expensesData?.length}
        </Text>
      </View>
      <TouchableOpacity style={styles.textItem} onPress={onSignOutPress}>
        <Text style={styles.totalText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_BACKGROUND,
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '400',
    paddingLeft: 30,
    borderTopWidth: 0.2,
    borderBottomColor: 'black',
  },
  textItem: {
    marginHorizontal: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: 'black',
    height: 40,
    justifyContent: 'center',
  },
});
