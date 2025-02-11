import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import ButtonStyle from '../styles/ButtonStyle';
import {darkColors} from '../constants/colors';

const colors = darkColors;

const SuccessActionButton = ({title, onPress}) => {
  return (
    <View>
      <Pressable style={ButtonStyle.successActionButton} onPress={onPress}>
        <Text style={{color: colors.white, fontWeight: 600, fontSize: 20}}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const ErrorActionButton = ({title, onPress}) => {
  return (
    <View>
      <Pressable style={ButtonStyle.errorActionButton} onPress={onPress}>
        <Text style={{color: colors.red, fontWeight: 600, fontSize: 20}}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const MutedActionButton = ({title, onPress}) => {
  return (
    <View>
      <Pressable style={ButtonStyle.mutedActionButton} onPress={onPress}>
        <Text style={{color: colors.muted, fontWeight: 600, fontSize: 20}}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const AccentActionButton = ({title, onPress, loading}) => {
  return (
    <View>
      <Pressable
        style={ButtonStyle.accentActionButton}
        onPress={onPress}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          <Text style={{color: colors.white, fontWeight: 600, fontSize: 20}}>
            {title}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export {
  AccentActionButton,
  ErrorActionButton,
  MutedActionButton,
  SuccessActionButton,
};
