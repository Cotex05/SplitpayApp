import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Suspense, useEffect} from 'react';
import {Image, Text, useColorScheme, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import {darkColors, lightColors} from '../constants/colors';
import RegisterUserDetails from '../screens/auth/others/RegisterUserDetails';
import SigninScreen from '../screens/auth/signin/Signin';
import {userPersist} from '../slices/authSlices';
import MainNavigator from './MainNavigator';
import {setNavigator} from './NavigationService';
import NetInfo from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [isOffline, setIsOffline] = React.useState(false);

  const dispatch = useDispatch();

  const handleUserPersistence = async () => {
    dispatch(userPersist());
  };

  useEffect(() => {
    handleUserPersistence();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    // Cleanup the event listener
    return () => unsubscribe();
  }, []);

  if (isOffline) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}>
        <View style={{alignItems: 'center', padding: 10, margin: 10}}>
          <Image
            source={require('../assets/images/AppLogo.png')}
            style={{width: 120, height: 120, borderRadius: 100}}
          />
        </View>
        <Text style={{color: colors.red, fontSize: 22, fontWeight: 600}}>
          {' '}
          No internet! You are Offline.
        </Text>
      </View>
    );
  }

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
