/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AccentActionButton} from '../../components/Buttons';
import {useNavigation} from '@react-navigation/native';

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
              @username
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

  const [user, setUser] = useState('');

  const [foundUsers, setFoundUsers] = useState([]);

  const [openDropDown, setOpenDropDown] = useState(false);
  const inputRef = useRef(null);

  const dismissKeyboard = () => {
    // Keyboard.dismiss();
    setOpenDropDown(false);
    inputRef.current.blur();
  };

  const handleGroupCreation = () => {
    navigation.goBack();
  };

  const handleUserSearch = () => {
    setOpenDropDown(true);
    inputRef.current.blur();
    const filteredUsers = sampleUsers.filter((item, index) => {
      return item.name.toLocaleLowerCase().includes(user.toLocaleLowerCase());
    });
    setFoundUsers(filteredUsers);
  };

  const handleUserAdd = selectedUser => {
    setOpenDropDown(false);
    const addedUsers = members.filter((item, index) => {
      return item.name
        .toLocaleLowerCase()
        .includes(selectedUser.name.toLocaleLowerCase());
    });
    if (addedUsers.length != 0) {
      Alert.alert(
        'User exists!',
        selectedUser.name + ' is already added to this group.',
      );
    } else {
      setMembers([...members, selectedUser]);
    }
    setFoundUsers([]);
    setUser('');
  };

  const handleUserRemove = data => {
    const filteredUsers = members.filter((item, index) => {
      return item.name !== data.name;
    });
    setMembers(filteredUsers);
  };

  return (
    // <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
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
          <Text style={{color: colors.tertiary, fontSize: 20, fontWeight: 500}}>
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
              onChangeText={setUser}
              placeholder="Search username or email"
              value={user}
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
              {foundUsers.length == 0 ? (
                <Text style={{color: colors.text}}>No user found!</Text>
              ) : (
                foundUsers.map((item, ind) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleUserAdd(item)}
                      activeOpacity={0.75}
                      key={ind}>
                      <View
                        style={[GlobalStyle.justifyBetweenRow, {padding: 10}]}>
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
                              uri: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png',
                            }}
                          />
                          <View style={{marginHorizontal: 18}}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: colors.text,
                                fontWeight: 500,
                              }}>
                              {item.name}
                            </Text>
                            <Text style={{color: colors.muted, fontSize: 12}}>
                              @username
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
        </View>
      </View>
      <ScrollView
        style={{flex: 1, maxHeight: 400, marginHorizontal: 10}}
        persistentScrollbar>
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
      <View
        style={[
          GlobalStyle.justifyCenterRow,
          {position: 'absolute', bottom: 50, alignSelf: 'center'},
        ]}>
        <AccentActionButton title="Create" onPress={handleGroupCreation} />
      </View>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

export default GroupManager;
