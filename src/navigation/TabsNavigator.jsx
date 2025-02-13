import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors} from '../constants/colors';
import Groups from '../screens/groups/Groups';
import Profile from '../screens/profile/Profile';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => {
        return {
          tabBarStyle: {
            backgroundColor: colors.primary, // Set your desired background color here
            borderTopWidth: 1, // Optional: Remove the border if needed
            borderColor: colors.header,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Groups') {
              iconName = focused ? 'people' : 'people-outline';
            }

            // Return the appropriate icon for each tab
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.tertiary,
          tabBarInactiveTintColor: colors.header,
          headerShown: false, // Optional: Hide header
        };
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Groups"
        options={{tabBarLabel: 'Groups'}}
        component={Groups}
      />
      <Tab.Screen
        name="Profile"
        options={{tabBarLabel: 'Profile'}}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
