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

const sampleExpenses = [
  {
    title: 'Icecream',
    paidBy: 'Mark',
    amount: 300,
    paidFor: 'All',
    date: '17/01/2025',
  },
  {
    title: 'Biryani',
    paidBy: 'John Doe',
    amount: 600,
    paidFor: 'All',
    date: '18/01/2025',
  },
  {
    title: 'Pizza',
    paidBy: 'Mark',
    amount: 900,
    paidFor: 'All',
    date: '14/01/2025',
  },
  {
    title: 'Juice',
    paidBy: 'Mike',
    amount: 150,
    paidFor: 'All',
    date: '19/01/2025',
  },
  {
    title: 'Dinner at restaurant',
    paidBy: 'Mike',
    amount: 1200,
    paidFor: 'All',
    date: '22/01/2025',
  },
  {
    title: 'Coke',
    paidBy: 'Mark',
    amount: 110,
    paidFor: 'All',
    date: '18/01/2025',
  },
];

const ExpenseList = ({data}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => navigation.navigate('Expense', {data: data})}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.background,
          height: 80,
          padding: 20,
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Ionicons
            name="basket"
            size={50}
            color={colors.accent}
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
              {data.title}
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              {data.paidBy}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={{
              color: colors.green,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {currency.symbol}
            {data.amount}
          </Text>
          <Text
            style={{
              display: 'flex',
              color: 'gray',
              fontWeight: 300,
              paddingVertical: 5,
              fontSize: 12,
            }}>
            {data.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ExpensesRoute = () => {
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
          Expenses
        </Text>
      </View>
      <ScrollView>
        {sampleExpenses.map((item, index) => {
          return <ExpenseList data={item} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default ExpensesRoute;
