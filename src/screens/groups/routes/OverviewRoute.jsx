/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {darkColors, lightColors} from '../../../constants/colors';
import currency from '../../../constants/currency';
import GlobalStyle from '../../../styles/GlobalStyle';
import {showToastWithGravity} from '../../../components/native/AndroidComponents';
import {useDispatch, useSelector} from 'react-redux';
import {fetchExpenseCashFlow} from '../../../slices/expenseSlice';
import {fetchGroupMembers} from '../../../slices/groupInfoSlice';
import {fetchUserGroupBalanceGraph} from '../../../slices/balanceSlice';

const MemberList = ({data, cashFlow, navigationData}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const handleMemberPress = () => {
    const title = 'Balance';
    const oweMessage = `You owe ${currency.symbol}${data?.amount} to ${data?.payee?.fullName}`;
    const message = `${data?.payer?.fullName} owe you ${currency.symbol}${data?.amount}`;
    if (cashFlow == 'OUT') {
      showToastWithGravity(oweMessage);
    } else {
      showToastWithGravity(message);
    }
    navigation.navigate('BalanceGraph', {data: navigationData});
  };

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={handleMemberPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.background,
          height: 80,
          padding: 20,
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            rounded
            style={{
              width: 50,
              height: 50,
              alignSelf: 'center',
              borderRadius: 50,
            }}
            source={{
              uri: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png',
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
              {cashFlow == 'OUT'
                ? data?.payee?.fullName
                : data?.payer?.fullName}
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              @
              {cashFlow == 'OUT'
                ? data?.payee?.username
                : data?.payer?.username}
            </Text>
          </View>
        </View>
        <View style={GlobalStyle.justifyCenterRow}>
          <Text
            style={{
              color: cashFlow == 'OUT' ? colors.red : colors.green,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {cashFlow == 'OUT' ? '-' : '+'} {currency.symbol}
            {data?.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OverviewRoute = ({data}) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getExpenseCashFlow();
    await getUserGroupBalanceGraph();
    setRefreshing(false);
    showToastWithGravity('Refreshed!');
  }, []);

  const dispatch = useDispatch();
  const {groupData, groupMembers, loading, error, successMessage} = useSelector(
    state => state.groupInfo,
  );

  const {cashflow, expenseLoading, expenseError, expenseSuccessMessage} =
    useSelector(state => state.expense);

  const {balanceGraph, balanceLoading, balanceError, balanceSuccessMessage} =
    useSelector(state => state.balance);

  const getUserGroupBalanceGraph = async () => {
    try {
      const result = await dispatch(fetchUserGroupBalanceGraph(data?.groupId));

      console.log('Result from getUserGroupBalanceGraph', result);
      if (fetchUserGroupBalanceGraph.fulfilled.match(result)) {
        console.log('Group balanceGraph fetched fulfilled!');
        console.log('BalanceGraph ', balanceGraph);
      } else {
        console.log('BalanceGraph fetching failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getExpenseCashFlow = async () => {
    try {
      const result = await dispatch(fetchExpenseCashFlow(data?.groupId));

      console.log('result from getExpenseCashFlow', result);
      if (fetchExpenseCashFlow.fulfilled.match(result)) {
        console.log('Expense cashflow fetched fulfilled!');
        console.log('cashflow ', cashflow);
      } else {
        console.log('Expense cashflow fetching failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenseCashFlow();
    getUserGroupBalanceGraph();
  }, []);

  if (loading) {
    return (
      <View style={{padding: 12}}>
        <ActivityIndicator size="large" color={colors.tertiary} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('BalanceGraph', {data: data})}>
        <View
          style={{
            height: 100,
            flexDirection: 'row',
            margin: 10,
            padding: 5,
            width: Dimensions.get('window').width - 40,
            alignSelf: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.green,
              flex: 0.5,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                padding: 10,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              + {currency.symbol}
              {cashflow?.cashIn}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.red,
              flex: 0.5,
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                display: 'flex',
                color: 'white',
                textAlign: 'center',
                padding: 10,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              - {currency.symbol}
              {cashflow?.cashOut}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
          Expense Balance
        </Text>
      </View>
      <ScrollView>
        {balanceGraph?.toReceive.length == 0 &&
        balanceGraph?.toSend.length == 0 ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: 18,
              padding: 12,
              alignSelf: 'center',
            }}>
            All expenses are clear!
          </Text>
        ) : null}
        {balanceGraph?.toSend.map((item, index) => {
          return (
            <MemberList
              data={item}
              key={index}
              cashFlow="OUT"
              navigationData={data}
            />
          );
        })}
        {balanceGraph?.toReceive.map((item, index) => {
          return (
            <MemberList
              data={item}
              key={index}
              cashFlow="IN"
              navigationData={data}
            />
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default OverviewRoute;
