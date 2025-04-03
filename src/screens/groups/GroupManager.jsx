/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {AccentActionButton} from '../../components/Buttons';
import {showToastWithGravity} from '../../components/native/AndroidComponents';
import {darkColors, lightColors} from '../../constants/colors';
import {
  addMultipleMembersToGroup,
  createGroup,
} from '../../slices/groupManagerSlice';
import {clearSearchUsers, searchUsers} from '../../slices/userSlices';
import GlobalStyle from '../../styles/GlobalStyle';

const UserList = ({data, handleUserRemove}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View>
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
              uri: data?.photoUrl
                ? data?.photoUrl
                : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png',
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
              {data?.username}
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              @{data?.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleUserRemove(data)}
          activeOpacity={0.75}
          style={GlobalStyle.justifyCenterRow}>
          <Ionicons name="close-circle-outline" color={colors.red} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const sampleUsers = [
  {
    name: 'Walker',
  },
  {
    name: 'John',
  },
  {
    name: 'Dane',
  },
  {
    name: 'Danny',
  },
  {
    name: 'Warren',
  },
  {
    name: 'Tex',
  },
  {
    name: 'Jay',
  },
  {
    name: 'Pat',
  },
];

const GroupManager = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {data} = route.params;

  const [members, setMembers] = useState([]);

  const [userQuery, setUserQuery] = useState('');

  const [openDropDown, setOpenDropDown] = useState(false);
  const inputRef = useRef(null);

  const dismissKeyboard = () => {
    // Keyboard.dismiss();
    setOpenDropDown(false);
    inputRef.current.blur();
  };

  const handleUserSearch = async () => {
    dispatch(clearSearchUsers());
    await getUsersByQuery();
    setOpenDropDown(true);
    inputRef.current.blur();
  };

  const handleUserAdd = selectedUser => {
    setOpenDropDown(false);
    const addedUsers = members.filter((item, index) => {
      return (
        item.username.toLocaleLowerCase() ==
        selectedUser.username.toLocaleLowerCase()
      );
    });
    if (addedUsers.length != 0) {
      Alert.alert(
        'User exists!',
        selectedUser.username + ' is already added to this group.',
      );
    } else {
      setMembers([...members, selectedUser]);
    }
    dispatch(clearSearchUsers());
    setUserQuery('');
  };

  const handleUserRemove = data => {
    const filteredUsers = members.filter((item, index) => {
      return item.username !== data.username;
    });
    setMembers(filteredUsers);
  };

  const dispatch = useDispatch();

  const {
    response,
    group,
    groupManagerLoading,
    groupManagerError,
    groupManagerSuccessMessage,
  } = useSelector(state => state.groupManager);

  const {users, userLoading, userError, userSuccessMessage} = useSelector(
    state => state.user,
  );

  const {user} = useSelector(state => state.auth);

  const getUsersByQuery = async () => {
    try {
      const resultAction = await dispatch(searchUsers(userQuery));

      console.log('Result from getUsersByQuery', resultAction);
      if (searchUsers.fulfilled.match(resultAction)) {
        console.log('Found users: ', users);
      } else {
        console.log('Failed to find users:', resultAction.payload);
        showToastWithGravity(resultAction.payload?.message);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  const saveGroup = async () => {
    try {
      const groupName = data?.groupName;
      const resultAction = await dispatch(createGroup(groupName));

      console.log('Result from saveGroup', resultAction);
      if (createGroup.fulfilled.match(resultAction)) {
        showToastWithGravity(`${groupName} group created!`);
        await addMembersToGroup(resultAction.payload?.groupId);
      } else {
        console.log('Failed to create group:', resultAction.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  const addMembersToGroup = async groupId => {
    try {
      const usernames = [];
      members.forEach(item => {
        usernames.push(item?.username);
      });
      console.log('groupId', groupId);
      console.log('usernames: ', usernames);
      const resultAction = await dispatch(
        addMultipleMembersToGroup({groupId, usernames}),
      );

      console.log('Result from addMembersToGroup', resultAction);
      if (addMultipleMembersToGroup.fulfilled.match(resultAction)) {
        console.log(`Group members added!`);
      } else {
        console.log('Failed to add members in group:', resultAction.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  const handleGroupCreation = async () => {
    try {
      if (members.length == 0) {
        Alert.alert(
          'No members added!',
          'Please add members to this group first.',
        );
        return;
      }
      await saveGroup();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.primary}
        />
        <View style={{padding: 20, backgroundColor: colors.primary}}>
          <View style={GlobalStyle.justifyBetweenRow}>
            <Text
              style={{
                marginHorizontal: 20,
                color: colors.header,
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Add people
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingVertical: 5, marginRight: 10}}>
              <Ionicons name="close-outline" color={colors.header} size={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 5,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: Dimensions.get('window').width,
            }}>
            <Text
              style={{color: colors.tertiary, fontSize: 20, fontWeight: 500}}>
              {data?.groupName}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
            }}>
            <View
              style={{
                borderRadius: 5,
                borderWidth: 2,
                borderColor: colors.muted,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5,
              }}>
              <TextInput
                ref={inputRef}
                style={{
                  height: 50,
                  width: Dimensions.get('screen').width * 0.7,
                  color: colors.white,
                  fontSize: 18,
                  padding: 10,
                  fontWeight: 500,
                }}
                placeholderTextColor={colors.muted}
                onChangeText={setUserQuery}
                placeholder="Search username or email"
                value={userQuery}
                keyboardType="email-address"
                returnKeyType="search"
                onSubmitEditing={handleUserSearch}
              />
              <TouchableOpacity
                onPress={handleUserSearch}
                activeOpacity={0.75}
                style={{paddingHorizontal: 10}}>
                <Ionicons name="search" color={colors.header} size={25} />
              </TouchableOpacity>
            </View>
            {/* Drop down box view */}
            <View
              style={{
                width: '100%',
                maxHeight: 150,
                padding: 10,
                backgroundColor: colors.background,
                borderRadius: 5,
                zIndex: 10,
                elevation: 5,
                display: openDropDown ? 'flex' : 'none',
              }}>
              <ScrollView>
                {userLoading ? (
                  <ActivityIndicator color={colors.tertiary} size="large" />
                ) : users.length == 0 ? (
                  <Text style={{color: colors.text}}>No user found!</Text>
                ) : (
                  users.map((item, ind) => {
                    return (
                      <TouchableOpacity
                        onPress={() => handleUserAdd(item)}
                        activeOpacity={0.75}
                        key={ind}>
                        <View
                          style={[
                            GlobalStyle.justifyBetweenRow,
                            {padding: 10},
                          ]}>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              rounded
                              style={{
                                width: 40,
                                height: 40,
                                alignSelf: 'center',
                                borderRadius: 50,
                              }}
                              source={{
                                uri: item?.photoUrl
                                  ? item?.photoUrl
                                  : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png',
                              }}
                            />
                            <View style={{marginHorizontal: 18}}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  color: colors.text,
                                  fontWeight: 500,
                                }}>
                                {item?.username}
                              </Text>
                              <Text style={{color: colors.muted, fontSize: 12}}>
                                @{item?.username}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                )}
              </ScrollView>
            </View>
            <Text style={{color: colors.muted, padding: 5}}>
              Search and add people to this group
            </Text>
            {/* {userError ? (
            <Text style={{color: colors.error, padding: 5}}>{userError}</Text>
          ) : null} */}
          </View>
        </View>
        <ScrollView
          style={{flex: 1, maxHeight: 400, marginHorizontal: 10}}
          persistentScrollbar>
          {members?.length == 0 ? (
            <Text
              style={{
                fontSize: 16,
                color: colors.muted,
                fontWeight: 400,
                padding: 12,
                alignSelf: 'center',
              }}>
              No members yet
            </Text>
          ) : null}
          {members.map((item, ind) => {
            return (
              <UserList
                handleUserRemove={handleUserRemove}
                data={item}
                key={ind}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <View
        style={[
          GlobalStyle.justifyCenterRow,
          {position: 'absolute', bottom: 50, alignSelf: 'center'},
        ]}>
        <AccentActionButton
          loading={groupManagerLoading}
          title="Create"
          onPress={handleGroupCreation}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default GroupManager;
