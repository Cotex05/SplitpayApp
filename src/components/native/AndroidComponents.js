import {ToastAndroid} from 'react-native';
import React from 'react';

const showToastWithGravity = title => {
  ToastAndroid.showWithGravity(title, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export {showToastWithGravity};
