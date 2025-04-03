import {ToastAndroid} from 'react-native';

const showToastWithGravity = title => {
  ToastAndroid.showWithGravity(title, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export {showToastWithGravity};
