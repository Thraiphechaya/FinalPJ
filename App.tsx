// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import HomeScreen from './src/Screens/HomeScreens';
import SnapScreen from './src/Screens/Snap';
import FavoriteScreen from './src/Screens/Favorite';
import SearchScreen from './src/Screens/SearchScreen';
import DetailScreen from './src/Screens/DetailScreen';
import OnboardingScreen from './src/Screens/OnboardingScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import PredictionResultScreen from './src/Screens/PredictionResultScreen';
import DebugScreen from './src/Screens/DebugScreen';

// Import menu screens
import MenuStrawberry from './src/MenuFood/MenuStrawberry';
import StrawberryScreen from './src/DetailFruit/StrawberryScreen';
import SmoothieStrawberry from './src/DetailFood/Strawberry/SmoothieStrawberry';
import FreshStrawberryMilk from './src/DetailFood/Strawberry/FreshStrawberryMilk';
import StrawberryIceCream from './src/DetailFood/Strawberry/StrawberryIceCream';

import MenuBanana from './src/MenuFood/MenuBanana';
import BananaScreen from './src/DetailFruit/BananaScreen';
import BananaCake from './src/DetailFood/Banana/BananaCake';
import CaramelBananaToast from './src/DetailFood/Banana/CaramelBananaToast';
import ButteredBanana from './src/DetailFood/Banana/ButteredBanana';

// Import ผลไม้
import MenuApple from './src/MenuFood/MenuApple';
import MenuAvocado from './src/MenuFood/MenuAvocado';
import MenuBlackberry from './src/MenuFood/MenuBlackberry';
import MenuCantaloupe from './src/MenuFood/MenuCantaloupe';
import MenuCherry from './src/MenuFood/MenuCherry';
import MenuGrape from './src/MenuFood/MenuGrape';
import MenuLemon from './src/MenuFood/MenuLemon';
import MenuMango from './src/MenuFood/MenuMango';
import MenuOrange from './src/MenuFood/MenuOrange';
import MenuPapaya from './src/MenuFood/MenuPapaya';

// Import ผัก
import MenuBean from './src/MenuFood/MenuBean';
import MenuBellPepper from './src/MenuFood/MenuBellPepper';
import MenuBitterGourd from './src/MenuFood/MenuBitterGourd';
import MenuBroccoli from './src/MenuFood/MenuBroccoli';
import MenuCabbage from './src/MenuFood/MenuCabbage';
import MenuCarrot from './src/MenuFood/MenuCarrot';
import MenuCauliflower from './src/MenuFood/MenuCauliflower';
import MenuCorn from './src/MenuFood/MenuCorn';
import MenuCucumber from './src/MenuFood/MenuCucumber';
import MenuEggplant from './src/MenuFood/MenuEggplant';
import MenuNut from './src/MenuFood/MenuNut';
import MenuOnion from './src/MenuFood/MenuOnion';
import MenuPotato from './src/MenuFood/MenuPotato';
import MenuPumpkin from './src/MenuFood/MenuPumpkin';
import MenuTomato from './src/MenuFood/MenuTomato';
import MenuZucchini from './src/MenuFood/MenuZucchini';

// Import components
import Tabbar from './src/Component/Tabbar';

// Import types
import { RootStackParamList } from './src/types';

// Import Apple
import ApplePie from './src/DetailFood/Apple/ApplePie';
import AppleSalad from './src/DetailFood/Apple/AppleSalad';
import AppleTart from './src/DetailFood/Apple/AppleTart';

// Import Avocado
import AvocadoEggToast from './src/DetailFood/Avocado/AvocadoEggToast';
import AvocadoMilk from './src/DetailFood/Avocado/AvocadoMilk';
import BakedAvocado from './src/DetailFood/Avocado/BakedAvocado';

// Import Bean
import MapoTofu from './src/DetailFood/Bean/MapoTofu';
import RedBeanSweetSoup from './src/DetailFood/Bean/RedBeanSweetSoup';
import StirFriedPeasShrimp from './src/DetailFood/Bean/StirFriedPeasShrimp';

// Import Bitter Gourd
import BraisedBitterGourdPorkRibs from './src/DetailFood/BitterGourd/BraisedBitterGourdPorkRibs';
import StirFriedBitterGourdEgg from './src/DetailFood/BitterGourd/StirFriedBitterGourdEgg';
import StuffedBitterGourdSoup from './src/DetailFood/BitterGourd/StuffedBitterGourdSoup';

// Import Blackberry
import BlackberryCrumble from './src/DetailFood/Blackberry/BlackberryCrumble';
import BlackberryJam from './src/DetailFood/Blackberry/BlackberryJam';
import BlackberrySmoothie from './src/DetailFood/Blackberry/BlackberrySmoothie';

// Import Broccoli
import BroccoliFriedRice from './src/DetailFood/Broccoli/BroccoliFriedRice';
import BroccoliShrimpStirfry from './src/DetailFood/Broccoli/BroccoliShrimpStirFry';
import CreamBroccoliSoup from './src/DetailFood/Broccoli/CreamBroccoliSoup';

// Import Cabbage
import CabbagePorkSoup from './src/DetailFood/Cabbage/CabbagePorkSoup';
import JadeDragonSteamEgg from './src/DetailFood/Cabbage/JadeDragonSteamedEgg';
import MicrowaveCabbageFishSauce from './src/DetailFood/Cabbage/MicrowaveCabbageFishSauce';

// Import Cantaloupe
import CantaloupeMilkSmoothie from './src/DetailFood/Cantaloupe/CantaloupeMilkSmoothie';
import CantaloupeIceCream from './src/DetailFood/Cantaloupe/CantaloupeIceCream';
import CantaloupeSalad from './src/DetailFood/Cantaloupe/CantaloupeSalad';

// Import Carrot
import CarrotCake from './src/DetailFood/Carrot/CarrotCake';
import CarrotOrangeSmoothie from './src/DetailFood/Carrot/CarrotOrangeSmoothie';
import CarrotSoup from './src/DetailFood/Carrot/CarrotSoup';

// Import Cauliflower
import CauliflowerCheeseBake from './src/DetailFood/Cauliflower/CauliflowerCheeseBake';
import CauliflowerFriedRice from './src/DetailFood/Cauliflower/CauliflowerFriedRice';
import FriedCauliflowerGarlic from './src/DetailFood/Cauliflower/FriedCauliflowerGarlic';

// Import Cherry
import CherryJelly from './src/DetailFood/Cherry/CherryJelly';
import CherrySmoothie from './src/DetailFood/Cherry/CherrySmoothie';
import CherryTrifle from './src/DetailFood/Cherry/CherryTrifle';

// Import Corn
import CornButter from './src/DetailFood/Corn/CornButter';
import CornFritters from './src/DetailFood/Corn/CornFrittes';
import CornSoup from './src/DetailFood/Corn/CornSoup';

// Import Cucumber
import CucumberSmoothie from './src/DetailFood/Cucumber/CucumberSmoothie';
import SpicyCucumberSalad from './src/DetailFood/Cucumber/SpicyCucumberSalad';
import StirFriedCucumberEgg from './src/DetailFood/Cucumber/StirFriedCucumberEgg';

// Import Eggplant
import FriedEggplantEgg from './src/DetailFood/Eggplant/FriedEggplantEgg';
import SpicyEggplantSaladShrimp from './src/DetailFood/Eggplant/SpicyEggplantSaladShrimp';
import StirFriedEggplantPork from './src/DetailFood/Eggplant/StirFriedEggplantPork';

// Import Grape
import BananaGrapeCake from './src/DetailFood/Grape/BananaGrapeCake';
import KyohoGrape from './src/DetailFood/Grape/KyohoGrape';
import TunaGrape from './src/DetailFood/Grape/TunaGrape';

// Import Lemon
import Lemonade from './src/DetailFood/Lemon/Lemonade';
import LemonChicken from './src/DetailFood/Lemon/LemonChicken';
import LemonTart from './src/DetailFood/Lemon/LemonTart';

// Import Mango
import DriedMangoPaste from './src/DetailFood/Mango/DriedMangoPaste';
import MangoPuddingMousse from './src/DetailFood/Mango/MangoPuddingMousse';
import MangoYogurtSmoothie from './src/DetailFood/Mango/MangoYogurtSmoothie';

// Import Nut
import HoneyRoastedCashews from './src/DetailFood/Nut/HoneyRoastedCashews';
import MixedNutSalad from './src/DetailFood/Nut/MixedNutSalad';
import WalnutBrownies from './src/DetailFood/Nut/WalnutBrownies';

// Import Onion
import FrenchOnionSoup from './src/DetailFood/Onion/FrenchOnionSoup';
import JapaneseOnionSalad from './src/DetailFood/Onion/JapaneseOnionSalad';
import OnionRings from './src/DetailFood/Onion/OnionRings';

// Import Orange
import JellyOrange from './src/DetailFood/Orange/JellyOrange';
import JuiceOrange from './src/DetailFood/Orange/JuiceOrange';
import SomChengLoiKaew from './src/DetailFood/Orange/SomChengLoiKaew';

// Import Papaya
import FriedPapaya from './src/DetailFood/Papaya/FriedPapaya';
import PapayaSmoothie from './src/DetailFood/Papaya/PapayaSmootie';
import StirFriedPapaya from './src/DetailFood/Papaya/StirFriedPapaya';

// Import Potato
import BakedPotatoCheese from './src/DetailFood/Potato/BakedPotatoCheese';
import GarlicButterCheese from './src/DetailFood/Potato/GarlicButterPotatoes';
import MashedPotatoes from './src/DetailFood/Potato/MashedPotatoes';

// Import Pumpkin
import PumpkinCustard from './src/DetailFood/Pumpkin/PumpkinCustard';
import PumpkinSoup from './src/DetailFood/Pumpkin/PumpkinSoup';
import StirFriedPumpkinEgg from './src/DetailFood/Pumpkin/StirFriedPumpkinEgg';

// Import Tomato
import Shakshuka from './src/DetailFood/Tomato/Shakshuka';
import TomatoBruschetta from './src/DetailFood/Tomato/TomatoBruschetta';
import TomatoSoup from './src/DetailFood/Tomato/TomatoSoup';

// Import Zucchini
import FriedZucchini from './src/DetailFood/Zucchini/FriedZucchini';
import StirFriedZucchiniEgg from './src/DetailFood/Zucchini/StirFriedZucchiniEgg';
import ZucchiniSoup from './src/DetailFood/Zucchini/ZucchiniSoup';

// Import Bell Pepper
import StuffedBellPeppers from './src/DetailFood/Bellpepper/StuffedBellPeppers';
import SweetSourStirFry from './src/DetailFood/Bellpepper/SweetSourStirFry';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#68874e',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeftContainerStyle: {
            backgroundColor: '#68874e',
          },
        }}
      >
        {/* Auth & Main Screens */}
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Snap" component={SnapScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Debug" component={DebugScreen}/>
        <Stack.Screen 
          name="PredictionResult" 
          component={PredictionResultScreen}
          options={{ 
            headerShown: false,
            title: 'ผลการวิเคราะห์'
          }}
        />
        <Stack.Screen 
          name="Tabbar" 
          component={Tabbar}
          options={{ headerShown: false }}
        />

        {/* Strawberry Menu Screens */}
        <Stack.Screen 
          name="Strawberry" 
          component={StrawberryScreen}
          options={{ title: 'สตรอเบอร์รี่' }}
        />
        <Stack.Screen 
          name="MenuStrawberry" 
          component={MenuStrawberry}
          options={{ title: 'เมนูสตรอเบอร์รี่' }}
        />
        <Stack.Screen 
          name="SmoothieStrawberry" 
          component={SmoothieStrawberry}
          options={{ title: 'สมูทตี้สตรอเบอร์รี่' }}
        />
        <Stack.Screen 
          name="FreshStrawberryMilk" 
          component={FreshStrawberryMilk}
          options={{ title: 'นมสตรอเบอร์รี่' }}
        />
        <Stack.Screen 
          name="StrawberryIceCream" 
          component={StrawberryIceCream}
          options={{ title: 'ไอศครีมสตรอเบอร์รี่' }}
        />

        {/* Apple Menu Screens */}
        <Stack.Screen 
          name="ApplePie" 
          component={ApplePie}
          options={{ title: 'พายแอปเปิ้ล' }}
        />
        <Stack.Screen 
          name="AppleSalad" 
          component={AppleSalad}
          options={{ title: 'สลัดแอปเปิ้ล' }}
        />
        <Stack.Screen 
          name="AppleTart" 
          component={AppleTart}
          options={{ title: 'ทาร์ตแอปเปิ้ล' }}
        />

        {/* Avocado Menu Screens */}
        <Stack.Screen 
          name="AvocadoEggToast" 
          component={AvocadoEggToast}
          options={{ title: 'อะโวคาโดโทสต์ไข่' }}
        />
        <Stack.Screen 
          name="AvocadoMilk" 
          component={AvocadoMilk}
          options={{ title: 'นมอะโวคาโด' }}
        />
        <Stack.Screen 
          name="BakedAvocado" 
          component={BakedAvocado}
          options={{ title: 'อะโวคาโดอบ' }}
        />

        {/* Bean Menu Screens */}
        <Stack.Screen 
          name="MapoTofu" 
          component={MapoTofu}
          options={{ title: 'Mapo Tofu' }}
        />
        <Stack.Screen 
          name="RedBeanSweetSoup" 
          component={RedBeanSweetSoup}
          options={{ title: 'ซุปถั่วแดง' }}
        />
        <Stack.Screen 
          name="StirFriedPeasShrimp" 
          component={StirFriedPeasShrimp}
          options={{ title: 'ถั่วลันเตาผัดกุ้ง' }}
        />

        {/* Bitter Gourd Menu Screens */}
        <Stack.Screen 
          name="BraisedBitterGourdPorkRibs" 
          component={BraisedBitterGourdPorkRibs}
          options={{ title: 'มะระตุ๋นซี่โครงหมู' }}
        />
        <Stack.Screen 
          name="StirFriedBitterGourdEgg" 
          component={StirFriedBitterGourdEgg}
          options={{ title: 'มะระผัดไข่' }}
        />
        <Stack.Screen 
          name="StuffedBitterGourdSoup" 
          component={StuffedBitterGourdSoup}
          options={{ title: 'ซุปมะระยัดไส้' }}
        />

        {/* Blackberry Menu Screens */}
        <Stack.Screen 
          name="BlackberryCrumble" 
          component={BlackberryCrumble}
          options={{ title: 'แบล็กเบอร์รี่ครัมเบิล' }}
        />
        <Stack.Screen 
          name="BlackberryJam" 
          component={BlackberryJam}
          options={{ title: 'แยมแบล็กเบอร์รี่' }}
        />
        <Stack.Screen 
          name="BlackberrySmoothie" 
          component={BlackberrySmoothie}
          options={{ title: 'สมูทตี้แบล็กเบอร์รี่' }}
        />

        {/* Broccoli Menu Screens */}
        <Stack.Screen 
          name="BroccoliFriedRice" 
          component={BroccoliFriedRice}
          options={{ title: 'ข้าวผัดบร็อคโคลี่' }}
        />
        <Stack.Screen 
          name="BroccoliShrimpStirfry" 
          component={BroccoliShrimpStirfry}
          options={{ title: 'บร็อคโคลี่ผัดกุ้ง' }}
        />
        <Stack.Screen 
          name="CreamBroccoliSoup" 
          component={CreamBroccoliSoup}
          options={{ title: 'ซุปครีมบร็อคโคลี่' }}
        />

        {/* Cabbage Menu Screens */}
        <Stack.Screen 
          name="CabbagePorkSoup" 
          component={CabbagePorkSoup}
          options={{ title: 'ต้มจืดกะหล่ำปลีหมูสับ' }}
        />
        <Stack.Screen 
          name="JadeDragonSteamEgg" 
          component={JadeDragonSteamEgg}
          options={{ title: 'ไข่เจียวกะหล่ำปลี' }}
        />
        <Stack.Screen 
          name="MicrowaveCabbageFishSauce" 
          component={MicrowaveCabbageFishSauce}
          options={{ title: 'กะหล่ำปลีไมโครเวฟน้ำปลา' }}
        />

        {/* Cantaloupe Menu Screens */}
        <Stack.Screen 
          name="CantaloupeMilkSmoothie" 
          component={CantaloupeMilkSmoothie}
          options={{ title: 'สมูทตี้แตงโอนม' }}
        />
        <Stack.Screen 
          name="CantaloupeIceCream" 
          component={CantaloupeIceCream}
          options={{ title: 'ไอศครีมแตงโอน' }}
        />
        <Stack.Screen 
          name="CantaloupeSalad" 
          component={CantaloupeSalad}
          options={{ title: 'สลัดแตงโอน' }}
        />

        {/* Carrot Menu Screens */}
        <Stack.Screen 
          name="CarrotCake" 
          component={CarrotCake}
          options={{ title: 'เค้กแครอท' }}
        />
        <Stack.Screen 
          name="CarrotOrangeSmoothie" 
          component={CarrotOrangeSmoothie}
          options={{ title: 'สมูทตี้แครอทส้ม' }}
        />
        <Stack.Screen 
          name="CarrotSoup" 
          component={CarrotSoup}
          options={{ title: 'ซุปแครอท' }}
        />

        {/* Cauliflower Menu Screens */}
        <Stack.Screen 
          name="CauliflowerCheeseBake" 
          component={CauliflowerCheeseBake}
          options={{ title: 'ดอกกะหล่ำอบชีส' }}
        />
        <Stack.Screen 
          name="CauliflowerFriedRice" 
          component={CauliflowerFriedRice}
          options={{ title: 'ข้าวผัดดอกกะหล่ำ' }}
        />
        <Stack.Screen 
          name="FriedCauliflowerGarlic" 
          component={FriedCauliflowerGarlic}
          options={{ title: 'ดอกกะหล่ำทอดกระเทียม' }}
        />

        {/* Cherry Menu Screens */}
        <Stack.Screen 
          name="CherryJelly" 
          component={CherryJelly}
          options={{ title: 'เชอร์รี่เยลลี่' }}
        />
        <Stack.Screen 
          name="CherrySmoothie" 
          component={CherrySmoothie}
          options={{ title: 'สมูทตี้เชอร์รี่' }}
        />
        <Stack.Screen 
          name="CherryTrifle" 
          component={CherryTrifle}
          options={{ title: 'เชอร์รี่ทรีเฟิล' }}
        />

        {/* Corn Menu Screens */}
        <Stack.Screen 
          name="CornButter" 
          component={CornButter}
          options={{ title: 'ข้าวโพดอบเนย' }}
        />
        <Stack.Screen 
          name="CornFritters" 
          component={CornFritters}
          options={{ title: 'ข้าวโพดทอด' }}
        />
        <Stack.Screen 
          name="CornSoup" 
          component={CornSoup}
          options={{ title: 'ซุปข้าวโพด' }}
        />

        {/* Cucumber Menu Screens */}
        <Stack.Screen 
          name="CucumberSmoothie" 
          component={CucumberSmoothie}
          options={{ title: 'สมูทตี้แตงกวา' }}
        />
        <Stack.Screen 
          name="SpicyCucumberSalad" 
          component={SpicyCucumberSalad}
          options={{ title: 'ยำแตงกวา' }}
        />
        <Stack.Screen 
          name="StirFriedCucumberEgg" 
          component={StirFriedCucumberEgg}
          options={{ title: 'แตงกวาผัดไข่' }}
        />

        {/* Eggplant Menu Screens */}
        <Stack.Screen 
          name="FriedEggplantEgg" 
          component={FriedEggplantEgg}
          options={{ title: 'มะเขือยาวทอดไข่' }}
        />
        <Stack.Screen 
          name="SpicyEggplantSaladShrimp" 
          component={SpicyEggplantSaladShrimp}
          options={{ title: 'ยำมะเขือยาวกุ้ง' }}
        />
        <Stack.Screen 
          name="StirFriedEggplantPork" 
          component={StirFriedEggplantPork}
          options={{ title: 'มะเขือยาวผัดหมู' }}
        />

        {/* Grape Menu Screens */}
        <Stack.Screen 
          name="BananaGrapeCake" 
          component={BananaGrapeCake}
          options={{ title: 'เค้กกล้วยองุ่น' }}
        />
        <Stack.Screen 
          name="KyohoGrape" 
          component={KyohoGrape}
          options={{ title: 'องุ่นเคียวโฮ' }}
        />
        <Stack.Screen 
          name="TunaGrape" 
          component={TunaGrape}
          options={{ title: 'ทูน่าองุ่น' }}
        />

        {/* Lemon Menu Screens */}
        <Stack.Screen 
          name="Lemonade" 
          component={Lemonade}
          options={{ title: 'น้ำมะนาว' }}
        />
        <Stack.Screen 
          name="LemonChicken" 
          component={LemonChicken}
          options={{ title: 'ไก่มะนาว' }}
        />
        <Stack.Screen 
          name="LemonTart" 
          component={LemonTart}
          options={{ title: 'ทาร์ตมะนาว' }}
        />

        {/* Mango Menu Screens */}
        <Stack.Screen 
          name="DriedMangoPaste" 
          component={DriedMangoPaste}
          options={{ title: 'มะม่วงกวน' }}
        />
        <Stack.Screen 
          name="MangoPuddingMousse" 
          component={MangoPuddingMousse}
          options={{ title: 'มูสมะม่วงพุดดิ้ง' }}
        />
        <Stack.Screen 
          name="MangoYogurtSmoothie" 
          component={MangoYogurtSmoothie}
          options={{ title: 'สมูทตี้มะม่วงโยเกิร์ต' }}
        />

        {/* Nut Menu Screens */}
        <Stack.Screen 
          name="HoneyRoastedCashews" 
          component={HoneyRoastedCashews}
          options={{ title: 'เมล็ดมะม่วงหิมพานต์อบน้ำผึ้ง' }}
        />
        <Stack.Screen 
          name="MixedNutSalad" 
          component={MixedNutSalad}
          options={{ title: 'สลัดถั่วรวม' }}
        />
        <Stack.Screen 
          name="WalnutBrownies" 
          component={WalnutBrownies}
          options={{ title: 'บราวนี่วอลนัท' }}
        />

        {/* Onion Menu Screens */}
        <Stack.Screen 
          name="FrenchOnionSoup" 
          component={FrenchOnionSoup}
          options={{ title: 'ซุปหอมใหญ่ฝรั่งเศส' }}
        />
        <Stack.Screen 
          name="JapaneseOnionSalad" 
          component={JapaneseOnionSalad}
          options={{ title: 'สลัดหอมใหญ่ญี่ปุ่น' }}
        />
        <Stack.Screen 
          name="OnionRings" 
          component={OnionRings}
          options={{ title: 'หอมใหญ่ทอด' }}
        />

        {/* Orange Menu Screens */}
        <Stack.Screen 
          name="JellyOrange" 
          component={JellyOrange}
          options={{ title: 'ส้มเยลลี่' }}
        />
        <Stack.Screen 
          name="JuiceOrange" 
          component={JuiceOrange}
          options={{ title: 'น้ำส้ม' }}
        />
        <Stack.Screen 
          name="SomChengLoiKaew" 
          component={SomChengLoiKaew}
          options={{ title: 'ส้มเช้งลอยแก้ว' }}
        />

        {/* Papaya Menu Screens */}
        <Stack.Screen 
          name="FriedPapaya" 
          component={FriedPapaya}
          options={{ title: 'มะละกอทอด' }}
        />
        <Stack.Screen 
          name="PapayaSmoothie" 
          component={PapayaSmoothie}
          options={{ title: 'สมูทตี้มะละกอ' }}
        />
        <Stack.Screen 
          name="StirFriedPapaya" 
          component={StirFriedPapaya}
          options={{ title: 'มะละกอผัด' }}
        />

        {/* Potato Menu Screens */}
        <Stack.Screen 
          name="BakedPotatoCheese" 
          component={BakedPotatoCheese}
          options={{ title: 'มันฝรั่งอบชีส' }}
        />
        <Stack.Screen 
          name="GarlicButterCheese" 
          component={GarlicButterCheese}
          options={{ title: 'มันฝรั่งกระเทียมเนยชีส' }}
        />
        <Stack.Screen 
          name="MashedPotatoes" 
          component={MashedPotatoes}
          options={{ title: 'มันฝรั่งบด' }}
        />

        {/* Pumpkin Menu Screens */}
        <Stack.Screen 
          name="PumpkinCustard" 
          component={PumpkinCustard}
          options={{ title: 'คัสตาร์ดฟักทอง' }}
        />
        <Stack.Screen 
          name="PumpkinSoup" 
          component={PumpkinSoup}
          options={{ title: 'ซุปฟักทอง' }}
        />
        <Stack.Screen 
          name="StirFriedPumpkinEgg" 
          component={StirFriedPumpkinEgg}
          options={{ title: 'ฟักทองผัดไข่' }}
        />

        {/* Tomato Menu Screens */}
        <Stack.Screen 
          name="Shakshuka" 
          component={Shakshuka}
          options={{ title: 'ชักชูก้า' }}
        />
        <Stack.Screen 
          name="TomatoBruschetta" 
          component={TomatoBruschetta}
          options={{ title: 'บรูสเชตต้ามะเขือเทศ' }}
        />
        <Stack.Screen 
          name="TomatoSoup" 
          component={TomatoSoup}
          options={{ title: 'ซุปมะเขือเทศ' }}
        />

        {/* Zucchini Menu Screens */}
        <Stack.Screen 
          name="FriedZucchini" 
          component={FriedZucchini}
          options={{ title: 'ซูกินีทอด' }}
        />
        <Stack.Screen 
          name="StirFriedZucchiniEgg" 
          component={StirFriedZucchiniEgg}
          options={{ title: 'ซูกินีผัดไข่' }}
        />
        <Stack.Screen 
          name="ZucchiniSoup" 
          component={ZucchiniSoup}
          options={{ title: 'ซุปซูกินี' }}
        />

        {/* Bell Pepper Menu Screens */}
        <Stack.Screen 
          name="StuffedBellPeppers" 
          component={StuffedBellPeppers}
          options={{ title: 'พริกหยวกยัดไส้' }}
        />
        <Stack.Screen 
          name="SweetSourStirFry" 
          component={SweetSourStirFry}
          options={{ title: 'ผัดเปรี้ยวหวาน' }}
        />

        {/* Banana Menu Screens */}
        <Stack.Screen 
          name="Banana" 
          component={BananaScreen}
          options={{ title: 'กล้วย' }}
        />
        <Stack.Screen 
          name="MenuBanana" 
          component={MenuBanana}
          options={{ title: 'เมนูกล้วย' }}
        />
        <Stack.Screen 
          name="BananaCake" 
          component={BananaCake}
          options={{ title: 'เค้กกล้วย' }}
        />
        <Stack.Screen 
          name="CaramelBananaToast" 
          component={CaramelBananaToast}
          options={{ title: 'กล้วยคาราเมลโทสต์' }}
        />
        <Stack.Screen 
          name="ButteredBanana" 
          component={ButteredBanana}
          options={{ title: 'กล้วยน้ำว้าหน้าปลา' }}
        />

        {/* Menu Screens */}
        <Stack.Screen name="MenuApple" component={MenuApple} />
        <Stack.Screen name="MenuAvocado" component={MenuAvocado} />
        <Stack.Screen name="MenuBean" component={MenuBean} />
        <Stack.Screen name="MenuBellPepper" component={MenuBellPepper} />
        <Stack.Screen name="MenuBitterGourd" component={MenuBitterGourd} />
        <Stack.Screen name="MenuBlackberry" component={MenuBlackberry} />
        <Stack.Screen name="MenuBroccoli" component={MenuBroccoli} />
        <Stack.Screen name="MenuCabbage" component={MenuCabbage} />
        <Stack.Screen name="MenuCantaloupe" component={MenuCantaloupe} />
        <Stack.Screen name="MenuCarrot" component={MenuCarrot} />
        <Stack.Screen name="MenuCauliflower" component={MenuCauliflower} />
        <Stack.Screen name="MenuCherry" component={MenuCherry} />
        <Stack.Screen name="MenuCorn" component={MenuCorn} />
        <Stack.Screen name="MenuCucumber" component={MenuCucumber} />
        <Stack.Screen name="MenuEggplant" component={MenuEggplant} />
        <Stack.Screen name="MenuGrape" component={MenuGrape} />
        <Stack.Screen name="MenuLemon" component={MenuLemon} />
        <Stack.Screen name="MenuMango" component={MenuMango} />
        <Stack.Screen name="MenuNut" component={MenuNut} />
        <Stack.Screen name="MenuOnion" component={MenuOnion} />
        <Stack.Screen name="MenuOrange" component={MenuOrange} />
        <Stack.Screen name="MenuPapaya" component={MenuPapaya} />
        <Stack.Screen name="MenuPotato" component={MenuPotato} />
        <Stack.Screen name="MenuPumpkin" component={MenuPumpkin} />
        <Stack.Screen name="MenuTomato" component={MenuTomato} />
        <Stack.Screen name="MenuZucchini" component={MenuZucchini} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;