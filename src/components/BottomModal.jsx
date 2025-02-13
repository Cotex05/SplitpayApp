import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {darkColors, lightColors} from '../constants/colors';
import currency from '../constants/currency';
import {createPayment, fetchUserPaymentsInGroup} from '../slices/paymentSlice';
import ModalStyle from '../styles/ModalStyle';
import {ErrorActionButton, SuccessActionButton} from './Buttons';
import {fetchUserGroupBalanceGraph} from '../slices/balanceSlice';
import {fetchExpenseCashFlow} from '../slices/expenseSlice';
import {showToastWithGravity} from './native/AndroidComponents';

const BottomModal = ({modalVisible, setModalVisible, data, groupData}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const dispatch = useDispatch();

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const {response, paymentLoading, paymentError, paymentSuccessMessage} =
    useSelector(state => state.payment);

  const processPayment = async paymentMethod => {
    try {
      const request = {
        groupId: groupData?.groupId,
        payeeId: data?.payee?.userId,
        amount: data?.amount,
        paymentChannelType: paymentMethod,
      };

      console.log('Request: ', request);

      const result = await dispatch(createPayment(request));

      console.log('Result from processPayment', result);
      if (createPayment.fulfilled.match(result)) {
        console.log('Payment process fulfilled!');
        showToastWithGravity('Payment successful!');
      } else {
        console.log('Payments processing failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async paymentMethod => {
    await processPayment(paymentMethod);
    dispatch(fetchUserGroupBalanceGraph(groupData?.groupId));
    dispatch(fetchExpenseCashFlow(groupData?.groupId));
    dispatch(fetchUserPaymentsInGroup(groupData?.groupId));
    setModalVisible(false);
    setPaymentProcessing(false);
  };

  const handlePaymentMethodSelection = () => {
    setPaymentProcessing(true);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={ModalStyle.centeredView}>
        <View style={ModalStyle.modalView}>
          {paymentProcessing ? (
            paymentLoading ? (
              <View>
                <ActivityIndicator size={'large'} color={colors.tertiary} />
              </View>
            ) : (
              <>
                <Text
                  style={{
                    color: colors.header,
                    fontSize: 22,
                    fontWeight: 600,
                    padding: 12,
                  }}>
                  Select payment method
                </Text>
                <View>
                  <SuccessActionButton
                    title="UPI"
                    onPress={() => handlePayment('UPI')}
                    loading={paymentLoading}
                  />
                  <SuccessActionButton
                    title="Paid by cash"
                    onPress={() => handlePayment('CASH')}
                    loading={paymentLoading}
                  />
                  <ErrorActionButton
                    title="Cancel"
                    onPress={() => {
                      setModalVisible(false);
                      setPaymentProcessing(false);
                    }}
                  />
                </View>
              </>
            )
          ) : (
            <>
              <Text
                style={{color: colors.header, fontSize: 28, fontWeight: 600}}>
                Settle Up
              </Text>
              <View
                style={{
                  margin: 10,
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 24,
                    fontWeight: 500,
                    textAlign: 'center',
                  }}>
                  Pay{'  '}
                  <Text style={{color: colors.tertiary, fontSize: 30}}>
                    {currency.symbol}
                    {data?.amount}{' '}
                  </Text>{' '}
                  to {data?.payee?.username}
                </Text>
              </View>
              <SuccessActionButton
                title="Pay"
                onPress={handlePaymentMethodSelection}
                loading={paymentLoading}
              />
              <ErrorActionButton
                title="Cancel"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
