import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {showToastWithGravity} from '../../../components/native/AndroidComponents';
import {APP_NAME} from '../../../constants/names';
import {userLogin} from '../../../slices/authSlices';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#111222' : Colors.lighter,
    flex: 1,
  };

  const textStyle = {
    color: isDarkMode ? Colors.lighter : Colors.darker,
  };

  const borderStyle = {
    borderColor: isDarkMode ? '#ddd' : Colors.darker,
  };

  const dispatch = useDispatch();
  const {loading, error, successMessage, token} = useSelector(
    state => state.auth,
  );

  const setAuthenticationInMemory = async userData => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('authUser', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      Alert.alert('Invalid Login', 'Username and password are required');
      return;
    }

    try {
      const resultAction = await dispatch(userLogin({username, password}));

      console.log('result from handleLogin', resultAction);
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

  return (
    <View style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={[styles.title, textStyle]}>Login</Text>

      <TextInput
        style={[styles.input, textStyle, borderStyle]}
        placeholder="Username"
        placeholderTextColor={'gray'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, textStyle, borderStyle]}
        placeholder="Password"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {error ? (
        <Text style={{color: 'red', fontSize: 20, padding: 10}}>{error}</Text>
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={[styles.button]} onPress={handleLogin}>
          <Text style={[styles.buttonText]}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.link]}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
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

export default LoginScreen;
