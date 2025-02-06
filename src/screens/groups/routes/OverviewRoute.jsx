/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {darkColors, lightColors} from '../../../constants/colors';
import currency from '../../../constants/currency';
import GlobalStyle from '../../../styles/GlobalStyle';
import {showToastWithGravity} from '../../../components/native/AndroidComponents';

const sampleMembers = [
  {
    name: 'Mike Guth',
    username: 'mike_guth',
    amount: 50,
    owed: false,
  },
  {
    name: 'Mark',
    username: 'mark',
    amount: 50,
    owed: false,
  },
  {
    name: 'Tyson',
    username: 'tyson',
    amount: 25,
    owed: true,
  },
];

const MemberList = ({data}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const handleMemberPress = () => {
    const title = 'Balance';
    const oweMessage = `You owe ${currency.symbol}${data.amount} to ${data.name}`;
    const message = `${data.name} owe you ${currency.symbol}${data.amount}`;
    if (data.owed) {
      Alert.alert(title, oweMessage);
    } else {
      Alert.alert(title, message);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={handleMemberPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.background,
          height: 80,
          padding: 20,
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            rounded
            style={{
              width: 50,
              height: 50,
              alignSelf: 'center',
              borderRadius: 50,
            }}
            source={{
              uri: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png',
            }}
          />
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
                fontSize: 18,
              }}>
              {data.name}
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              @{data.username}
            </Text>
          </View>
        </View>
        <View style={GlobalStyle.justifyCenterRow}>
          <Text
            style={{
              color: data.owed ? colors.red : colors.green,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {data.owed ? '-' : '+'} {currency.symbol}
            {data.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OverviewRoute = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToastWithGravity('Refreshed!');
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('BalanceGraph')}>
        <View
          style={{
            height: 100,
            flexDirection: 'row',
            margin: 10,
            padding: 5,
            width: Dimensions.get('window').width - 40,
            alignSelf: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.green,
              flex: 0.7,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                padding: 10,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              + {currency.symbol}100
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.red,
              flex: 0.3,
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                display: 'flex',
                color: 'white',
                textAlign: 'center',
                padding: 10,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              - {currency.symbol}25
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
          Group Members
        </Text>
      </View>
      <ScrollView>
        {sampleMembers.map((item, index) => {
          return <MemberList data={item} key={index} />;
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default OverviewRoute;
