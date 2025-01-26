/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ExpenseManager = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View style={{padding: 20, backgroundColor: colors.primary}}>
        <View style={GlobalStyle.justifyBetweenRow}>
          <Text
            style={{
              marginHorizontal: 20,
              color: colors.header,
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Add Expense
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingVertical: 5, marginRight: 10}}>
            <Ionicons name="close-outline" color={colors.header} size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 5,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: Dimensions.get('window').width,
          }}>
          <TextInput
            style={{
              height: 50,
              margin: 12,
              width: '100%',
              borderRadius: 10,
              borderBottomWidth: 2,
              padding: 10,
              borderColor: colors.muted,
              color: colors.header,
              fontSize: 20,
            }}
            autoFocus={true}
            placeholder="Enter expense title"
            placeholderTextColor={colors.muted}
            onChangeText={setTitle}
            value={title}
          />
        </View>
      </View>
      <View style={{backgroundColor: colors.background}}>
        <TextInput
          style={{
            height: 50,
            margin: 12,
            width: Dimensions.get('screen').width - 20,
            borderRadius: 10,
            borderWidth: 2,
            padding: 10,
            borderColor: colors.muted,
            color: colors.text,
            fontSize: 18,
          }}
          placeholderTextColor={colors.muted}
          onChangeText={setAmount}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
        />
        <TextInput
          style={{
            height: 50,
            margin: 12,
            width: Dimensions.get('screen').width - 20,
            borderRadius: 10,
            borderWidth: 2,
            padding: 10,
            borderColor: colors.muted,
            color: colors.text,
            fontSize: 18,
          }}
          placeholderTextColor={colors.muted}
          onChangeText={setAmount}
          placeholder="Paid For"
          keyboardType="numeric"
          value={amount}
        />
        <TextInput
          style={{
            height: 50,
            margin: 12,
            width: Dimensions.get('screen').width - 20,
            borderRadius: 10,
            borderWidth: 2,
            padding: 10,
            borderColor: colors.muted,
            color: colors.text,
            fontSize: 18,
          }}
          placeholderTextColor={colors.muted}
          onChangeText={setAmount}
          placeholder="Date"
          keyboardType="numeric"
          value={amount}
        />
      </View>
      <View
        style={{
          marginVertical: 100,
          display: 'flex',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{color: colors.tertiary, fontWeight: 'bold', fontSize: 25}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExpenseManager;
