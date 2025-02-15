import {
  View,
  Text,
  ActivityIndicator,
  useColorScheme,
  Modal,
  Dimensions,
} from 'react-native';
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

const LoadingModalBox = ({
  modalVisible,
  setModalVisible,
  message = 'Loading...',
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: Dimensions.get('screen').width * 0.8,
            height: 150,
            margin: 20,
            backgroundColor: darkColors.primary,
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            elevation: 5,
          }}>
          <View>
            <ActivityIndicator size="large" color={colors.tertiary} />
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: 500,
                padding: 20,
              }}>
              {message}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingBox;

export {LoadingModalBox};
