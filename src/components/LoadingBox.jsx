import {View, Text, ActivityIndicator, useColorScheme} from 'react-native';
import React from 'react';
import {darkColors, lightColors} from '../constants/colors';

const LoadingBox = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <ActivityIndicator size="large" color={colors.tertiary} />
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: 500,
          padding: 20,
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingBox;
