/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {darkColors, lightColors} from '../../constants/colors';
import currency from '../../constants/currency';
import {APP_NAME} from '../../constants/names';
import GlobalStyle from '../../styles/GlobalStyle';
import {fetchUserExpenseStats} from '../../slices/expenseSlice';
import ExpenseChart from './components/ExpenseChart';

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getUserExpenseStats();
    setRefreshing(false);
  }, []);

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const {expenseStats} = useSelector(state => state.expense);

  const getUserExpenseStats = async () => {
    try {
      const result = await dispatch(fetchUserExpenseStats());

      console.log('Result from getUserExpenseStats', result);
      if (fetchUserExpenseStats.fulfilled.match(result)) {
        console.log('User Expense stats fetched fulfilled!');
      } else {
        console.log('Expense stats fetching failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserExpenseStats();
    setTimeout(() => {
      console.log(user);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.primary,
          alignItems: 'center',
          height: 60,
        }}>
        <View>
          <Text
            style={{
              paddingHorizontal: 10,
              fontFamily: 'monospace',
              color: colors.header,
              fontWeight: 'bold',
              letterSpacing: 1,
              fontSize: 32,
              marginLeft: 10,
            }}>
            {APP_NAME}
          </Text>
        </View>
        <TouchableOpacity style={{padding: 5, marginHorizontal: 10}}>
          <Ionicons
            name="notifications-outline"
            color={colors.header}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: colors.primary}}>
        <View
          style={{
            // backgroundColor: colors.primary,
            paddingHorizontal: 10,
          }}>
          <View>
            <View style={GlobalStyle.justifyBetweenRow}>
              <View style={{padding: 5, margin: 5}}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 300,
                    color: colors.tertiary,
                  }}>
                  Welcome back
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: colors.tertiary,
                  }}>
                  {user?.username}
                </Text>
              </View>
              <View>
                <Image
                  rounded
                  style={{
                    marginHorizontal: 10,
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    alignSelf: 'center',
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: colors.tertiary,
                  }}
                  source={{
                    uri: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              {marginHorizontal: 10, paddingBottom: 10},
              GlobalStyle.justifyBetweenRow,
            ]}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                height: 140,
                width: 140,
                margin: 5,
                borderWidth: 5,
                paddingTop: 5,
                borderColor: colors.tertiary,
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: 1,
                }}>
                {currency.symbol}
                {expenseStats?.totalAmountSpent}
              </Text>
              <Text
                style={{
                  color: colors.header,
                  fontSize: 14,
                  fontFamily: 'sans-serif',
                  marginTop: 5,
                }}>
                Spent by you
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                height: 120,
                padding: 10,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textDecorationLine: 'underline',
                }}>
                Final Balance
              </Text>
              <View style={GlobalStyle.justifyBetweenRow}>
                <Text
                  style={{color: colors.header, fontSize: 20, fontWeight: 400}}>
                  Recieve{' '}
                </Text>
                <Text
                  style={{
                    color: colors.tertiary,
                    fontSize: 20,
                    fontWeight: 600,
                  }}>
                  {currency.symbol} {expenseStats?.totalAmountIn}
                </Text>
              </View>
              <View style={GlobalStyle.justifyBetweenRow}>
                <Text
                  style={{color: colors.header, fontSize: 20, fontWeight: 400}}>
                  To Pay{'   '}
                </Text>
                <Text
                  style={{color: colors.red, fontSize: 20, fontWeight: 600}}>
                  {currency.symbol} {expenseStats?.totalAmountOut}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 12}}>
          <ExpenseChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
