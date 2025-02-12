/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import currency from '../../constants/currency';
import {MutedActionButton} from '../../components/Buttons';
import {MenuView} from '@react-native-menu/menu';
import {useDispatch, useSelector} from 'react-redux';
import {removeExpense} from '../../slices/expenseManagerSlice';
import {showToastWithGravity} from '../../components/native/AndroidComponents';
import {
  fetchExpenseCashFlow,
  fetchGroupExpenses,
} from '../../slices/expenseSlice';

const ExpenseList = ({title, value}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const showExpenseShareMembers = () => {
    let members = '';
    value.forEach(share => {
      members += share?.user?.username + ', ';
    });
    members = members.slice(0, members.length - 2);
    Alert.alert('Expense for: ', members);
  };

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
      {title == 'For' ? (
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={showExpenseShareMembers}>
          <Text style={{color: colors.tertiary, fontWeight: 600, fontSize: 20}}>
            View
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={{color: colors.dark, fontWeight: 600, fontSize: 20}}>
          {value}
        </Text>
      )}
    </View>
  );
};

const Expense = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {data} = route.params;

  const menuRef = useRef(null);

  const handleMenuClose = () => {
    console.log('pop menu closed!');
  };

  const dispatch = useDispatch();
  const {response, expenseRemoving, expenseError, expenseSuccessMessage} =
    useSelector(state => state.expenseManager);

  const handleExpenseDelete = async () => {
    try {
      const ids = {
        expenseId: data?.expenseId,
        groupId: data?.group?.groupId,
      };
      console.log(ids);
      const result = await dispatch(removeExpense(ids));

      console.log('Result from handleExpenseDelete', result);
      if (removeExpense.fulfilled.match(result)) {
        console.log('Expense removed fulfilled!');
        dispatch(fetchGroupExpenses(ids?.groupId));
        dispatch(fetchExpenseCashFlow(ids?.groupId));
        console.log('Removed expense ', response);
        showToastWithGravity('Expense removed!');
        navigation.goBack();
      } else {
        Alert.alert(
          result.payload?.error
            ? result.payload?.error
            : "Can't remove expense!",
          result.payload?.message,
        );
        console.log('Expense removing failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sampleDetails = [
    {
      title: 'Amount',
      value: `${currency.symbol} ${data?.amount}`,
    },
    {
      title: 'Currency',
      value: currency.abbreviation,
    },

    {
      title: 'Paid By',
      value: data?.paidBy?.username,
    },

    {
      title: 'For',
      value: data?.shares,
    },

    {
      title: 'Created on',
      value: new Date(data?.createdAt).toLocaleDateString('en-GB'),
    },
  ];

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
            <MenuView
              ref={menuRef}
              title="Menu"
              onPressAction={({nativeEvent}) => {
                if (nativeEvent.event == 'delete') {
                  handleExpenseDelete();
                } else if (nativeEvent.event == 'close') {
                  handleMenuClose();
                }
              }}
              actions={[
                {
                  id: 'delete',
                  title: 'Delete expense',
                  titleColor: colors.text,
                },
                {
                  id: 'close',
                  title: 'Close',
                  titleColor: colors.text,
                },
              ]}
              shouldOpenOnLongPress={false}>
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-vertical"
                  color={colors.header}
                  size={24}
                />
              </TouchableOpacity>
            </MenuView>
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
            <Ionicons name="basket" size={40} color={colors.accent} />
          </View>
          <Text
            style={{
              color: colors.white,
              fontSize: 25,
              fontWeight: 400,
              textAlign: 'center',
              marginLeft: 20,
            }}>
            {data?.description}
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
        <MutedActionButton title="Close" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

export default Expense;
