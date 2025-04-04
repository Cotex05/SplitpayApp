/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MutedActionButton} from '../../components/Buttons';
import {darkColors, lightColors} from '../../constants/colors';
import currency from '../../constants/currency';
import GlobalStyle from '../../styles/GlobalStyle';

const SettledTransaction = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {data, cashFlow} = route.params;

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
            padding: 10,
            marginTop: 10,
            alignItems: 'center',
            maxWidth: Dimensions.get('window').width,
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              fontWeight: 400,
              textAlign: 'center',
              width: Dimensions.get('window').width * 0.3,
            }}>
            {cashFlow == 'IN' ? data?.payer?.fullName : 'You'}
          </Text>
          <View style={{width: 40}}>
            <Ionicons
              name={'arrow-forward'}
              size={40}
              color={cashFlow == 'IN' ? colors.green : colors.red}
            />
          </View>

          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              fontWeight: 400,
              textAlign: 'center',
              width: Dimensions.get('window').width * 0.3,
            }}>
            {cashFlow == 'IN' ? 'You' : data?.payee?.fullName}
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
          {currency.symbol} {data?.amount}
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
          {cashFlow == 'IN' ? data?.payer?.fullName : 'You'}
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
          {new Date(data?.paymentDate).toLocaleDateString('en-GB')}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 100,
          display: 'flex',
          alignItems: 'center',
        }}>
        <MutedActionButton title="Close" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

export default SettledTransaction;
