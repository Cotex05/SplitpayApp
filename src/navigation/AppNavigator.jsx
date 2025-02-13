import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Suspense, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {darkColors, lightColors} from '../constants/colors';
import LoginScreen from '../screens/auth/login/Login';
import RegisterScreen from '../screens/auth/register/Register';
import store from '../store/store';
import MainNavigator from './MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userPersist} from '../slices/authSlices';
import LoadingBox from '../components/LoadingBox';
import {setNavigator} from './NavigationService';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const handleUserPersistence = async () => {
    dispatch(userPersist());
  };

  useEffect(() => {
    handleUserPersistence();
  }, []);

  return (
    <Suspense fallback={<LoadingBox />}>
      <NavigationContainer
        ref={navigatorRef => {
          setNavigator(navigatorRef);
        }}>
        {isAuthenticated ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Suspense>
  );
}

export default AppNavigator;
