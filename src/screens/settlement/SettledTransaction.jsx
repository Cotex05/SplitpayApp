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

const SettledTransaction = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {data} = route.params;

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
              Transaction
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 20,
            marginTop: 10,
            alignItems: 'center',
            maxWidth: Dimensions.get('window').width,
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 25,
              fontWeight: 400,
            }}>
            {data.payer == 'John' ? 'You' : data.payer}
          </Text>
          <View>
            <Ionicons
              name={'arrow-forward'}
              size={40}
              color={data.cashFlow == 'IN' ? colors.green : colors.red}
            />
          </View>

          <Text
            style={{
              color: colors.white,
              fontSize: 25,
              fontWeight: 400,
            }}>
            {data.payee == 'John' ? 'You' : data.payee}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          backgroundColor: colors.background,
          padding: 15,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: colors.muted,
        }}>
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          Amount
        </Text>
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          {currency.symbol} {data.amount}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          backgroundColor: colors.background,
          padding: 15,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: colors.muted,
        }}>
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          Currency
        </Text>
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          {currency.abbreviation}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          backgroundColor: colors.background,
          padding: 15,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: colors.muted,
        }}>
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          Paid By
        </Text>
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          {data.payer}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          backgroundColor: colors.background,
          padding: 15,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: colors.muted,
        }}>
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          Paid On
        </Text>
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          {data.date}
        </Text>
      </View>
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

export default SettledTransaction;
