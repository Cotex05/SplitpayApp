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
} from 'react-native';
import React, {useState} from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GroupManager = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [groupName, setGroupName] = useState('');
  const [user, setUser] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View style={{padding: 20, backgroundColor: colors.primary}}>
        <View style={GlobalStyle.justifyBetweenRow}>
          <Text
            style={{
              marginHorizontal: 20,
              color: colors.header,
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Create Group
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
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: Dimensions.get('window').width,
          }}>
          <TextInput
            style={{
              height: 50,
              margin: 12,
              width: '100%',
              borderRadius: 10,
              borderBottomWidth: 2,
              padding: 10,
              borderColor: colors.muted,
              color: colors.header,
              fontSize: 20,
            }}
            autoFocus={true}
            placeholder="Group name"
            placeholderTextColor={colors.muted}
            onChangeText={setGroupName}
            value={groupName}
          />
        </View>
      </View>
      <View
        style={{
          margin: 12,
        }}>
        <Text
          style={{
            padding: 5,
            color: colors.text,
            fontSize: 20,
            fontWeight: 600,
          }}>
          Add user
        </Text>
        <TextInput
          style={{
            height: 50,
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
          onChangeText={setUser}
          placeholder="Search username or email"
          value={user}
          keyboardType="email-address"
        />
        <Text style={{color: colors.muted, padding: 2}}>
          Search and add people to this group
        </Text>
      </View>
      <View
        style={[
          GlobalStyle.justifyCenterRow,
          {position: 'absolute', bottom: 50, alignSelf: 'center'},
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
          style={{
            width: 100,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            backgroundColor: colors.accent,
            borderWidth: 2,
            borderColor: colors.accent,
            borderRadius: 10,
          }}>
          <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 25}}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GroupManager;
