/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserPaymentsInGroup} from '../../../slices/paymentSlice';

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

const TransactionList = ({data, currUser}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const cashFlow = currUser?.id == data?.payer?.userId ? 'OUT' : 'IN';

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() =>
        navigation.navigate('SettledTransaction', {
          data: data,
          cashFlow: cashFlow,
        })
      }>
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
            name={cashFlow == 'IN' ? 'arrow-forward' : 'arrow-back'}
            size={50}
            color={cashFlow == 'IN' ? colors.green : colors.red}
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
              {cashFlow == 'IN' ? data?.payer?.fullName : data?.payee?.fullName}
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 400,
                fontSize: 14,
              }}>
              {new Date(data?.paymentDate).toLocaleDateString('en-GB')}
            </Text>
          </View>
        </View>
        <View
          style={{display: 'flex', justifyContent: 'center', marginRight: 10}}>
          <Text
            style={{
              color: cashFlow == 'IN' ? colors.green : colors.red,
              padding: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {cashFlow == 'IN' ? '+ ' : '- '}
            {currency.symbol}
            {data?.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SettlementsRoute = ({data}) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const dispatch = useDispatch();
  const {payments, paymentLoading, paymentError, paymentSuccessMessage} =
    useSelector(state => state.payment);

  const {user} = useSelector(state => state.auth);

  const getUserPayementsInGroup = async () => {
    try {
      const result = await dispatch(fetchUserPaymentsInGroup(data?.groupId));

      console.log('Result from getUserPayementsInGroup', result);
      if (fetchUserPaymentsInGroup.fulfilled.match(result)) {
        console.log('Payments fetched fulfilled!');
      } else {
        console.log('Payments fetching failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPayementsInGroup();
  }, []);

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
          Your Payments
        </Text>
      </View>
      <ScrollView>
        {payments?.length == 0 ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: 18,
              padding: 12,
              alignSelf: 'center',
            }}>
            No payments yet!
          </Text>
        ) : null}
        {payments.map((item, index) => {
          return <TransactionList data={item} currUser={user} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default SettlementsRoute;
