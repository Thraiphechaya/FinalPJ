import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { View, } from 'react-native-reanimated/lib/typescript/Animated';

import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import HomeScreen from './src/Screens/HomeScreens';
import SnapScreen from './src/Screens/Snap';
import FavoriteScreen from './src/Screens/Faavorite';
import SearchScreen from './src/Screens/SearchScreen';
import DetailScreen from './src/Screens/DetailScreen';

import FoodListButton from './src/Component/FoodListButton';
import Tabbar from './src/Component/Tabbar';


import MenuStrawberry from './src/MenuFood/MenuStrawberry';
import StrawberryScreen from './src/DetailFruit/StrawberryScreen';
import DetailFoodStrawberry2 from './src/DetailFood/Strawberry/FreshStrawberryMilk';
import SmoothieStrawberry from './src/DetailFood/Strawberry/SmoothieStrawberry';
import StrawberryIceCream from './src/DetailFood/Strawberry/StrawberryIceCream';
import FreshStrawberryMilk from './src/DetailFood/Strawberry/FreshStrawberryMilk';


import BananaScreen from './src/DetailFruit/BananaScreen';
import MenuBanana from './src/MenuFood/MenuBanana';
import BananaCake from './src/DetailFood/Banana/BananaCake';
import CaramelBananaToast from './src/DetailFood/Banana/CaramelBananaToast';
import ButteredBanana from './src/DetailFood/Banana/ButteredBanana';

export type RootStackParamList = {
  Login: undefined;
  Register : undefined;
  Home: undefined;
  Tabbar : undefined;
  Snap : undefined;
  Favorite : undefined;
  Search : undefined;
  Detail : undefined;


  Strawberry : undefined;
  MenuStrawberry : undefined;
  SmoothieStrawberry : undefined;
  FreshStrawberryMilk : undefined;
  StrawberryIceCream : undefined;


  Banana : undefined;
  MenuBanana : undefined;
  BananaCake : undefined;
  CaramelBananaToast : undefined;
  ButteredBanana: undefined;

  
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Detail"
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
        <Stack.Screen name="Detail" component={DetailScreen} />


        <Stack.Screen name="Strawberry" component={StrawberryScreen}/>
        <Stack.Screen name="MenuStrawberry" component={MenuStrawberry}/>
        <Stack.Screen name="SmoothieStrawberry" component={SmoothieStrawberry}/>
        <Stack.Screen name="FreshStrawberryMilk" component={FreshStrawberryMilk}/>
        <Stack.Screen name="StrawberryIceCream" component={StrawberryIceCream}/>

        <Stack.Screen name="Banana" component={BananaScreen}/>
        <Stack.Screen name="MenuBanana" component={MenuBanana}/>
        <Stack.Screen name="BananaCake" component={BananaCake}/>
        <Stack.Screen name="CaramelBananaToast" component={CaramelBananaToast}/>
        <Stack.Screen name="ButteredBanana" component={ButteredBanana}/>

        
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
