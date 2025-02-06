/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Image,
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
import {darkColors, lightColors} from '../../constants/colors';
import currency from '../../constants/currency';
import GlobalStyle from '../../styles/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers} from '../../slices/userSlices';
import {APP_NAME} from '../../constants/names';

const TransactionList = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity activeOpacity={0.75}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.background,
          height: 70,
          marginHorizontal: 10,
          padding: 5,
        }}>
        <View style={{display: 'flex', flexDirection: 'row', marginLeft: 10}}>
          <Ionicons name="wallet-outline" size={40} color={colors.tertiary} />
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
                fontSize: 20,
              }}>
              Rent & Bills
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Flat Group
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={{
              color: colors.red,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            - {currency.symbol}273
          </Text>
          <Text
            style={{
              display: 'flex',
              color: 'gray',
              fontWeight: 300,
              paddingVertical: 5,
              fontSize: 12,
            }}>
            21/01/25
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
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
      <View
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 10,
        }}>
        <View>
          <View style={GlobalStyle.justifyBetweenRow}>
            <View style={{padding: 5, margin: 5}}>
              <Text
                style={{fontSize: 24, fontWeight: 300, color: colors.tertiary}}>
                Welcome back
              </Text>
              <Text
                style={{fontSize: 20, fontWeight: 700, color: colors.tertiary}}>
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
        <View style={[{marginHorizontal: 20}, GlobalStyle.justifyBetweenRow]}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              height: 150,
              width: 150,
              margin: 10,
              borderWidth: 10,
              paddingTop: 10,
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
              {currency.symbol}4989
            </Text>
            <Text
              style={{
                color: colors.header,
                fontSize: 14,
                fontFamily: 'sans-serif',
                marginTop: 5,
              }}>
              Expenditure
            </Text>
          </View>
          <View style={{padding: 20, alignItems: 'flex-start'}}>
            <Text style={{color: colors.white, fontSize: 20, fontWeight: 500}}>
              Connected with
            </Text>
            <View style={GlobalStyle.justifyBetweenRow}>
              <Text
                style={{color: colors.tertiary, fontSize: 26, fontWeight: 600}}>
                4{' '}
              </Text>
              <Text
                style={{color: colors.header, fontSize: 22, fontWeight: 400}}>
                Groups
              </Text>
            </View>
            <View style={GlobalStyle.justifyBetweenRow}>
              <Text
                style={{color: colors.tertiary, fontSize: 26, fontWeight: 600}}>
                13{' '}
              </Text>
              <Text
                style={{color: colors.header, fontSize: 22, fontWeight: 400}}>
                Members
              </Text>
            </View>
          </View>
        </View>
      </View>
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
          (item, index) => {
            return <TransactionList key={index} />;
          },
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
