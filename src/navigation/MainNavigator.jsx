import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors} from '../constants/colors';
import RegisterUserDetails from '../screens/auth/others/RegisterUserDetails';
import SigninScreen from '../screens/auth/signin/Signin';
import BalanceGraph from '../screens/expense/BalanceGraph';
import Expense from '../screens/expense/Expense';
import ExpenseManager from '../screens/expense/ExpenseManager';
import Group from '../screens/groups/Group';
import ManageGroup from '../screens/groups/GroupManager';
import Groups from '../screens/groups/Groups';
import About from '../screens/others/About';
import Support from '../screens/others/Support';
import EditProfile from '../screens/profile/EditProfile';
import Profile from '../screens/profile/Profile';
import MyUPIsScreen from '../screens/profile/routes/MyUPIs';
import SettledTransaction from '../screens/settlement/SettledTransaction';
import TabsNavigator from './TabsNavigator';

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
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="BalanceGraph" component={BalanceGraph} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen
        name="RegisterUserDetails"
        component={RegisterUserDetails}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
