import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Support from './Support';
import Categories from './Categories';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#987952',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="home" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="message" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={() => <Text>Profile Screen</Text>}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={25} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;