import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/Screens/LoginScreen'; 
import HomeScreen from './src/Screens/HomeScreens';
import Tabbar from './src/Component/Tabbar';
import { View, } from 'react-native-reanimated/lib/typescript/Animated';
import RegisterScreen from './src/Screens/RegisterScreen';


export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Tabbar : undefined;
  Register : undefined;
  
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
        <Stack.Screen name="Tabbar" component={Tabbar} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
