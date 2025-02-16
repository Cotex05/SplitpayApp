/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {Suspense} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {darkColors, lightColors} from '../../../constants/colors';
import LoadingBox from '../../../components/LoadingBox';
import GlobalStyle from '../../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../../constants/images';

const MemberList = ({data}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity activeOpacity={0.75}>
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
                : images.DEFAULT_PROFILE_PHOTO,
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
              {data?.fullName}
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
      </View>
    </TouchableOpacity>
  );
};

const GroupMembers = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const {membersData, groupData} = route.params;

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
              <Text
                style={{
                  marginHorizontal: 20,
                  color: colors.header,
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  maxWidth: Dimensions.get('screen').width * 0.7,
                }}>
                {groupData?.groupName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingVertical: 5, marginRight: 10}}>
              <Ionicons name="close-outline" color={colors.header} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            style={{borderBottomWidth: 2, borderBottomColor: colors.muted}}>
            <Text
              style={{
                display: 'flex',
                color: colors.text,
                padding: 10,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Group Members
            </Text>
          </View>
          <ScrollView>
            {membersData.length == 0 ? (
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                }}>
                No members found!
              </Text>
            ) : null}
            {membersData.map((item, index) => {
              return <MemberList data={item} key={index} />;
            })}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </Suspense>
  );
};

export default GroupMembers;
