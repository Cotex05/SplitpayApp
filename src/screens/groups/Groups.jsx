/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors, lightColors} from '../../constants/colors';
import {
  CenterModalCreateGroup,
  CenterModalJoinGroup,
} from '../../components/CenterModal';
import {useDispatch, useSelector} from 'react-redux';
import {userGroups} from '../../slices/groupSlice';
import {MenuView} from '@react-native-menu/menu';

const GroupList = ({data}) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => navigation.navigate('Group', {data: data})}>
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
              uri: 'https://i.ibb.co/SX3BBmP7/default-Group-Profile.webp',
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
                fontSize: 20,
              }}>
              {data?.groupName}
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              @{data?.createdBy?.username}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: 2,
            width: 100,
            height: 30,
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: colors.muted,
              fontWeight: 600,
              fontSize: 12,
              textAlign: 'center',
            }}>
            {new Date(data?.createdAt).toLocaleDateString('en-GB')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Groups = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [joinGroupModalVisible, setJoinGroupModalVisible] = useState(false);

  const menuRef = useRef(null);

  const handleGroupJoin = async () => {
    setJoinGroupModalVisible(true);
  };

  const handleGroupRefresh = async () => {
    fetchGroups();
  };

  const dispatch = useDispatch();
  const {groups, loading, error, successMessage} = useSelector(
    state => state.group,
  );

  const {group} = useSelector(state => state.groupManager);

  const fetchGroups = async () => {
    try {
      const result = await dispatch(userGroups());

      console.log('result from fetchGroups', result);
      if (userGroups.fulfilled.match(result)) {
        console.log('User groups fetched fulfilled!');
        console.log('groups', groups);
      } else {
        console.log('User groups fetching failed:', result.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [group]);

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.primary,
          alignItems: 'center',
          height: 75,
          paddingHorizontal: 10,
        }}>
        <View>
          <Text
            style={{
              paddingHorizontal: 10,
              fontFamily: 'monospace',
              color: colors.header,
              fontWeight: 'bold',
              letterSpacing: 1,
              fontSize: 32,
              marginLeft: 10,
            }}>
            Groups
          </Text>
        </View>
        <View>
          <MenuView
            ref={menuRef}
            title="Menu"
            onPressAction={({nativeEvent}) => {
              if (nativeEvent.event == 'join') {
                handleGroupJoin();
              } else if (nativeEvent.event == 'refresh') {
                handleGroupRefresh();
              }
            }}
            actions={[
              {
                id: 'join',
                title: 'Join group',
                titleColor: colors.text,
              },
              {
                id: 'refresh',
                title: 'Refresh',
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
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color={colors.tertiary} />
        ) : groups.length == 0 ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: 18,
              padding: 12,
              alignSelf: 'center',
            }}>
            No groups yet!
          </Text>
        ) : null}
        {groups.map((item, index) => {
          return <GroupList data={item} key={index} />;
        })}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => setCreateGroupModalVisible(true)}
        style={{
          backgroundColor: colors.primary,
          position: 'absolute',
          zIndex: 999,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 25,
          right: 15,
          width: 75,
          height: 75,
          borderRadius: 50,
        }}>
        <Ionicons name="add" size={36} color={colors.header} />
      </TouchableOpacity>
      <CenterModalCreateGroup
        modalVisible={createGroupModalVisible}
        setModalVisible={setCreateGroupModalVisible}
      />
      <CenterModalJoinGroup
        modalVisible={joinGroupModalVisible}
        setModalVisible={setJoinGroupModalVisible}
      />
    </SafeAreaView>
  );
};

export default Groups;
