import {Dimensions, StyleSheet} from 'react-native';
import {darkColors} from '../constants/colors';

const ModalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    bottom: -50,
    height: 400,
    margin: 20,
    backgroundColor: darkColors.primary,
    borderRadius: 30,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  centeredModalView: {
    width: Dimensions.get('screen').width * 0.8,
    height: 260,
    margin: 20,
    backgroundColor: darkColors.primary,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  buttonClose: {
    margin: 10,
    alignItems: 'center',
    borderColor: darkColors.red,
    borderWidth: 1,
    width: 150,
    borderRadius: 10,
    padding: 12,
  },
  buttonAction: {
    margin: 10,
    alignItems: 'center',
    borderColor: darkColors.green,
    backgroundColor: darkColors.green,
    borderWidth: 1,
    width: 150,
    borderRadius: 10,
    padding: 12,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalStyle;
