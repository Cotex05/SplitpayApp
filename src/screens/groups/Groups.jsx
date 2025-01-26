/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
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

const GroupList = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Group')}>
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
              Flat Room
            </Text>
            <Text
              style={{
                display: 'flex',
                color: 'gray',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              5 members
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
        {[1, 2, 3].map((item, index) => {
          return <GroupList key={index} />;
        })}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('ManageGroup')}>
        <View
          style={{
            backgroundColor: colors.primary,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 10,
            right: 10,
            width: 60,
            height: 60,
            borderRadius: 50,
          }}>
          <Ionicons name="add" size={25} color={colors.tertiary} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Groups;
