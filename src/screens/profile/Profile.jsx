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
} from 'react-native';
import React from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {APP_NAME} from '../../constants/names';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToastWithGravity} from '../../components/native/AndroidComponents';
import {useSelector} from 'react-redux';

const Profile = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const user = useSelector(state => state.auth.user);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Invite people or friends to ${APP_NAME}`,
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authUser');
      showToastWithGravity(`Logout from ${APP_NAME}`);
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.log(error);
    }
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
                uri: 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png',
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
                  fontSize: 25,
                  fontWeight: 600,
                  textAlign: 'center',
                  marginLeft: 20,
                }}>
                {user?.username}
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: 'monospace',
                  fontSize: 15,
                  fontWeight: 500,
                  textAlign: 'center',
                  marginLeft: 20,
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
        <TouchableOpacity>
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
              Manage password
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
        <TouchableOpacity onPress={() => navigation.navigate('MyUPIs')}>
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
              My UPIs
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
              Invite
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
        <TouchableOpacity onPress={handleLogout}>
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
              <Ionicons
                name="chevron-forward-outline"
                color={colors.muted}
                size={25}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
