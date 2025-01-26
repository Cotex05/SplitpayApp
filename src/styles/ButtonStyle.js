import {Dimensions, StyleSheet} from 'react-native';
import {darkColors} from '../constants/colors';

const ButtonStyle = StyleSheet.create({
  errorActionButton: {
    margin: 10,
    alignItems: 'center',
    borderColor: darkColors.red,
    borderWidth: 1,
    width: 150,
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  successActionButton: {
    margin: 10,
    alignItems: 'center',
    borderColor: darkColors.green,
    backgroundColor: darkColors.green,
    borderWidth: 1,
    width: 150,
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  mutedActionButton: {
    margin: 10,
    alignItems: 'center',
    borderColor: darkColors.muted,
    borderWidth: 1,
    width: 150,
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  accentActionButton: {
    margin: 10,
    alignItems: 'center',
    borderColor: darkColors.accent,
    backgroundColor: darkColors.accent,
    borderWidth: 1,
    width: 150,
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
});

export default ButtonStyle;
