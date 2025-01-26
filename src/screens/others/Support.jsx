/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Support = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
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
            FAQ & Support
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingVertical: 5, marginRight: 10}}>
            <Ionicons name="close-outline" color={colors.header} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{padding: 15, margin: 10}}>
          <Text
            style={{
              color: colors.text,
              fontFamily: 'monospace',
              fontSize: 16,
              textAlign: 'justify',
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            {'\n\n'}
            The purpose of lorem ipsum is to create a natural looking block of
            text sentence, paragraph, page, etc. that doesn't distract from the
            layout. A practice not without controversy, laying out pages with
            meaningless filler text can be very useful when the focus is meant
            to be on design, not content.
          </Text>
        </View>
        <View
          style={{
            marginVertical: 60,
            display: 'flex',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 100,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{color: colors.muted, fontWeight: 'bold', fontSize: 25}}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Support;
