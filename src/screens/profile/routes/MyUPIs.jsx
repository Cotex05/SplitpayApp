import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors, lightColors} from '../../../constants/colors';
import GlobalStyle from '../../../styles/GlobalStyle';
import {AccentActionButton} from '../../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import {addUserUpi, fetchUserUpi} from '../../../slices/upiSlice';
import {showToastWithGravity} from '../../../components/native/AndroidComponents';

const MyUPIsScreen = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [primaryUPI, setPrimaryUPI] = useState('');
  const [loading, setLoading] = useState(false);

  const {userData} = route.params;

  const dispatch = useDispatch();

  const {upiDetails, upiLoading, upiError, upiSuccessMessage} = useSelector(
    state => state.upi,
  );

  const getUserUpiAddress = async () => {
    try {
      setLoading(true);
      const result = await dispatch(fetchUserUpi(userData?.username));

      console.log('Result from getUserUpiAddress', result);
      if (fetchUserUpi.fulfilled.match(result)) {
        const upi = result.payload[0]?.upiAddress;
        setPrimaryUPI(upi);
        console.log('User upi details fetched fulfilled!', upi);
      } else {
        console.log('Upi fetching failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addUpiAddress = async () => {
    try {
      console.log('From addUpiAddress(): ', upiDetails, primaryUPI);
      const result = await dispatch(addUserUpi({upiDetails, primaryUPI}));

      console.log('Result from addUpiAddress', result);
      if (addUserUpi.fulfilled.match(result)) {
        setPrimaryUPI(result.payload?.upiAddress);
        showToastWithGravity('UPI Saved!');
        console.log('UPI saving success!');
      } else {
        console.log('Upi adding failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpiSave = async () => {
    Keyboard.dismiss();
    await addUpiAddress();
  };

  useEffect(() => {
    getUserUpiAddress();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.primary}
        />
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
                UPI Address
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-vertical"
                  color={colors.header}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator color={colors.tertiary} size="large" />
        ) : (
          <>
            <View
              style={{
                margin: 12,
              }}>
              <Text
                style={{
                  padding: 5,
                  color: colors.text,
                  fontSize: 20,
                  fontWeight: 600,
                }}>
                Primary UPI Id
              </Text>
              <TextInput
                style={{
                  height: 50,
                  width: Dimensions.get('screen').width - 40,
                  borderRadius: 10,
                  borderWidth: 2,
                  padding: 10,
                  borderColor: colors.muted,
                  color: colors.text,
                  fontSize: 18,
                  fontWeight: 500,
                }}
                placeholderTextColor={colors.muted}
                onChangeText={setPrimaryUPI}
                placeholder="Enter UPI"
                value={primaryUPI}
                keyboardType="email-address"
              />
              <Text style={{color: colors.muted, padding: 2}}>
                You will receive the payment in this UPI Id
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                margin: 10,
              }}>
              <AccentActionButton
                title="Save"
                onPress={handleUpiSave}
                loading={upiLoading}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default MyUPIsScreen;
