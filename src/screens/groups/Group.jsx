/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';

import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ExpensesRoute from './routes/ExpensesRoute';
import OverviewRoute from './routes/OverviewRoute';
import SettlementsRoute from './routes/SettementsRoute';
import {MenuView} from '@react-native-menu/menu';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGroupInfo, fetchGroupMembers} from '../../slices/groupInfoSlice';

const routes = [
  {key: 'first', title: 'Overview'},
  {key: 'second', title: 'Expenses'},
  {key: 'third', title: 'Settlements'},
];

const Group = ({route, navigation}) => {
  // const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {data} = route.params;

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const menuRef = useRef(null);

  const handleGroupClose = () => {
    console.log('pop menu closed!');
  };

  const handleGroupEdit = () => {};

  const handleGroupInvite = async () => {
    try {
      const result = await Share.share({
        message: `Invite people to this group!`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const dispatch = useDispatch();
  const {groupData, groupMembers, loading, error, successMessage} = useSelector(
    state => state.groupInfo,
  );

  const fetchGroupData = async () => {
    try {
      const result1 = await dispatch(fetchGroupInfo(data?.groupId));

      console.log('result1 from fetchGroupData', result1);
      if (fetchGroupInfo.fulfilled.match(result1)) {
        console.log('Group info fetched fulfilled!');
        console.log('groupData', groupData);
      } else {
        Alert.alert(result1.payload?.error, result1.payload?.message);
        console.log('Group info fetching failed:', result1.payload);
      }

      const result2 = await dispatch(fetchGroupMembers(data?.groupId));

      console.log('result2 from fetchGroupData', result2);
      if (fetchGroupMembers.fulfilled.match(result2)) {
        console.log('Group members fetched fulfilled!');
        console.log('groupMembers', groupMembers);
      } else {
        Alert.alert(result2.payload?.error, result2.payload?.message);
        console.log('Group members fetching failed:', result2.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, []);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: colors.tertiary}}
        style={{backgroundColor: colors.primary}}
      />
    );
  };

  // Dynamic renderScene function
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <OverviewRoute data={data} />;
      case 'second':
        return <ExpensesRoute data={data} />;
      case 'third':
        return <SettlementsRoute />;
      default:
        return null;
    }
  };

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
              {data?.groupName}
            </Text>
          </View>
          <View>
            <MenuView
              ref={menuRef}
              title="Menu"
              onPressAction={({nativeEvent}) => {
                if (nativeEvent.event == 'invite') {
                  handleGroupInvite();
                } else if (nativeEvent.event == 'edit') {
                  handleGroupEdit();
                } else if (nativeEvent.event == 'close') {
                  handleGroupClose();
                }
              }}
              actions={[
                {
                  id: 'invite',
                  title: 'Invite',
                  titleColor: colors.text,
                },
                {
                  id: 'edit',
                  title: 'Edit group',
                  titleColor: colors.text,
                },
                {
                  id: 'close',
                  title: 'Close',
                  titleColor: colors.text,
                },
              ]}
              shouldOpenOnLongPress={false}>
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-vertical"
                  color={colors.header}
                  size={24}
                />
              </TouchableOpacity>
            </MenuView>
          </View>
        </View>
      </View>
      {loading ? (
        <View style={{padding: 12}}>
          <ActivityIndicator size="large" color={colors.tertiary} />
        </View>
      ) : (
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('ExpenseManager', {data: data})}
        style={{
          backgroundColor: colors.primary,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 20,
          right: 15,
          width: 75,
          height: 75,
          borderRadius: 50,
        }}>
        <Ionicons name="wallet-outline" size={36} color={colors.header} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Group;
