import React, {useState} from 'react';
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
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {userSignUp} from '../../../slices/authSlices';
import {showToastWithGravity} from '../../../components/native/AndroidComponents';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
  const {loading, error, successMessage} = useSelector(state => state.auth);

  const handleRegister = async () => {
    if (
      username.trim().length === 0 ||
      password.trim().length === 0 ||
      email.trim().length === 0
    ) {
      Alert.alert(
        'Invalid inputs',
        'Username, email and password are required',
      );
      return;
    }

    try {
      const resultAction = await dispatch(
        userSignUp({username, email, password}),
      );

      console.log('result from handleRegister', resultAction);
      if (userSignUp.fulfilled.match(resultAction)) {
        showToastWithGravity(`Registered Successfully, Login now!`);
        navigation.navigate('Login');
      } else {
        console.log('Registration failed:', resultAction.payload);
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
      <Text style={[styles.title, textStyle]}>Register</Text>

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
        placeholder="Email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={setEmail}
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

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={[styles.button]} onPress={handleRegister}>
          <Text style={[styles.buttonText]}>Register</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.link]}>Already have an account? Login</Text>
      </TouchableOpacity>

      {error ? (
        <Text style={{color: 'red', fontSize: 20, padding: 10}}>{error}</Text>
      ) : null}
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

export default RegisterScreen;
