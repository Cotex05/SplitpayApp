/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';
import DatePicker from 'react-native-date-picker';
import {AccentActionButton, MutedActionButton} from '../../components/Buttons';

const ExpenseManager = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Mark', value: '@mark'},
    {label: 'Tyson', value: '@tyson'},
    {label: 'Mike Guth', value: '@mike_guth'},
  ]);

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.primary}
        />
        <View style={{padding: 20, backgroundColor: colors.primary}}>
          <View style={GlobalStyle.justifyBetweenRow}>
            <Text
              style={{
                marginHorizontal: 20,
                color: colors.header,
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Add Expense
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingVertical: 5, marginRight: 10}}>
              <Ionicons name="close" color={colors.header} size={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 5,
              marginTop: 20,
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
            />
          </View>
        </View>
        <View style={{backgroundColor: colors.background}}>
          <View
            style={{
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <TextInput
              style={{
                height: 50,
                width: Dimensions.get('screen').width - 20,
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
              keyboardType="numeric"
              value={amount}
            />
            <Text style={{color: colors.muted, padding: 2}}>
              This amount will be splitted equally including you
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
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
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
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
              padding: 10,
            }}>
            <Text
              style={{
                padding: 5,
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
                width: Dimensions.get('screen').width - 20,
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
            onConfirm={date => {
              setOpenDate(false);
              setDate(date);
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
            title="Close"
            onPress={() => navigation.goBack()}
          />
          <AccentActionButton
            title="Save"
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ExpenseManager;
