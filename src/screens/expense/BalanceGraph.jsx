/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomModal from '../../components/BottomModal';
import {darkColors, lightColors} from '../../constants/colors';
import currency from '../../constants/currency';
import GlobalStyle from '../../styles/GlobalStyle';
import {MutedActionButton} from '../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserGroupBalanceGraph} from '../../slices/balanceSlice';

const BalanceList = ({data, cashFlow, groupData}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [modalVisible, setModalVisible] = useState(false);

  const handleSettlementPayment = () => {
    if (cashFlow == 'OUT') {
      setModalVisible(true);
      return;
    }
    const title = `${data?.payer?.username} owe you`;
    const message = `Ask ${data?.payer?.username} to pay you ${currency.symbol}${data.amount} to settle up.`;
    Alert.alert(title, message);
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
      }}>
      <TouchableOpacity activeOpacity={0.75} onPress={handleSettlementPayment}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            marginHorizontal: 10,
            alignItems: 'center',
            maxWidth: Dimensions.get('window').width,
          }}>
          <View style={GlobalStyle.justifyCenterRow}>
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: 400,
              }}>
              {data?.payer?.username}
            </Text>
            <View style={{marginHorizontal: 20}}>
              <Ionicons
                name={'arrow-forward'}
                size={30}
                color={cashFlow == 'IN' ? colors.green : colors.red}
              />
            </View>
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: 400,
              }}>
              {data?.payee?.username}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                color: cashFlow == 'IN' ? colors.green : colors.red,
                fontWeight: 500,
              }}>
              {currency.symbol}
              {data?.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
        groupData={groupData}
      />
    </View>
  );
};

const BalanceGraph = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {data} = route.params;

  const dispatch = useDispatch();

  const {balanceGraph, balanceLoading, balanceError, balanceSuccessMessage} =
    useSelector(state => state.balance);

  const getUserGroupBalanceGraph = async () => {
    try {
      const result = await dispatch(fetchUserGroupBalanceGraph(data?.groupId));

      console.log('Result from getUserGroupBalanceGraph', result);
      if (fetchUserGroupBalanceGraph.fulfilled.match(result)) {
        console.log('Group balanceGraph fetched fulfilled!');
        console.log('BalanceGraph ', balanceGraph);
      } else {
        console.log('BalanceGraph fetching failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserGroupBalanceGraph();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View style={{padding: 10, backgroundColor: colors.primary}}>
        <View style={GlobalStyle.justifyBetweenRow}>
          <Text
            style={{
              marginHorizontal: 10,
              color: colors.header,
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Balance
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingVertical: 5}}>
            <Ionicons name="close" color={colors.header} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 5,
            margin: 10,
            alignItems: 'center',
            maxWidth: Dimensions.get('window').width,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: colors.text,
              fontSize: 30,
              fontWeight: 600,
              textAlign: 'center',
              marginLeft: 20,
            }}>
            {data?.groupName}
          </Text>
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
              fontSize: 22,
            }}>
            You Receive
          </Text>
        </View>
        {balanceGraph?.toReceive.length == 0 ? (
          <Text
            style={{
              display: 'flex',
              color: colors.muted,
              padding: 10,
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            No balance to receive
          </Text>
        ) : (
          balanceGraph?.toReceive.map((item, ind) => {
            return <BalanceList cashFlow="IN" data={item} key={ind} />;
          })
        )}
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
              fontSize: 22,
            }}>
            You Pay
          </Text>
        </View>
        {balanceGraph?.toSend.length == 0 ? (
          <Text
            style={{
              display: 'flex',
              color: colors.muted,
              padding: 10,
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            Nothing to pay
          </Text>
        ) : (
          balanceGraph?.toSend.map((item, ind) => {
            return (
              <BalanceList
                cashFlow="OUT"
                data={item}
                key={ind}
                groupData={data}
              />
            );
          })
        )}
        <View
          style={{
            marginVertical: 100,
            display: 'flex',
            alignItems: 'center',
          }}>
          <MutedActionButton
            title="Close"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BalanceGraph;
