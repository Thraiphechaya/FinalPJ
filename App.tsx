import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { View, } from 'react-native-reanimated/lib/typescript/Animated';

import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import HomeScreen from './src/Screens/HomeScreens';
import Tabbar from './src/Component/Tabbar';
import SnapScreen from './src/Screens/Snap';
import FavoriteScreen from './src/Screens/Faavorite';
import SearchScreen from './src/Screens/SearchScreen';

export type RootStackParamList = {
  Login: undefined;
  Register : undefined;
  Home: undefined;
  Tabbar : undefined;
  Snap : undefined;
  Favorite : undefined;
  Search : undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#68874e',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeftContainerStyle : {
            backgroundColor: '#68874e',
          },
        }
      }
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Snap" component={SnapScreen} />
        <Stack.Screen name= "Favorite" component={FavoriteScreen}/>
        <Stack.Screen name="Tabbar" component={Tabbar} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
