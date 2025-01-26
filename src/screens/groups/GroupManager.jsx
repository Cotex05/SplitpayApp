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
} from 'react-native';
import React, {useState} from 'react';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AccentActionButton} from '../../components/Buttons';
import {useNavigation} from '@react-navigation/native';

const UserList = () => {
  const navigation = useNavigation();
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
              First Last
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
          activeOpacity={0.75}
          style={GlobalStyle.justifyCenterRow}>
          <Ionicons name="close-circle-outline" color={colors.red} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GroupManager = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [groupName, setGroupName] = useState('');
  const [user, setUser] = useState('');

  const [members, setMembers] = useState([1, 2, 3, 4, 5, 6, 7]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
            padding: 10,
          }}>
          <Text
            style={{
              padding: 5,
              color: colors.text,
              fontSize: 20,
              fontWeight: 600,
            }}>
            Add people
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
            returnKeyType="search"
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
          <AccentActionButton title="Create" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default GroupManager;
