import React, {useState} from 'react';
import {
  Dimensions,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors, lightColors} from '../../../constants/colors';
import GlobalStyle from '../../../styles/GlobalStyle';

const MyUPIsScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [primaryUPI, setPrimaryUPI] = useState('john.doe@oksbi');

  const [secondaryUPI, setSecondaryUPI] = useState('');

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
              My UPIs
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
          margin: 12,
        }}>
        <Text
          style={{
            padding: 5,
            color: colors.text,
            fontSize: 20,
            fontWeight: 600,
          }}>
          Secondary UPI Id
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
          onChangeText={setSecondaryUPI}
          placeholder="Enter UPI"
          value={secondaryUPI}
          keyboardType="email-address"
        />
      </View>

      <View
        style={[
          GlobalStyle.justifyCenterRow,
          {position: 'absolute', bottom: 50, alignSelf: 'center'},
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
          style={{
            width: 100,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            borderWidth: 2,
            borderColor: colors.red,
            borderRadius: 10,
          }}>
          <Text style={{color: colors.red, fontWeight: 'bold', fontSize: 25}}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
          style={{
            width: 100,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            backgroundColor: colors.accent,
            borderWidth: 2,
            borderColor: colors.accent,
            borderRadius: 10,
          }}>
          <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 25}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default MyUPIsScreen;
