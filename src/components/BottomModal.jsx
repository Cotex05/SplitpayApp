import {View, Text, Modal, Pressable, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import {darkColors, lightColors} from '../constants/colors';
import ModalStyle from '../styles/ModalStyle';
import currency from '../constants/currency';
import {ErrorActionButton, SuccessActionButton} from './Buttons';

const BottomModal = ({modalVisible, setModalVisible, data}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={ModalStyle.centeredView}>
        <View style={ModalStyle.modalView}>
          <Text style={{color: colors.header, fontSize: 28, fontWeight: 600}}>
            Settle Up
          </Text>
          <View style={{margin: 10, padding: 20}}>
            <Text style={{color: colors.white, fontSize: 24, fontWeight: 500}}>
              Pay{'  '}
              <Text style={{color: colors.tertiary, fontSize: 30}}>
                {currency.symbol}
                {data.amount}{' '}
              </Text>{' '}
              to {data.payee}
            </Text>
          </View>
          <SuccessActionButton
            title="Pay"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <ErrorActionButton
            title="Close"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
