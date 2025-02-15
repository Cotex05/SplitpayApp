import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
  StatusBar,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin, userSignUp} from '../../../slices/authSlices';
import {showToastWithGravity} from '../../../components/native/AndroidComponents';
import {darkColors, lightColors} from '../../../constants/colors';
import {AccentActionButton} from '../../../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_NAME} from '../../../constants/names';
import {LoadingModalBox} from '../../../components/LoadingBox';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const RegisterUserDetails = ({route, navigation}) => {
  const [fullname, setFullname] = useState('');

  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');

  const [signinModalVisible, setSigninModalVisible] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {userSigninData} = route.params;

  const dispatch = useDispatch();
  const {token, loading, error, successMessage} = useSelector(
    state => state.auth,
  );

  const handleNewUserRegisteration = async () => {
    if (
      username.trim().length === 0 ||
      fullname.trim().length === 0 ||
      email.trim().length === 0
    ) {
      Alert.alert(
        'Invalid inputs',
        'Username, email and fullname are required',
      );
      return;
    }

    try {
      setSigninModalVisible(true);
      const generatedPassword = userSigninData?.data?.user?.id + '@' + email;

      const signUpRequest = {
        fullName: fullname,
        username: username,
        password: generatedPassword,
        profileId: userSigninData?.data?.user?.id,
        photoUrl: image,
        email: email,
      };

      const resultAction = await dispatch(userSignUp(signUpRequest));

      console.log('Result from handleNewUserRegisteration', resultAction);
      if (userSignUp.fulfilled.match(resultAction)) {
        console.log(`Registeration Successful!`);
        await handleSignIn();
      } else {
        console.log('Registration failed:', resultAction.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    } finally {
      setSigninModalVisible(false);
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

  const handleSignIn = async () => {
    try {
      const generatedPassword = userSigninData?.data?.user?.id + '@' + email;

      const loginRequest = {
        username: username,
        password: generatedPassword,
        profileId: userSigninData?.data?.user?.id,
        email: email,
      };

      const resultAction = await dispatch(userLogin(loginRequest));

      console.log('result from handleSignIn', resultAction);
      if (userLogin.fulfilled.match(resultAction)) {
        await setAuthenticationInMemory(resultAction?.payload);
        showToastWithGravity(`Welcome to ${APP_NAME}`);
        navigation.reset({
          index: 0,
          routes: [{name: 'MainNavigator'}], // Reset navigation after login success
        });
      } else {
        console.log('Login failed:', resultAction.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  const handleExitDuringAuthentication = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    } finally {
      BackHandler.exitApp();
    }
  };

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'No',
            onPress: () => {
              // Do nothing
            },
            style: 'cancel',
          },
          {text: 'YES', onPress: handleExitDuringAuthentication},
        ],
        {cancelable: false},
      );

      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    setEmail(userSigninData?.data?.user?.email);
    setFullname(userSigninData?.data?.user?.name);
    setImage(userSigninData?.data?.user?.photo);
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <View style={{padding: 10, margin: 10}}>
          <Image
            source={{uri: image}}
            style={{height: 100, width: 100, borderRadius: 100}}
          />
        </View>
        <Text
          style={[
            styles.title,
            {color: colors.text, borderColor: colors.text},
          ]}>
          Enter details
        </Text>

        <TextInput
          style={[styles.input, {color: colors.text, borderColor: colors.text}]}
          placeholder="Full name"
          placeholderTextColor={'gray'}
          value={fullname}
          onChangeText={setFullname}
          autoCapitalize="none"
          maxLength={25}
          autoFocus
        />

        <TextInput
          style={[styles.input, {color: colors.text, borderColor: colors.text}]}
          placeholder="Username"
          placeholderTextColor={'gray'}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          maxLength={12}
        />
        <Text
          style={{
            color: colors.muted,
            paddingBottom: 2,
            alignSelf: 'flex-start',
          }}>
          Username must be of atleast 3 letters
        </Text>

        <TextInput
          style={[
            styles.input,
            {color: colors.muted, borderColor: colors.muted},
          ]}
          placeholder="Email"
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          editable={false}
        />

        <View>
          {error ? (
            <Text style={{color: 'red', fontSize: 14, padding: 10}}>
              {error}
            </Text>
          ) : null}
        </View>

        <View style={{margin: 10, paddingVertical: 12}}>
          <AccentActionButton
            title="Continue"
            onPress={handleNewUserRegisteration}
            loading={loading}
          />
        </View>
      </View>
      <LoadingModalBox
        modalVisible={signinModalVisible}
        setModalVisible={setSigninModalVisible}
        message="Signing In..."
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flexStart',
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
    marginTop: 15,
    fontWeight: 500,
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

export default RegisterUserDetails;
