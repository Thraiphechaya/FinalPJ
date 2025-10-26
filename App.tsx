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
import Shakshuka from './src/DetailFood/Tomato/Shakshuka';
import TomatoBruschetta from './src/DetailFood/Tomato/TomatoBruschetta';
import TomatoSoup from './src/DetailFood/Tomato/TomatoSoup';


//Cabbage
import MenuCabbage from './src/MenuFood/MenuCabbage';
import JadeDragonSteamedEgg from './src/DetailFood/Cabbage/JadeDragonSteamedEgg';
import CabbagePorkSoup from './src/DetailFood/Cabbage/CabbagePorkSoup';
import MicrowaveCabbageFishSauce from './src/DetailFood/Cabbage/MicrowaveCabbageFishSauce';

//Brocoli
import MenuBrocoli from './src/MenuFood/MenuBroccoli';
import BroccoliShrimpStirFry from './src/DetailFood/Broccoli/BroccoliShrimpStirFry';
import BroccoliFriedRice from './src/DetailFood/Broccoli/BroccoliFriedRice';
import CreamBroccoliSoup from './src/DetailFood/Broccoli/CreamBroccoliSoup';

//Onion
import MenuOnion from './src/MenuFood/MenuOnion';
import FrenchOnionSoup from './src/DetailFood/Onion/FrenchOnionSoup';
import JapaneseOnionSalad from './src/DetailFood/Onion/JapaneseOnionSalad';
import OnionRings from './src/DetailFood/Onion/OnionRings';

//Cucumber
import MenuCucumber from './src/MenuFood/MenuCucumber';
import SpicyCucumberSalad from './src/DetailFood/Cucumber/SpicyCucumberSalad';
import StirFriedCucumberEgg from './src/DetailFood/Cucumber/StirFriedCucumberEgg';
import CucumberSmoothie from './src/DetailFood/Cucumber/CucumberSmoothie';

//Lemon
import MenuLemon from './src/MenuFood/MenuLemon';
import Lemonade from './src/DetailFood/Lemon/Lemonade';
import LemonChicken from './src/DetailFood/Lemon/LemonChicken';
import LemonTart from './src/DetailFood/Lemon/LemonTart';

//Potato
import MenuPotato from './src/MenuFood/MenuPotato';
import MashedPotatoes from './src/DetailFood/Potato/MashedPotatoes';
import BakedPotatoCheese from './src/DetailFood/Potato/BakedPotatoCheese';
import GarlicButterPotatoes from './src/DetailFood/Potato/GarlicButterPotatoes';

//Carrot
import MenuCarrot from './src/MenuFood/MenuCarrot';
import CarrotCake from './src/DetailFood/Carrot/CarrotCake';
import CarrotSoup from './src/DetailFood/Carrot/CarrotSoup';
import CarrotOrangeSmoothie from './src/DetailFood/Carrot/CarrotOrangeSmoothie';

//BellPepper
import MenuBellPepper from './src/MenuFood/MenuBellPepper';
import StuffedBellPeppers from './src/DetailFood/ฺBellPepper/StuffedBellPeppers';
import SweetSourStirFry from './src/DetailFood/ฺBellPepper/SweetSourStirFry';
import StirFryPorkBellPepper from './src/DetailFood/ฺBellPepper/StirFryPorkBellPepper';

//Corn
import MenuCorn from './src/MenuFood/MenuCorn';
import CornButter from './src/DetailFood/Corn/CornButter';
import CornFritters from './src/DetailFood/Corn/CornFrittes';
import CornSoup from './src/DetailFood/Corn/CornSoup';

//Eggplant
import MenuEggplant from './src/MenuFood/MenuEggplant';
import FriedEggplantEgg from './src/DetailFood/Eggplant/FriedEggplantEgg';
import SpicyEggplantSaladShrimp from './src/DetailFood/Eggplant/SpicyEggplantSaladShrimp';
import StirFriedEggplantPork from './src/DetailFood/Eggplant/StirFriedEggplantPork';

//Blackberry
import MenuBlackberry from './src/MenuFood/MenuBlackberry';
import BlackberryCrumble from './src/DetailFood/Blackberry/BlackberryCrumble';
import BlackberryJam from './src/DetailFood/Blackberry/BlackberryJam';
import BlackberrySmoothie from './src/DetailFood/Blackberry/BlackberrySmoothie';

//Cantaloupe
import MenuCantaloupe from './src/MenuFood/MenuCantaloupe';
import CantaloupeIceCream from './src/DetailFood/Cantaloupe/CantaloupeIceCream';
import CantaloupeMilkSmoothie from './src/DetailFood/Cantaloupe/CantaloupeMilkSmoothie';
import CantaloupeSalad from './src/DetailFood/Cantaloupe/CantaloupeSalad';

//Zucchini
import MenuZucchini from './src/MenuFood/MenuZucchini';
import ZucchiniSoup from './src/DetailFood/Zucchini/ZucchiniSoup';
import FriedZucchini from './src/DetailFood/Zucchini/FriedZucchini';
import StirFriedZucchiniEgg from './src/DetailFood/Zucchini/StirFriedZucchiniEgg';

//Cauliflower
import MenuCauliflower from './src/MenuFood/MenuCauliflower';
import CauliflowerCheeseBake from './src/DetailFood/Cauliflower/CauliflowerCheeseBake';
import CauliflowerFriedRice from './src/DetailFood/Cauliflower/CauliflowerFriedRice';
import FriedCauliflowerGarlic from './src/DetailFood/Cauliflower/FriedCauliflowerGarlic';

//Bean
import MenuBean from './src/MenuFood/MenuBean';
import RedBeanSweetSoup from './src/DetailFood/Bean/RedBeanSweetSoup';
import StirFriedPeasShrimp from './src/DetailFood/Bean/StirFriedPeasShrimp';
import MapoTofu from './src/DetailFood/Bean/MapoTofu';

//Pumpkin
import MenuPumpkin from './src/MenuFood/MenuPumpkin';
import PumpkinCustard from './src/DetailFood/Pumpkin/PumpkinCustard';
import PumpkinSoup from './src/DetailFood/Pumpkin/PumpkinSoup';
import StirFriedPumpkinEgg from './src/DetailFood/Pumpkin/StirFriedPumpkinEgg';

//BitterGourd
import MenuBitterGourd from './src/MenuFood/MenuBitterGourd';
import BraisedBitterGourdPorkRibs from './src/DetailFood/BitterGourd/BraisedBitterGourdPorkRibs';
import StirFriedBitterGourdEgg from './src/DetailFood/BitterGourd/StirFriedBitterGourdEgg';
import StuffedBitterGourdSoup from './src/DetailFood/BitterGourd/StuffedBitterGourdSoup';

//Brownie
import MenuNut from './src/MenuFood/MenuNut';
import WalnutBrownies from './src/DetailFood/Nut/WalnutBrownies';
import HoneyRoastedCashews from './src/DetailFood/Nut/HoneyRoastedCashews';
import MixedNutSalad from './src/DetailFood/Nut/MixedNutSalad';

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
  MenuBroccoli: undefined;
  BroccoliFriedRice: undefined;
  BroccoliShrimpStirFry: undefined;
  CreamBroccoliSoup: undefined;

  //Onion
  MenuOnion: undefined;
  FrenchOnionSoup: undefined;
  JapaneseOnionSalad: undefined;
  OnionRings: undefined;

  //Cucumber
  MenuCucumber: undefined;
  SpicyCucumberSalad: undefined;
  StirFriedCucumberEgg: undefined;
  CucumberSmoothie: undefined;

  //Lemon
  MenuLemon: undefined;
  Lemonade: undefined;
  LemonTart: undefined;
  LemonChicken: undefined;

  //Potato
  MenuPotato: undefined;
  MashedPotatoes: undefined;
  BakedPotatoCheese: undefined;
  GarlicButterPotatoes: undefined;

  //Carrot
  MenuCarrot: undefined;
  CarrotCake: undefined;
  CarrotSoup: undefined;
  CarrotOrangeSmoothie: undefined;

  //Bellpepper
  MenuBellPepper: undefined;
  StuffedBellPeppers: undefined;
  SweetSourStirFry: undefined;
  StirFryPorkBellPepper: undefined;

  //Corn
  MenuCorn: undefined;
  CornButter: undefined;
  CornFrittes: undefined;
  CornSoup: undefined;

  //Eggplant
  MenuEggplant: undefined;
  FriedEggplantEgg: undefined;
  SpicyEggplantSaladShrimp: undefined;
  StirFriedEggplantPork: undefined;

  //Blackberry
  MenuBlackberry: undefined;
  BlackberryCrumble: undefined;
  BlackberryJam: undefined;
  BlackberrySmoothie: undefined;

  //Cantaloupe
  MenuCantaloupe: undefined;
  CantaloupelceCream: undefined;
  CantaloupeMilkSmoothie: undefined;
  CantaloupeSalad: undefined;

  //Zucchini
  MenuZucchini: undefined;
  FriedZucchini: undefined;
  StirFriedZucchiniEgg: undefined;
  ZucchiniSoup: undefined;
  
  //Cauliflower
  MenuCauliflower: undefined;
  CauliflowerCheeseBake: undefined;
  CauliflowerFriedRice: undefined;
  FriedCauliflowerGarlic: undefined;

  //Bean
  MapoTofu: undefined;
  MenuBean: undefined;
  RedBeanSweetSoup: undefined;
  StirFriedPeasShrimp: undefined;

  //Pumpkin
  MenuPumpkin: undefined;
  PumpkinCustard: undefined;
  PumpkinSoup: undefined;
  StirFriedPumpkinEgg: undefined;

  //Bittergourd
  MenuBitterGourd: undefined;
  StuffedBitterGourdSoup: undefined;
  StirFriedBitterGourdEgg: undefined;
  BraisedBitterGourdPorkRibs: undefined;

  //Nut
  MenuNut: undefined;
  MixedNutSalad: undefined;
  HoneyRoastedCashews: undefined;
  WalnutBrownies: undefined;

  
  

};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    
    ///Call Page
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MenuNut"
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

        {/*Broccoli*/}
        <Stack.Screen name="MenuBroccoli" component={MenuBrocoli}/>
        <Stack.Screen name="BroccoliFriedRice" component={BroccoliFriedRice}/>
        <Stack.Screen name="BroccoliShrimpStirFry" component={BroccoliShrimpStirFry}/>
        <Stack.Screen name="CreamBroccoliSoup" component={CreamBroccoliSoup}/>

        {/*Onion*/}
        <Stack.Screen name="MenuOnion" component={MenuOnion}/>
        <Stack.Screen name="FrenchOnionSoup" component={FrenchOnionSoup}/>
        <Stack.Screen name="JapaneseOnionSalad" component={JapaneseOnionSalad}/>
        <Stack.Screen name="OnionRings" component={OnionRings}/>

        {/*Cucumber*/}
        <Stack.Screen name="MenuCucumber" component={MenuCucumber}/>
        <Stack.Screen name="SpicyCucumberSalad" component={SpicyCucumberSalad}/>
        <Stack.Screen name="StirFriedCucumberEgg" component={StirFriedCucumberEgg}/>
        <Stack.Screen name="CucumberSmoothie" component={CucumberSmoothie}/>

        {/*Lemon*/}
        <Stack.Screen name="MenuLemon" component={MenuLemon}/>
        <Stack.Screen name="LemonChicken" component={LemonChicken}/>
        <Stack.Screen name="LemonTart" component={LemonTart}/>
        <Stack.Screen name="Lemonade" component={Lemonade}/>

        {/*Potato*/}
        <Stack.Screen name="MenuPotato" component={MenuPotato}/>
        <Stack.Screen name="MashedPotatoes" component={MashedPotatoes}/>
        <Stack.Screen name="BakedPotatoCheese" component={BakedPotatoCheese}/>
        <Stack.Screen name="GarlicButterPotatoes" component={GarlicButterPotatoes}/>

        {/*Carrot*/}
        <Stack.Screen name="MenuCarrot" component={MenuCarrot}/>
        <Stack.Screen name="CarrotCake" component={CarrotCake}/>
        <Stack.Screen name="CarrotSoup" component={CarrotSoup}/>
        <Stack.Screen name="CarrotOrangeSmoothie" component={CarrotOrangeSmoothie}/>

        {/*BellPepper*/}
        <Stack.Screen name="MenuBellPepper" component={MenuBellPepper}/>
        <Stack.Screen name="StuffedBellPeppers" component={StuffedBellPeppers}/>
        <Stack.Screen name="SweetSourStirFry" component={SweetSourStirFry}/>
        <Stack.Screen name="StirFryPorkBellPepper" component={StirFryPorkBellPepper}/>

        {/*Corn*/}
        <Stack.Screen name="MenuCorn" component={MenuCorn}/>
        <Stack.Screen name="CornSoup" component={CornSoup}/>
        <Stack.Screen name="CornFrittes" component={CornFritters}/>
        <Stack.Screen name="CornButter" component={CornButter}/>

        {/*Eggplant*/}
        <Stack.Screen name="MenuEggplant" component={MenuEggplant}/>
        <Stack.Screen name="FriedEggplantEgg" component={FriedEggplantEgg}/>
        <Stack.Screen name="SpicyEggplantSaladShrimp" component={SpicyEggplantSaladShrimp}/>
        <Stack.Screen name="StirFriedEggplantPork" component={StirFriedEggplantPork}/>
        
        {/*BlackBerry*/}
        <Stack.Screen name="MenuBlackberry" component={MenuBlackberry}/>
        <Stack.Screen name="BlackberryCrumble" component={BlackberryCrumble}/>
        <Stack.Screen name="BlackberryJam" component={BlackberryJam}/>
        <Stack.Screen name="BlackberrySmoothie" component={BlackberrySmoothie}/>

        {/*Cantaloupe*/}
        <Stack.Screen name="MenuCantaloupe" component={MenuCantaloupe}/>
        <Stack.Screen name="CantaloupeMilkSmoothie" component={CantaloupeMilkSmoothie}/>
        <Stack.Screen name="CantaloupeSalad" component={CantaloupeSalad}/>
        <Stack.Screen name="CantaloupelceCream" component={CantaloupeIceCream}/>
        
        {/*Zucchini*/}
        <Stack.Screen name="MenuZucchini" component={MenuZucchini}/>
        <Stack.Screen name="ZucchiniSoup" component={ZucchiniSoup}/>
        <Stack.Screen name="FriedZucchini" component={FriedZucchini}/>
        <Stack.Screen name="StirFriedZucchiniEgg" component={StirFriedZucchiniEgg}/>

        {/*Cauliflower*/}
        <Stack.Screen name="MenuCauliflower" component={MenuCauliflower}/>
        <Stack.Screen name="CauliflowerCheeseBake" component={CauliflowerCheeseBake}/>
        <Stack.Screen name="CauliflowerFriedRice" component={CauliflowerFriedRice}/>
        <Stack.Screen name="FriedCauliflowerGarlic" component={FriedCauliflowerGarlic}/>

        {/*Bean*/}
        <Stack.Screen name="MenuBean" component={MenuBean}/>
        <Stack.Screen name="MapoTofu" component={MapoTofu}/>
        <Stack.Screen name="StirFriedPeasShrimp" component={StirFriedPeasShrimp}/>
        <Stack.Screen name="RedBeanSweetSoup" component={RedBeanSweetSoup}/>

        {/*Pumpkin*/}
        <Stack.Screen name="MenuPumpkin" component={MenuPumpkin}/>
        <Stack.Screen name="PumpkinCustard" component={PumpkinCustard}/>
        <Stack.Screen name="PumpkinSoup" component={PumpkinSoup}/>
        <Stack.Screen name="StirFriedPumpkinEgg" component={StirFriedPumpkinEgg}/>

        {/*Bittergourd*/}
        <Stack.Screen name="MenuBitterGourd" component={MenuBitterGourd}/>
        <Stack.Screen name="BraisedBitterGourdPorkRibs" component={BraisedBitterGourdPorkRibs}/>
        <Stack.Screen name="StirFriedBitterGourdEgg" component={StirFriedBitterGourdEgg}/>
        <Stack.Screen name="StuffedBitterGourdSoup" component={StuffedBitterGourdSoup}/>

        {/*Nut*/}
        <Stack.Screen name="MenuNut" component={MenuNut}/>
        <Stack.Screen name="HoneyRoastedCashews" component={HoneyRoastedCashews}/>
        <Stack.Screen name="MixedNutSalad" component={MixedNutSalad}/>
        <Stack.Screen name="WalnutBrownies" component={WalnutBrownies}/>
        
        
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
