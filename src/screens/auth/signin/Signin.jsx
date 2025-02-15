import {
  View,
  Text,
  StatusBar,
  useColorScheme,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {APP_NAME} from '../../../constants/names';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {darkColors, lightColors} from '../../../constants/colors';
import LoadingBox, {LoadingModalBox} from '../../../components/LoadingBox';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserExistStatus, userLogin} from '../../../slices/authSlices';
import {showToastWithGravity} from '../../../components/native/AndroidComponents';
import {OAUTH_GOOGLE_WEB_CLIENT_ID} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SigninScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const dispatch = useDispatch();
  const {response, loading, error, successMessage} = useSelector(
    state => state.auth,
  );

  // Google SignIn
  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: OAUTH_GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true, // If required access to Google APIs on the backend
      scopes: ['profile', 'email'],
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      // on successful google signin
      if (userInfo?.type == 'success') {
        const email = userInfo?.data?.user?.email;

        // verify existing user
        const resultAction = await dispatch(fetchUserExistStatus(email));
        console.log(
          'Result after user existence verified by email',
          resultAction,
        );
        if (fetchUserExistStatus.fulfilled.match(resultAction)) {
          // already existing user
          if (resultAction.payload?.existingUser == true) {
            const generatedPassword = userInfo?.data?.user?.id + '@' + email;
            const loginRequest = {
              username: resultAction.payload?.username,
              password: generatedPassword,
              profileId: userInfo?.data?.user?.id,
              email: email,
            };

            //trigger signin to backend
            handleSignIn(loginRequest);
          } else {
            // Process new user registration
            navigation.navigate('RegisterUserDetails', {
              userSigninData: userInfo,
            });
          }
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
      } else {
        console.error('Sign in error:', error);
      }
    }
  };

  const setAuthenticationInMemory = async userData => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('authUser', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignIn = async loginRequest => {
    try {
      const resultAction = await dispatch(userLogin(loginRequest));

      console.log('result from handleSignIn', resultAction);
      if (userLogin.fulfilled.match(resultAction)) {
        await setAuthenticationInMemory(resultAction?.payload);
        showToastWithGravity(`Welcome to ${APP_NAME}`);
        // Reset navigation after login success
        navigation.reset({
          index: 0,
          routes: [{name: 'MainNavigator'}],
        });
      } else {
        console.log('Login failed:', resultAction.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  return (
    <>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <View style={{alignItems: 'center', padding: 10, margin: 10}}>
          <Image
            source={{uri: 'https://i.ibb.co/1YwLtJfy/Splitpay-App-Logo.png'}}
            style={{width: 120, height: 120, borderRadius: 100}}
          />
        </View>
        <Text
          style={[
            styles.title,
            {color: colors.text, letterSpacing: 1, fontFamily: 'monospace'},
          ]}>
          {APP_NAME}
        </Text>
        <View
          style={{
            backgroundColor: colors.muted,
            height: 2,
            width: Dimensions.get('screen').width * 0.6,
            borderRadius: 100,
            marginBottom: 20,
          }}
        />
        <View style={{padding: 20}}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.tertiary} />
          ) : (
            <GoogleSigninButton
              style={{width: 200, height: 50}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleGoogleSignIn}
            />
          )}
        </View>
        <View style={{position: 'absolute', bottom: 30, padding: 10}}>
          <Text
            style={{color: colors.muted, fontSize: 14, textAlign: 'center'}}>
            By clicking Sign in, You agree to {APP_NAME}'s
            <Text style={{color: colors.accent}}> Terms of Service </Text> and
            <Text style={{color: colors.accent}}> Privacy policy</Text>.
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    minWidth: 100,
    backgroundColor: '#007bff',
    alignItems: 'center',
    color: '#fff',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: 'gray',
  },
});

export default SigninScreen;
