import React from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen } from './src/screens/Login'
import { WHITE_BACKGROUND } from './src/consts'
import { HomeScreen } from './src/screens/Home'
import { ProfileScreen } from './src/screens/Profile'
import { CreateOrEditExpense } from './src/screens/CreateOrEditExpense'
import { FilterExpense } from './src/screens/FilterExpense'

export type RootStackParamList = {
  LoginScreen: undefined
  HomeScreen: { filterMode: boolean }
  Home: undefined
  CreateOrEditExpense: {
    isEditMode: boolean
    expenseId: number
  }
  FilterExpense: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

const CreateNewPlaceHolder = (): JSX.Element => (
  <View style={styles.modalView} />
)
const createCreateIconComponent = (): JSX.Element => {
  return (
    <Image source={require('./src/images/plus.png')} style={styles.plusIcon} />
  )
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: { backgroundColor: WHITE_BACKGROUND } }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: WHITE_BACKGROUND,
          },
          tabBarIconStyle: { display: 'none' },
          tabBarLabel: 'Home',
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateNewPlaceHolder}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault()
            navigation.navigate('CreateOrEditExpense')
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: createCreateIconComponent,
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIconStyle: { display: 'none' },
          tabBarLabel: 'Profile',
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
    </Tab.Navigator>
  )
}
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeTabs}
                options={() => ({
                  headerBackVisible: false,
                  gestureEnabled: false,
                  headerShown: false,
                })}
              />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                  name="CreateOrEditExpense"
                  component={CreateOrEditExpense}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
                <Stack.Screen
                  name="FilterExpense"
                  component={FilterExpense}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_BACKGROUND,
  },
  plusIcon: {
    height: 50,
    width: 50,
    top: -10,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabBarLabelStyle: {
    fontWeight: '400',
    fontSize: 15,
    top: -10,
  },
})

export default App
