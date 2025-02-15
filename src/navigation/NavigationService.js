import {CommonActions} from '@react-navigation/native';

let navigator;

export function setNavigator(ref) {
  navigator = ref;
}

export function navigateToSignin() {
  console.log('Going back to signin screen!');
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'Signin'}],
    }),
  );
}
