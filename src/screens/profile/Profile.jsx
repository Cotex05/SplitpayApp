/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  Share,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {APP_NAME} from '../../constants/names';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToastWithGravity} from '../../components/native/AndroidComponents';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {userSignout} from '../../slices/authSlices';
import {LoadingModalBox} from '../../components/LoadingBox';
import {images} from '../../constants/images';

const Profile = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [signOutModalVisible, setSignOutModalVisible] = useState(false);

  const dispatch = useDispatch();

  const {loading, error, user} = useSelector(state => state.auth);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Invite people or friends to join ${APP_NAME}`,
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

  const processLogout = async () => {
    try {
      setSignOutModalVisible(true);
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('authUser');
      const signoutResponse = await dispatch(userSignout());
      console.log(signoutResponse);
      showToastWithGravity(`Logout from ${APP_NAME}`);
      navigation.reset({
        index: 0,
        routes: [{name: 'Signin'}],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSignOutModalVisible(true);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      `Logout from ${APP_NAME}`,
      'Do you want to logout now?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Confirm', onPress: processLogout},
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View style={{padding: 20, backgroundColor: colors.primary}}>
        <Text
          style={{
            fontFamily: 'monospace',
            color: colors.header,
            fontWeight: 'bold',
            fontSize: 32,
            alignSelf: 'center',
          }}>
          Profile
        </Text>
        <View
          style={{
            backgroundColor: 'rgba(5, 5, 5, 0.2)',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
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
                width: 50,
                height: 50,
                alignSelf: 'center',
                borderRadius: 50,
              }}
              source={{
                uri: user?.photoUrl
                  ? user.photoUrl
                  : images.DEFAULT_PROFILE_PHOTO,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: 'center',
                  marginLeft: 10,
                }}>
                {user?.fullName}
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: 'monospace',
                  fontSize: 15,
                  fontWeight: 500,
                  textAlign: 'center',
                  marginLeft: 12,
                }}>
                @{user?.username}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProfile', {userData: user})
              }>
              <Ionicons name="create-outline" color={colors.white} size={32} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
        }}>
        <Text
          style={{
            color: colors.dark,
            fontSize: 25,
            fontWeight: 600,
          }}>
          Settings
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: colors.muted,
          borderRadius: 15,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile', {userData: user})}>
          <View
            style={{
              display: 'flex',
              backgroundColor: colors.background,
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderBottomColor: colors.muted,
            }}>
            <Text style={{color: colors.dark, fontWeight: 600, fontSize: 18}}>
              Edit Profile
            </Text>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                color={colors.muted}
                size={25}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyUPIs', {userData: user})}>
          <View
            style={{
              display: 'flex',
              backgroundColor: colors.background,
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderBottomColor: colors.muted,
            }}>
            <Text style={{color: colors.dark, fontWeight: 600, fontSize: 18}}>
              Manage UPI Address
            </Text>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                color={colors.muted}
                size={25}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <View
            style={{
              display: 'flex',
              backgroundColor: colors.background,
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderBottomColor: colors.muted,
            }}>
            <Text style={{color: colors.dark, fontWeight: 600, fontSize: 18}}>
              Invite Others
            </Text>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                color={colors.muted}
                size={25}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Support')}>
          <View
            style={{
              display: 'flex',
              backgroundColor: colors.background,
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderBottomColor: colors.muted,
            }}>
            <Text style={{color: colors.dark, fontWeight: 600, fontSize: 18}}>
              FAQ/Support
            </Text>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                color={colors.muted}
                size={25}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <View
            style={{
              display: 'flex',
              backgroundColor: colors.background,
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderBottomColor: colors.muted,
            }}>
            <Text style={{color: colors.dark, fontWeight: 600, fontSize: 18}}>
              About
            </Text>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                color={colors.muted}
                size={25}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <View
            style={{
              display: 'flex',
              backgroundColor: colors.background,
              padding: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{color: colors.red, fontWeight: 600, fontSize: 18}}>
              Logout
            </Text>
            <View>
              {loading ? (
                <ActivityIndicator size="large" color={colors.tertiary} />
              ) : (
                <Ionicons
                  name="chevron-forward-outline"
                  color={colors.muted}
                  size={25}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <LoadingModalBox
        message="Signing out..."
        setModalVisible={setSignOutModalVisible}
        modalVisible={signOutModalVisible}
      />
    </SafeAreaView>
  );
};

export default Profile;
