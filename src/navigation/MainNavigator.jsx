import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditProfile from '../screens/profile/EditProfile';
import Profile from '../screens/profile/Profile';
import {darkColors, lightColors} from '../constants/colors';
import Groups from '../screens/groups/Groups';
import Group from '../screens/groups/Group';
import Expense from '../screens/expense/Expense';
import ExpenseManager from '../screens/expense/ExpenseManager';
import TabsNavigator from './TabsNavigator';
import MyUPIsScreen from '../screens/profile/routes/MyUPIs';
import ManageGroup from '../screens/groups/GroupManager';
import SettledTransaction from '../screens/settlement/SettledTransaction';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="TabsNavigator">
      <Stack.Screen name="TabsNavigator" component={TabsNavigator} />
      <Stack.Screen name="MyProfile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Groups" component={Groups} />
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="ManageGroup" component={ManageGroup} />
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen
        screenOptions={{presentation: 'modal'}}
        name="ExpenseManager"
        component={ExpenseManager}
      />
      <Stack.Screen name="MyUPIs" component={MyUPIsScreen} />
      <Stack.Screen name="SettledTransaction" component={SettledTransaction} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
