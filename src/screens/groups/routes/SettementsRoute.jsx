/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {darkColors, lightColors} from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import currency from '../../../constants/currency';

const sampleTransactions = [
  {
    payer: 'Mike',
    payee: 'John',
    amount: 120,
    date: '20/01/2025',
    cashFlow: 'IN',
  },
  {
    payer: 'John',
    payee: 'Mark',
    amount: 95,
    date: '21/01/2025',
    cashFlow: 'OUT',
  },
  {
    payer: 'Tyson',
    payee: 'John',
    amount: 20,
    date: '20/01/2025',
    cashFlow: 'IN',
  },
];

const TransactionList = ({data}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => navigation.navigate('SettledTransaction', {data: data})}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.background,
          height: 80,
        }}>
        <View style={{display: 'flex', flexDirection: 'row', marginLeft: 20}}>
          <Ionicons
            name={data.cashFlow == 'IN' ? 'arrow-forward' : 'arrow-back'}
            size={50}
            color={data.cashFlow == 'IN' ? colors.green : colors.red}
            style={{
              width: 50,
              height: 50,
              alignSelf: 'center',
              borderRadius: 50,
            }}
          />
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                display: 'flex',
                color: colors.text,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {data.payer}
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 400,
                fontSize: 14,
              }}>
              {data.date}
            </Text>
          </View>
        </View>
        <View
          style={{display: 'flex', justifyContent: 'center', marginRight: 10}}>
          <Text
            style={{
              color: data.cashFlow == 'IN' ? colors.green : colors.red,
              padding: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {data.cashFlow == 'IN' ? '+ ' : '- '}
            {currency.symbol}
            {data.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SettlementsRoute = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View>
      <View
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        style={{borderBottomWidth: 2, borderBottomColor: colors.muted}}>
        <Text
          style={{
            display: 'flex',
            color: colors.text,
            padding: 10,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Transactions
        </Text>
      </View>
      <ScrollView>
        {sampleTransactions.map((item, index) => {
          return <TransactionList data={item} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default SettlementsRoute;
