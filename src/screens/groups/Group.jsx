/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors, lightColors} from '../../constants/colors';
import GlobalStyle from '../../styles/GlobalStyle';

import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ExpensesRoute from './routes/ExpensesRoute';
import OverviewRoute from './routes/OverviewRoute';
import SettlementsRoute from './routes/SettementsRoute';

const renderScene = SceneMap({
  first: OverviewRoute,
  second: ExpensesRoute,
  third: SettlementsRoute,
});

const routes = [
  {key: 'first', title: 'Overview'},
  {key: 'second', title: 'Expenses'},
  {key: 'third', title: 'Settlements'},
];

const Group = ({navigation}) => {
  // const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: colors.tertiary}}
        style={{backgroundColor: colors.primary}}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <View style={{padding: 20, backgroundColor: colors.primary}}>
        <View style={GlobalStyle.justifyBetweenRow}>
          <View style={GlobalStyle.justifyCenterRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingVertical: 5, marginRight: 10}}>
              <Ionicons
                name="chevron-back-outline"
                color={colors.header}
                size={30}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginHorizontal: 20,
                color: colors.header,
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Flat Room
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-vertical"
                color={colors.header}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('ExpenseManager')}>
        <View
          style={{
            backgroundColor: colors.primary,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 10,
            right: 10,
            width: 60,
            height: 60,
            borderRadius: 50,
          }}>
          <Ionicons name="wallet-outline" size={25} color={colors.tertiary} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Group;
