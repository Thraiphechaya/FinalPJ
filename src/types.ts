import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UIManager } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Tabbar: undefined;
  Snap: undefined;
  Favorite: undefined;
  Search: undefined;
  Debug : undefined;
  
  Detail: {
    itemId: number;
    itemType: 'vegetable' | 'fruit';
    itemName: string;
    itemDescription: string;
    itemPicture: string;
    isFavorite: boolean;
    userId: number;
  };
  Onboarding: undefined;
  Profile: undefined;
  PredictionResult: {
    prediction: {
      predictions?: Array<{
        class: string;
        confidence: number;
      }>;
      class?: string;
      confidence?: number;
    };
    imageUri: string;
  };

  // ผลไม้
  Strawberry: undefined;
  MenuStrawberry: undefined;
  SmoothieStrawberry: undefined;
  FreshStrawberryMilk: undefined;
  StrawberryIceCream: undefined;

  Apple :undefined;
  ApplePie : undefined;
  AppleSalad : undefined;
  AppleTart : undefined;

  Avocado :undefined;
  AvocadoEggToast :undefined;
  AvocadoMilk: undefined;
  BakedAvocado :undefined;

  Bean : undefined;
  MapoTofu : undefined;
  RedBeanSweetSoup : undefined;
  StirFriedPeasShrimp: undefined;

  Bitter: undefined;
  BraisedBitterGourdPorkRibs : undefined;
  StirFriedBitterGourdEgg : undefined;
  StuffedBitterGourdSoup : undefined;

  Blackberry :undefined;
  BlackberryCrumble : undefined;
  BlackberryJam : undefined;
  BlackberrySmoothie : undefined;

  Broccoli :undefined;
  BroccoliFriedRice : undefined;
  BroccoliShrimpStirfry : undefined;
  CreamBroccoliSoup :undefined;

  Cabbage : undefined;
  CabbagePorkSoup : undefined;
  JadeDragonSteamEgg : undefined;
  MicrowaveCabbageFishSauce : undefined;

  Cantaloupe : undefined;
  CantaloupeMilkSmoothie : undefined;
  CantaloupeIceCream : undefined;
  CantaloupeSalad : undefined;

  Carrot : undefined;
  CarrotCake : undefined;
  CarrotOrangeSmoothie : undefined;
  CarrotSoup : undefined;

  Cauliflower : undefined;
  CauliflowerCheeseBake :undefined;
  CauliflowerFriedRice : undefined;
  FriedCauliflowerGarlic : undefined;

  Cherry : undefined;
  CherryJelly : undefined;
  CherrySmoothie : undefined;
  CherryTrifle : undefined;

  Corn: undefined;
  CornButter :undefined;
  CornFritters : undefined;
  CornSoup : undefined;

  CucumberSmoothie: undefined;
  Cucumber: undefined ;
  SpicyCucumberSalad :undefined;
  StirFriedCucumberEgg : undefined;

  Eggplant :undefined;
  FriedEggplantEgg: undefined;
  SpicyEggplantSaladShrimp : undefined;
  StirFriedEggplantPork: undefined;

  Grape: undefined;
  BananaGrapeCake : undefined;
  KyohoGrape : undefined;
  TunaGrape: undefined;

  Lemon: undefined;
  Lemonade: undefined;
  LemonChicken: undefined;
  LemonTart : undefined;

  Mango: undefined;
  DriedMangoPaste : undefined;
  MangoPuddingMousse : undefined;
  MangoYogurtSmoothie : undefined;

  Nut : undefined;
  HoneyRoastedCashews : undefined;
  MixedNutSalad : undefined;
  WalnutBrownies : undefined;

  Onion: undefined;
  FrenchOnionSoup: undefined;
  JapaneseOnionSalad : undefined;
  OnionRings : undefined;

  Orange :undefined;
  JellyOrange : undefined;
  JuiceOrange : undefined;
  SomChengLoiKaew : undefined;

  Papaya : undefined;
  FriedPapaya :undefined;
  PapayaSmoothie: undefined;
  StirFriedPapaya : undefined;

  Potato : undefined;
  BakedPotatoCheese : undefined;
  GarlicButterCheese : undefined;
  MashedPotatoes : undefined;

  Pumpkin : undefined;
  PumpkinCustard : undefined;
  PumpkinSoup: undefined;
  StirFriedPumpkinEgg : undefined;

  Tomato : undefined;
  Shakshuka : undefined;
  TomatoBruschetta : undefined;
  TomatoSoup : undefined;

  Zucchini : undefined;
  FriedZucchini : undefined;
  StirFriedZucchiniEgg : undefined;
  ZucchiniSoup : undefined;

  BellPeper: undefined;
  StuffedBellPeppers : undefined;
  StuffBellPeppers : undefined;
  SweetSourStirFry : undefined;

  Banana: undefined;
  MenuBanana: undefined;
  BananaCake: undefined;
  CaramelBananaToast: undefined;
  ButteredBanana: undefined;

  // เพิ่มผลไม้ทั้งหมด
  MenuApple: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuAvocado: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuBlackberry: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuCantaloupe: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuCherry: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuGrape: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuLemon: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuMango: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuOrange: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuPapaya: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };

  // เพิ่มผักทั้งหมด
  MenuBean: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuBellPepper: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuBitterGourd: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuBroccoli: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuCabbage: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuCarrot: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuCauliflower: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuCorn: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuCucumber: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuEggplant: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuNut: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuOnion: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuPotato: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuPumpkin: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuTomato: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
  MenuZucchini: {
    foodName: string;
    foodType: string;
    foodId?: number;
    foodPicture?: string;
  };
};

// Navigation prop types
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
export type SnapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Snap'>;
export type PredictionResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PredictionResult'>;

// เพิ่ม Navigation prop types สำหรับเมนูอาหาร
export type MenuAppleNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MenuApple'>;
export type MenuBananaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MenuBanana'>;
export type MenuOrangeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MenuOrange'>;
// ... สามารถเพิ่ม type อื่นๆ ตามต้องการ