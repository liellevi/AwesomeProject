import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { PURPLE_COLOR, WHITE, WHITE_BACKGROUND } from '../consts'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setUserName } from '../expensesSlice'
import { RootState } from '../../store'

export interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>
}

export const LoginScreen = ({ navigation }: LoginScreenProps): JSX.Element => {
  const [newUser, onChangeUserName] = React.useState<string>('')
  const { userName } = useAppSelector((state: RootState) => state.expenses)

  useEffect(() => {
    userName && navigation.navigate('Home')
  }, [])

  const dispatch = useAppDispatch()

  const onLoginButtonPress = (): void => {
    if (newUser.length) {
      dispatch(setUserName(newUser))
      navigation.navigate('Home')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUserName}
        value={newUser}
        placeholder="Enter Name"
      />
      <TouchableOpacity style={styles.loginbutton} onPress={onLoginButtonPress}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_BACKGROUND,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginbutton: {
    backgroundColor: PURPLE_COLOR,
    height: 50,
    borderRadius: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    top: 200,
  },
  loginText: {
    color: WHITE,
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    height: 55,
    width: 255,
    backgroundColor: WHITE,
    borderColor: PURPLE_COLOR,
    borderWidth: 1,
    paddingLeft: 6,
  },
})
