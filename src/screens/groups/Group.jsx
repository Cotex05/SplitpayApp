/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {Suspense, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
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

import {MenuView} from '@react-native-menu/menu';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGroupInfo, fetchGroupMembers} from '../../slices/groupInfoSlice';
import LoadingBox from '../../components/LoadingBox';
import {APP_NAME} from '../../constants/names';
import OverviewRoute from './routes/OverviewRoute';
import ExpensesRoute from './routes/ExpensesRoute';
import SettlementsRoute from './routes/SettementsRoute';

// To optimize for faster loading
// const SettlementsRoute = React.lazy(() => import('./routes/SettementsRoute'));
// const ExpensesRoute = React.lazy(() => import('./routes/ExpensesRoute'));
// const OverviewRoute = React.lazy(() => import('./routes/OverviewRoute'));

const routes = [
  {key: 'first', title: 'Overview'},
  {key: 'second', title: 'Expenses'},
  {key: 'third', title: 'Settlements'},
];

const Group = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {data} = route.params;

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const menuRef = useRef(null);

  const handleGroupMembers = () => {
    navigation.navigate('GroupMembers', {
      membersData: groupMembers,
      groupData: data,
    });
  };

  const handleGroupEdit = () => {};

  const handleGroupInvite = async () => {
    try {
      const result = await Share.share({
        message: `Hey! Join our group ${data?.groupName} on ${APP_NAME} using invite code "${data?.groupCode}"`,
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
        console.log('Group info fetching failed:', result1.payload);
      }

      const result2 = await dispatch(fetchGroupMembers(data?.groupId));

      console.log('result2 from fetchGroupData', result2);
      if (fetchGroupMembers.fulfilled.match(result2)) {
        console.log('Group members fetched fulfilled!');
        console.log('groupMembers', groupMembers);
      } else {
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
        return <SettlementsRoute data={data} />;
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<LoadingBox />}>
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
                style={{paddingVertical: 5, marginRight: 5, maxWidth: 20}}>
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
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  maxWidth: Dimensions.get('screen').width * 0.7,
                }}>
                {data?.groupName}
              </Text>
            </View>
            <View>
              <MenuView
                ref={menuRef}
                title="Menu"
                onPressAction={({nativeEvent}) => {
                  if (nativeEvent.event == 'members') {
                    handleGroupMembers();
                  } else if (nativeEvent.event == 'invite') {
                    handleGroupInvite();
                  } else if (nativeEvent.event == 'edit') {
                    handleGroupEdit();
                  }
                }}
                actions={[
                  {
                    id: 'members',
                    title: 'Members',
                    titleColor: colors.text,
                  },
                  {
                    id: 'invite',
                    title: 'Invite',
                    titleColor: colors.text,
                  },
                  {
                    id: 'edit',
                    title: 'Edit group',
                    titleColor: colors.muted,
                  },
                ]}
                shouldOpenOnLongPress={false}>
                <TouchableOpacity style={{minWidth: 30}}>
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
          <>
            <TabView
              renderTabBar={renderTabBar}
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
            />
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() =>
                navigation.navigate('ExpenseManager', {data: data})
              }
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
          </>
        )}
      </SafeAreaView>
    </Suspense>
  );
};

export default Group;
