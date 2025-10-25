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

//-- Starwberry --
import MenuStrawberry from './src/MenuFood/MenuStrawberry';
import StrawberryScreen from './src/DetailFruit/StrawberryScreen';
import DetailFoodStrawberry2 from './src/DetailFood/Strawberry/FreshStrawberryMilk';
import SmoothieStrawberry from './src/DetailFood/Strawberry/SmoothieStrawberry';
import StrawberryIceCream from './src/DetailFood/Strawberry/StrawberryIceCream';
import FreshStrawberryMilk from './src/DetailFood/Strawberry/FreshStrawberryMilk';

//-- Banana --
import BananaScreen from './src/DetailFruit/BananaScreen';
import MenuBanana from './src/MenuFood/MenuBanana';
import BananaCake from './src/DetailFood/Banana/BananaCake';
import CaramelBananaToast from './src/DetailFood/Banana/CaramelBananaToast';
import ButteredBanana from './src/DetailFood/Banana/ButteredBanana';


//-- Orange --
import OrangeScreen from './src/DetailFruit/OrangeScreen';
import MenuOrange from './src/MenuFood/MenuOrange';
import JuiceOrange from './src/DetailFood/Orange/JuiceOrange';
import JellyOrange from './src/DetailFood/Orange/JellyOrange';
import SomChengLoiKaew from './src/DetailFood/Orange/SomChengLoiKaew';


//-- Apple --
import MenuApple from './src/MenuFood/MenuApple';
import AppleSalad from './src/DetailFood/Apple/AppleSalad';
import AppleTart from './src/DetailFood/Apple/AppleTart';
import ApplePie from './src/DetailFood/Apple/ApplePie';

//Ppapaya
import MenuPapaya from './src/MenuFood/MenuPapaya';
import PapayaSmoothie from './src/DetailFood/Papaya/PapayaSmootie';
import FriedPapayaSalad from './src/DetailFood/Papaya/FriedPapaya';
import StirFriedPapayaWithEgg from './src/DetailFood/Papaya/StirFriedPapaya';

//Grape
import MenuGrape from './src/MenuFood/MenuGrape';
import TunaGrapeSalad from './src/DetailFood/Grape/TunaGrape';
import KyohoGrapeSmoothie from './src/DetailFood/Grape/KyohoGrape';
import BananaGrapeCake from './src/DetailFood/Grape/BananaGrapeCake';

//Avocado
import MenuAvocado from './src/MenuFood/MenuAvocado';
import BakedAvocadoFries from './src/DetailFood/Avocado/BakedAvocado';
import AvocadoEggToast from './src/DetailFood/Avocado/AvocadoEggToast';
import AvocadoMilk from './src/DetailFood/Avocado/AvocadoMilk';

//Cherry
import MenuCherry from './src/MenuFood/MenuCherry';
import CherryJelly from './src/DetailFood/Cherry/CherryJelly';
import CherrySmoothie from './src/DetailFood/Cherry/CherrySmoothie';
import CherryTrifle from './src/DetailFood/Cherry/CherryTrifle';

//Mango
import MenuMango from './src/MenuFood/MenuMango';
import MangoPuddingMousse from './src/DetailFood/Mango/MangoPuddingMousse';
import MangoYogurtSmoothie from './src/DetailFood/Mango/MangoYogurtSmoothie';
import DriedMangoPaste from './src/DetailFood/Mango/DriedMangoPaste';

//Tomato
import MenuTomato from './src/MenuFood/MenuTomato';
import Shakshuka from './src/DetailFood/Toamto/Shakshuka';
import TomatoBruschetta from './src/DetailFood/Toamto/TomatoBruschetta';
import TomatoSoup from './src/DetailFood/Toamto/TomatoSoup';


//Cabbage
import MenuCabbage from './src/MenuFood/MenuCabbage';
import JadeDragonSteamedEgg from './src/DetailFood/Cabbage/JadeDragonSteamedEgg';
import CabbagePorkSoup from './src/DetailFood/Cabbage/CabbagePorkSoup';
import MicrowaveCabbageFishSauce from './src/DetailFood/Cabbage/MicrowaveCabbageFishSauce';

//Brocoli
import MenuBrocoli from './src/MenuFood/MenuBroccoli';



export type RootStackParamList = {
  Login: undefined;
  Register : undefined;
  Home: undefined;
  Tabbar : undefined;
  Snap : undefined;
  Favorite : undefined;
  Search : undefined;
  Detail : undefined;

  //--Starwberry--
  Strawberry : undefined;
  MenuStrawberry : undefined;
  SmoothieStrawberry : undefined;
  FreshStrawberryMilk : undefined;
  StrawberryIceCream : undefined;

//--Banana--
  Banana : undefined;
  MenuBanana : undefined;
  BananaCake : undefined;
  CaramelBananaToast : undefined;
  ButteredBanana: undefined;

//--Orange--
  Orange : undefined;
  MenuOrange : undefined;
  JuiceOrange : undefined;
  JellyOrange : undefined;
  SomChengLoiKaew : undefined;

//--Apple--
  Apple : undefined;
  MenuApple : undefined;
  AppleSalad : undefined;
  AppleTart : undefined;
  ApplePie : undefined;

//--Papaya--
  MenuPapaya: undefined;
  PapayaSmootie: undefined;
  FriedPapaya : undefined;
  StirFriedPapayaWithEgg : undefined;

  //Grape
  MenuGrape: undefined;
  KyohoGrape: undefined;
  TunaGrape: undefined;
  BananaGrapeCake: undefined;

  //Avocado
  MenuAvocado: undefined;
  BakedAvocadoFries: undefined;
  AvocadoEggToast: undefined;
  AvocadoMilk: undefined;

  //Cherry
  MenuCherry: undefined;
  CherryJelly: undefined;
  CherrySmoothie: undefined;
  CherryTrifle: undefined;

  //Mango
  MenuMango: undefined;
  MangoPuddingMousse: undefined;
  MangoYogurtSmoothie: undefined;
  DriedMangoPaste: undefined;

  //Tomato
  MenuTomato: undefined;
  Shakshuka: undefined;
  TomatoBruschetta: undefined;
  TomatoSoup: undefined;

  //Cabbage
  MenuCabbage: undefined;
  CabbagePorkSoup: undefined;
  JadeDragonSteamedEgg: undefined;
  MicrowaveCabbageFishSauce: undefined;

  //Brocoli
  
  

};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    
    ///Call Page
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MenuCabbage"
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

          {/*Starwberry */}
        <Stack.Screen name="Strawberry" component={StrawberryScreen}/>
        <Stack.Screen name="MenuStrawberry" component={MenuStrawberry}/>
        <Stack.Screen name="SmoothieStrawberry" component={SmoothieStrawberry}/>
        <Stack.Screen name="FreshStrawberryMilk" component={FreshStrawberryMilk}/>
        <Stack.Screen name="StrawberryIceCream" component={StrawberryIceCream}/>


          {/*Banana */}
        <Stack.Screen name="Banana" component={BananaScreen}/>
        <Stack.Screen name="MenuBanana" component={MenuBanana}/>
        <Stack.Screen name="BananaCake" component={BananaCake}/>
        <Stack.Screen name="CaramelBananaToast" component={CaramelBananaToast}/>
        <Stack.Screen name="ButteredBanana" component={ButteredBanana}/>

        {/*Orange */}
        <Stack.Screen name= "Orange" component={OrangeScreen}/>
        <Stack.Screen name= "MenuOrange" component={MenuOrange}/>
        <Stack.Screen name= "JuiceOrange" component={JuiceOrange}/>
        <Stack.Screen name= "JellyOrange" component={JellyOrange}/>
        <Stack.Screen name= "SomChengLoiKaew" component={SomChengLoiKaew}/>

         {/*Apple */}
        <Stack.Screen name= "MenuApple" component={MenuApple}/>
        <Stack.Screen name= "AppleSalad" component={AppleSalad}/>
        <Stack.Screen name="AppleTart" component={AppleTart}/>
        <Stack.Screen name="ApplePie" component={ApplePie}/>

        {/*Papaya */}
        <Stack.Screen name="MenuPapaya" component={MenuPapaya}/>
        <Stack.Screen name="PapayaSmootie" component={PapayaSmoothie}/>
        <Stack.Screen name="FriedPapaya" component={FriedPapayaSalad}/>
        <Stack.Screen name="StirFriedPapayaWithEgg" component={StirFriedPapayaWithEgg}/>

        {/*Grape */}
        <Stack.Screen name="MenuGrape" component={MenuGrape}/>
        <Stack.Screen name="KyohoGrape" component={KyohoGrapeSmoothie}/>
        <Stack.Screen name="TunaGrape" component={TunaGrapeSalad}/>
        <Stack.Screen name="BananaGrapeCake" component={BananaGrapeCake}/>

        {/*Avocado */}
        <Stack.Screen name="MenuAvocado" component={MenuAvocado}/>
        <Stack.Screen name="BakedAvocadoFries" component={BakedAvocadoFries}/>
        <Stack.Screen name="AvocadoEggToast" component={AvocadoEggToast}/>
        <Stack.Screen name="AvocadoMilk" component={AvocadoMilk}/>

        {/*Cherry */}
        <Stack.Screen name="MenuCherry" component={MenuCherry}/>
        <Stack.Screen name="CherryJelly" component={CherryJelly}/>
        <Stack.Screen name="CherrySmoothie" component={CherrySmoothie}/>
        <Stack.Screen name="CherryTrifle" component={CherryTrifle}/>

        {/*Mango*/}
        <Stack.Screen name="MenuMango" component={MenuMango}/>
        <Stack.Screen name="MangoPuddingMousse" component={MangoPuddingMousse}/>
        <Stack.Screen name="MangoYogurtSmoothie" component={MangoYogurtSmoothie}/>
        <Stack.Screen name="DriedMangoPaste" component={DriedMangoPaste}/>

        {/*Tomato*/}
        <Stack.Screen name="MenuTomato" component={MenuTomato}/>
        <Stack.Screen name="Shakshuka" component={Shakshuka}/>
        <Stack.Screen name="TomatoSoup" component={TomatoSoup}/>
        <Stack.Screen name="TomatoBruschetta" component={TomatoBruschetta}/>

        {/*Cabbage*/}
        <Stack.Screen name="MenuCabbage" component={MenuCabbage}/>
        <Stack.Screen name="CabbagePorkSoup" component={CabbagePorkSoup}/>
        <Stack.Screen name="JadeDragonSteamedEgg" component={JadeDragonSteamedEgg}/>
        <Stack.Screen name="MicrowaveCabbageFishSauce" component={MicrowaveCabbageFishSauce}/>

        
        




        
        
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
