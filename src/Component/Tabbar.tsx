import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabParamList = {
  Home: undefined;
  Scan: undefined;
  Favorite: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const HomeScreen = () => (
  <View><Text>Home</Text></View>
);

const ScanScreen = () => (
  <View><Text>Scan</Text></View>
);

const FavoriteScreen = () => (
  <View><Text>Favorite</Text></View>
);

const SearchScreen = () => (
  <View><Text>Search</Text></View>
);

const Tabbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'darkgreen',
        tabBarStyle: { backgroundColor: '#68874e' },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          switch (route.name) {
            case 'Home': iconName = 'home-outline'; break;
            case 'Scan': iconName = 'qr-code-outline'; break;
            case 'Favorite': iconName = 'heart-outline'; break;
            case 'Search': iconName = 'search-outline'; break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default Tabbar;
