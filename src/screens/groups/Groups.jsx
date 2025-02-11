/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
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
import CenterModal from '../../components/CenterModal';
import {useDispatch, useSelector} from 'react-redux';
import {userGroups} from '../../slices/groupSlice';

const sampleGroups = [
  {
    groupName: 'ABC',
    membersCount: 5,
  },
  {
    groupName: 'Group 1',
    membersCount: 3,
  },
  {
    groupName: 'XYZ',
    membersCount: 2,
  },
  {
    groupName: 'Flat Room',
    membersCount: 4,
  },
];

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
              uri: 'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png',
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
                fontSize: 15,
              }}>
              3 members
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            width: 50,
            height: 30,
            borderRadius: 20,
            backgroundColor: colors.header,
          }}>
          <Text
            style={{
              color: colors.success,
              fontWeight: 600,
              fontSize: 16,
            }}>
            New
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Groups = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {groups, loading, error, successMessage} = useSelector(
    state => state.group,
  );

  const fetchGroups = async () => {
    try {
      const result = await dispatch(userGroups());

      console.log('result from fetchGroups', result);
      if (userGroups.fulfilled.match(result)) {
        console.log('User groups fetched fulfilled!');
        console.log('groups', groups);
      } else {
        Alert.alert(result.payload?.error, result.payload?.message);
        console.log('User groups fetching failed:', result.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

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
          <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              color={colors.header}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {groups.map((item, index) => {
          return <GroupList data={item} key={index} />;
        })}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => setModalVisible(true)}
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
      <CenterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default Groups;
