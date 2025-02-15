import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Suspense, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import {darkColors, lightColors} from '../constants/colors';
import RegisterUserDetails from '../screens/auth/others/RegisterUserDetails';
import SigninScreen from '../screens/auth/signin/Signin';
import {userPersist} from '../slices/authSlices';
import MainNavigator from './MainNavigator';
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
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen
              name="RegisterUserDetails"
              component={RegisterUserDetails}
            />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Suspense>
  );
}

export default AppNavigator;
