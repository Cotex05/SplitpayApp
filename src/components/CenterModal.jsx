import {
  View,
  Text,
  Modal,
  useColorScheme,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {ErrorActionButton, SuccessActionButton} from './Buttons';
import ModalStyle from '../styles/ModalStyle';
import {darkColors, lightColors} from '../constants/colors';
import GlobalStyle from '../styles/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {joinGroupByGroupCode, userGroups} from '../slices/groupSlice';
import {showToastWithGravity} from './native/AndroidComponents';

const CenterModalCreateGroup = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [groupName, setGroupName] = useState('');

  const handleNext = () => {
    if (groupName.trim().length < 3) {
      Alert.alert(
        'Too small group name',
        'Please enter atleast 3 letter group name.',
      );
      return;
    }
    setGroupName('');
    setModalVisible(false);
    navigation.navigate('ManageGroup', {data: {groupName: groupName}});
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={ModalStyle.centeredView}>
          <View style={ModalStyle.centeredModalView}>
            <Text style={{color: colors.header, fontSize: 28, fontWeight: 600}}>
              Create group
            </Text>
            <TextInput
              style={{
                height: 50,
                margin: 12,
                width: '100%',
                borderRadius: 10,
                borderBottomWidth: 2,
                padding: 10,
                borderColor: colors.muted,
                color: colors.white,
                fontSize: 20,
                fontWeight: 500,
              }}
              autoFocus={true}
              placeholder="Group name"
              placeholderTextColor={colors.muted}
              onChangeText={setGroupName}
              value={groupName}
            />
            <View style={{margin: 12}}>
              <SuccessActionButton title="Next" onPress={handleNext} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const CenterModalJoinGroup = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [groupCode, setGroupCode] = useState('');

  const dispatch = useDispatch();

  const {response, loading, error, successMessage} = useSelector(
    state => state.group,
  );

  const joinGroupInvitation = async () => {
    try {
      const requestGroupCode = groupCode.trim().toLocaleLowerCase();
      const result = await dispatch(joinGroupByGroupCode(requestGroupCode));

      console.log('Result from joinGroupInvitation', result);
      if (joinGroupByGroupCode.fulfilled.match(result)) {
        showToastWithGravity('Group joined!');
        console.log('Group joining fulfilled!');
      } else {
        console.log('Group joining failed:', result.payload);
      }
    } catch (err) {
      console.log('Unexpected error:', err);
    }
  };

  const handleJoin = async () => {
    if (groupCode.trim().length != 6) {
      Alert.alert(
        'Invalid group code',
        'Please enter 6 character group code to join',
      );
      return;
    }
    await joinGroupInvitation();
    dispatch(userGroups());
    setGroupCode('');
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={ModalStyle.centeredView}>
          <View style={ModalStyle.centeredModalView}>
            <Text style={{color: colors.header, fontSize: 28, fontWeight: 600}}>
              Join group
            </Text>
            <TextInput
              style={{
                height: 50,
                margin: 12,
                width: '100%',
                borderRadius: 10,
                borderBottomWidth: 2,
                padding: 10,
                borderColor: colors.muted,
                color: colors.white,
                fontSize: 20,
                fontWeight: 500,
              }}
              maxLength={6}
              autoFocus={true}
              placeholder="Group Code"
              placeholderTextColor={colors.muted}
              onChangeText={setGroupCode}
              value={groupCode}
            />
            <View style={{margin: 12}}>
              <SuccessActionButton
                title="Join"
                onPress={handleJoin}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export {CenterModalJoinGroup, CenterModalCreateGroup};
