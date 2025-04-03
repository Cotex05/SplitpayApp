/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
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
import {images} from '../../constants/images';
import {saveProfile} from '../../slices/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userPersist} from '../../slices/authSlices';

const EditProfile = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {userData} = route.params;

  const dispatch = useDispatch();

  const {profileData, profileLoading, profileError} = useSelector(
    state => state.profile,
  );

  const updateInMemoryUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('authUser');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (userData) {
        userData.fullName = name;
      }
      await AsyncStorage.setItem('authUser', JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async () => {
    try {
      const profileData = {
        fullName: name,
        username: username,
        email: email,
        phone: phoneNumber,
      };
      const result = await dispatch(saveProfile(profileData));

      console.log('Result from updateUserProfile', result);
      if (saveProfile.fulfilled.match(result)) {
        console.log('Profile saving success!');
        await updateInMemoryUserData();
        dispatch(userPersist());
        showToastWithGravity('Profile Saved!');
        navigation.goBack();
      } else {
        console.log('Profile saving failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileSave = () => {
    if (name === '') {
      showToastWithGravity('Fields cannot be empty!');
      return;
    }
    Keyboard.dismiss();
    updateUserProfile();
  };
  useEffect(() => {
    setUsername(userData?.username);
    setEmail(userData?.email);
    setName(userData?.fullName);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View style={{padding: 20, backgroundColor: colors.primary}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
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
            Edit Profile
          </Text>
        </View>
        <View
          style={{
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
            marginTop: 20,
            alignItems: 'center',
            maxWidth: Dimensions.get('window').width,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Image
              rounded
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                borderRadius: 50,
              }}
              source={{
                uri: userData?.photoUrl
                  ? userData.photoUrl
                  : images.DEFAULT_PROFILE_PHOTO,
              }}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            padding: 5,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: Dimensions.get('window').width,
          }}>
          <TextInput
            style={{
              height: 50,
              margin: 12,
              width: Dimensions.get('screen').width - 40,
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
              borderColor: colors.muted,
              color: colors.text,
              fontSize: 18,
              fontWeight: 500,
            }}
            placeholderTextColor={colors.muted}
            onChangeText={setName}
            placeholder="Name"
            value={name}
          />
          <TextInput
            style={{
              height: 50,
              margin: 12,
              width: Dimensions.get('screen').width - 40,
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
              borderColor: colors.muted,
              color: colors.muted,
              fontSize: 18,
              fontWeight: 500,
            }}
            placeholderTextColor={colors.muted}
            onChangeText={setUsername}
            placeholder="Username"
            value={`@${username}`}
            editable={false}
            selectTextOnFocus={false}
          />
          <TextInput
            style={{
              height: 50,
              margin: 12,
              width: Dimensions.get('screen').width - 40,
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
              borderColor: colors.muted,
              color: colors.muted,
              fontSize: 18,
              fontWeight: 500,
            }}
            placeholderTextColor={colors.muted}
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
            editable={false}
            keyboardType="email-address"
          />
          {/* <TextInput
            style={{
              height: 50,
              margin: 12,
              width: Dimensions.get('screen').width - 40,
              borderRadius: 10,
              borderWidth: 2,
              padding: 10,
              borderColor: colors.muted,
              color: colors.text,
              fontSize: 18,
              fontWeight: 500,
            }}
            placeholderTextColor={colors.muted}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            value={phoneNumber}
            keyboardType="number-pad"
          /> */}
        </View>
        <View
          style={{
            marginVertical: 50,
            display: 'flex',
            alignItems: 'center',
          }}>
          <AccentActionButton
            title="Save"
            onPress={handleProfileSave}
            loading={profileLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
