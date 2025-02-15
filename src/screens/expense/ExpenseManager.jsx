/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {AccentActionButton, MutedActionButton} from '../../components/Buttons';
import {showToastWithGravity} from '../../components/native/AndroidComponents';
import {darkColors, lightColors} from '../../constants/colors';
import {saveExpense} from '../../slices/expenseManagerSlice';
import {
  fetchExpenseCashFlow,
  fetchGroupExpenses,
  fetchUserExpenseStats,
} from '../../slices/expenseSlice';
import GlobalStyle from '../../styles/GlobalStyle';
import {fetchUserGroupBalanceGraph} from '../../slices/balanceSlice';
import {fetchUserWeeklyExpenseStats} from '../../slices/statsSlice';

const ExpenseManager = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {data} = route.params;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [sharedMembers, setSharedMembers] = useState([]);
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [openDate, setOpenDate] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const dispatch = useDispatch();

  const {groupMembers} = useSelector(state => state.groupInfo);
  const {response, expenseSaving, expenseError, expenseSuccessMessage} =
    useSelector(state => state.expenseManager);

  const handleAddExpense = async () => {
    if (
      amount.trim().length < 1 ||
      Math.round(amount) == 0 ||
      title.trim().length < 3
    ) {
      Alert.alert(
        'Invalid expense!',
        'Please enter a valid expense title and amount',
      );
      return;
    }

    try {
      const expenseRequest = {
        groupId: data?.groupId,
        expenseData: {
          amount: parseFloat(amount),
          description: title,
          sharedUsers: selectedMembers,
          createdAt: date.toISOString(),
        },
      };
      console.log(expenseRequest);
      const resultAction = await dispatch(saveExpense(expenseRequest));

      console.log('Result from handleAddExpense', resultAction);
      if (saveExpense.fulfilled.match(resultAction)) {
        showToastWithGravity(`Expense Saved!`);
        dispatch(fetchGroupExpenses(data?.groupId));
        dispatch(fetchUserGroupBalanceGraph(data?.groupId));
        dispatch(fetchExpenseCashFlow(data?.groupId));
        dispatch(fetchUserExpenseStats());
        navigation.goBack();
      } else {
        console.log('Failed to save expense:', resultAction.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  const populateMembersToSplit = () => {
    const people = [];
    groupMembers.map(member => {
      people.push({
        label: member?.username,
        value: member?.userId,
      });
    });
    setSharedMembers(people);
  };

  useEffect(() => {
    populateMembersToSplit();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.primary}
        />
        <View style={{padding: 10, backgroundColor: colors.primary}}>
          <View style={GlobalStyle.justifyBetweenRow}>
            <View style={GlobalStyle.justifyCenterRow}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{paddingVertical: 5, marginRight: 5, maxWidth: 20}}>
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
                  fontSize: 25,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Add Expense
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleAddExpense}
              style={{
                minWidth: 80,
                paddingVertical: 5,
                marginRight: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {expenseSaving ? (
                <>
                  <ActivityIndicator color={colors.tertiary} size="large" />
                  <Text style={{color: colors.tertiary, fontSize: 20}}>
                    Saving
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="save-outline"
                    color={colors.tertiary}
                    size={30}
                  />
                  <Text style={{color: colors.tertiary, fontSize: 20}}>
                    Save
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 5,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: Dimensions.get('window').width,
            }}>
            <TextInput
              style={{
                height: 50,
                margin: 12,
                width: '100%',
                borderRadius: 10,
                borderBottomWidth: 2,
                padding: 10,
                borderColor: colors.muted,
                color: colors.header,
                fontSize: 20,
              }}
              autoFocus={true}
              placeholder="Enter expense title"
              placeholderTextColor={colors.muted}
              onChangeText={setTitle}
              value={title}
              maxLength={40}
            />
          </View>
        </View>
        <View
          style={{backgroundColor: colors.background, marginHorizontal: 20}}>
          <View
            style={{
              marginVertical: 16,
            }}>
            <TextInput
              style={{
                height: 50,
                width: Dimensions.get('screen').width * 0.9,
                borderRadius: 10,
                borderWidth: 2,
                padding: 10,
                borderColor: colors.muted,
                color: colors.text,
                fontSize: 18,
              }}
              placeholderTextColor={colors.muted}
              onChangeText={setAmount}
              placeholder="Amount"
              keyboardType="number-pad"
              value={amount}
              maxLength={10}
            />
            <Text style={{color: colors.muted, padding: 2}}>
              This amount will be splitted equally
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width * 0.9,
            }}>
            <Text
              style={{
                padding: 5,
                color: colors.text,
                fontSize: 20,
                fontWeight: 600,
              }}>
              Split between
            </Text>
            <DropDownPicker
              style={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: colors.muted,
                color: colors.text,
                fontSize: 18,
                backgroundColor: colors.background,
              }}
              containerStyle={{
                backgroundColor: colors.background,
              }}
              placeholder="Select people"
              open={open}
              value={selectedMembers}
              items={sharedMembers}
              setOpen={setOpen}
              setValue={setSelectedMembers}
              setItems={setSharedMembers}
              theme={isDarkMode ? 'DARK' : 'LIGHT'}
              multiple={true}
              mode="BADGE"
              badgeDotColors={[colors.secondary]}
            />
            <Text style={{color: colors.muted, padding: 2}}>
              Add people whom you want to split
            </Text>
          </View>
          <View
            style={{
              width: Dimensions.get('screen').width * 0.9,
            }}>
            <Text
              style={{
                padding: 10,
                color: colors.text,
                fontSize: 20,
                fontWeight: 600,
              }}>
              Expense date
            </Text>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setOpenDate(true)}
              style={{
                height: 50,
                borderRadius: 10,
                borderWidth: 2,
                padding: 10,
                borderColor: colors.muted,
              }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                }}>
                {date.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            open={openDate}
            date={date}
            mode="date"
            maximumDate={new Date()}
            onConfirm={selectedDate => {
              setOpenDate(false);
              setDate(selectedDate);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
        </View>
        <View
          style={{
            marginVertical: 100,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <MutedActionButton
            title="Cancel"
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ExpenseManager;
