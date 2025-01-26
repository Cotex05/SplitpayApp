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

const ExpenseList = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => navigation.navigate('Expense')}>
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
              Food and Juice
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              John Doe
            </Text>
          </View>
        </View>
        <View
          style={{display: 'flex', justifyContent: 'center', marginRight: 10}}>
          <Text
            style={{
              color: colors.green,
              padding: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {currency.symbol}100
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return <ExpenseList key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default ExpensesRoute;
