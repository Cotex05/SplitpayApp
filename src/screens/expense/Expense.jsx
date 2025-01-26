/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import currency from '../../constants/currency';

const sampleDetails = [
  {
    title: 'Amount',
    value: `${currency.symbol} 100`,
  },
  {
    title: 'Currency',
    value: currency.abbreviation,
  },

  {
    title: 'Paid By',
    value: 'John Doe',
  },

  {
    title: 'For',
    value: 'All',
  },

  {
    title: 'Created on',
    value: '15/01/2025',
  },
];

const ExpenseList = ({title, value}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;
  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: colors.background,
        padding: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.muted,
      }}>
      <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
        {title}
      </Text>
      <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
        {value}
      </Text>
    </View>
  );
};

const Expense = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View style={{padding: 20, backgroundColor: colors.primary}}>
        <View style={GlobalStyle.justifyBetweenRow}>
          <View style={GlobalStyle.justifyCenterRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingVertical: 5, marginRight: 10}}>
              <Ionicons
                name="chevron-back-outline"
                color={colors.header}
                size={30}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginHorizontal: 20,
                color: colors.header,
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Expense
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-vertical"
                color={colors.header}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 5,
            marginTop: 20,
            alignItems: 'center',
            maxWidth: Dimensions.get('window').width,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: colors.white,
              borderRadius: 50,
              padding: 5,
              margin: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.tertiary,
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              {currency.symbol}
            </Text>
          </View>
          <Text
            style={{
              color: colors.white,
              fontSize: 25,
              fontWeight: 400,
              textAlign: 'center',
              marginLeft: 20,
            }}>
            Dinner at restaurant
          </Text>
        </View>
      </View>
      {sampleDetails.map((item, ind) => {
        return <ExpenseList key={ind} title={item.title} value={item.value} />;
      })}
      <View
        style={{
          marginVertical: 100,
          display: 'flex',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 100,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.muted, fontWeight: 'bold', fontSize: 20}}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Expense;
