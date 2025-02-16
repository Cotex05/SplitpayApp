/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {darkColors, lightColors} from '../../../constants/colors';
import currency from '../../../constants/currency';
import {fetchGroupExpenses} from '../../../slices/expenseSlice';

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
              {data?.description}
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              {data?.paidBy?.fullName}
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
            {data?.amount}
          </Text>
          <Text
            style={{
              display: 'flex',
              color: 'gray',
              fontWeight: 300,
              fontSize: 12,
            }}>
            {new Date(data?.createdAt).toLocaleDateString('en-GB')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ExpensesRoute = ({data}) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getGroupExpenses();
    setRefreshing(false);
  }, []);

  const dispatch = useDispatch();
  const {expenses, expenseLoading, expenseError, expenseSuccessMessage} =
    useSelector(state => state.expense);

  const getGroupExpenses = async () => {
    try {
      const result = await dispatch(fetchGroupExpenses(data?.groupId));

      console.log('result from getGroupExpenses', result);
      if (fetchGroupExpenses.fulfilled.match(result)) {
        console.log('Group Expenses fetched fulfilled!');
        console.log('Expenses ', expenses);
      } else {
        console.log('Group expenses fetching failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupExpenses();
  }, []);

  if (expenseLoading) {
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
          {expenses.length == 0 ? (
            <Text
              style={{
                color: colors.muted,
                fontSize: 18,
                padding: 12,
                alignSelf: 'center',
              }}>
              No expenses yet!
            </Text>
          ) : null}
          {expenses.map((item, index) => {
            return <ExpenseList data={item} key={index} />;
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ExpensesRoute;
