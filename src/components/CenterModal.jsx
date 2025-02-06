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

const CenterModal = ({modalVisible, setModalVisible}) => {
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

export default CenterModal;
