// types.ts
export type RootStackParamList = {
  // Main & Authentication
  Home: undefined;
  Snap: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;

  
   Detail: { 
    fruitName: string;
  };
  
  // Prediction Flow
  PredictionResult: {
    prediction: {
      class: string;
      confidence: number;
    };
    imageUri: string;

    
  };
  
  
  // Fruit Detail Screens - ผลไม้ 14 ชนิด
  AppleScreen: undefined;
  AvocadoScreen: undefined;
  BananaScreen: undefined;
  BlackberryScreen: undefined;
  CantaloupeScreen: undefined;
  CherryScreen: undefined;
  CornScreen: undefined;
  GrapeScreen: undefined;
  MangoScreen: undefined;
  NutScreen: undefined;
  OrangeScreen: undefined;
  PapayaScreen: undefined;
  PumpkinScreen: undefined;
  StrawberryScreen: undefined;
  
  // Vegetable Detail Screens - ผัก 13 ชนิด
  BeanScreen: undefined;
  BellPepperScreen: undefined;
  BitterGourdScreen: undefined;
  BroccoliScreen: undefined;
  CabbageScreen: undefined;
  CarrotScreen: undefined;
  CauliflowerScreen: undefined;
  EggplantScreen: undefined;
  LemonScreen: undefined;
  OnionScreen: undefined;
  PotatoScreen: undefined;
  TomatoScreen: undefined;
  ZucchiniScreen: undefined;
  CucumberScreen: undefined;
  
  // Menu Screens - เมนูแนะนำ
  MenuApple: undefined;
  MenuAvocado: undefined;
  MenuBanana: undefined;
  MenuBlackberry: undefined;
  MenuCantaloupe: undefined;
  MenuCherry: undefined;
  MenuCorn: undefined;
  MenuGrape: undefined;
  MenuMango: undefined;
  MenuNut: undefined;
  MenuOrange: undefined;
  MenuPapaya: undefined;
  MenuPumpkin: undefined;
  MenuStrawberry: undefined;
  
  MenuBean: undefined;
  MenuBellPepper: undefined;
  MenuBitterGourd: undefined;
  MenuBroccoli: undefined;
  MenuCabbage: undefined;
  MenuCarrot: undefined;
  MenuCauliflower: undefined;
  MenuEggplant: undefined;
  MenuLemon: undefined;
  MenuOnion: undefined;
  MenuPotato: undefined;
  MenuTomato: undefined;
  MenuZucchini: undefined;
  MenuCucumber: undefined;
  
  // Recipe Detail Screens - รายละเอียดอาหาร
  MenuDetail: { 
    menu: { 
      id: number; 
      name: string; 
      image: string; 
      detail: string; 
    } 
  };
  
  
  // Existing Recipe Screens (ที่มีอยู่แล้ว)
  StrawberryIceCream: undefined;
  FreshStrawberryMilk: undefined;
  SmoothieStrawberry: undefined;

  //--Banana Menu--
  BananaCake: undefined;
  CaramelBananaToast: undefined;
  ButteredBanana: undefined;

   //--Orange Menu--
  JuiceOrange: undefined;
  JellyOrange: undefined;
  SomChengLoiKaew: undefined;

  //--Apple Menu--
  AppleSalad: undefined;
  AppleTart: undefined;
  ApplePie: undefined;

  //--Papaya Menu
  PapayaSmootie: undefined;
  FriedPapaya: undefined;
  StirFriedPapayaWithEgg:undefined;

  //--Grape Menu
  KyohoGrape:undefined;
  TunaGrape:undefined;
  BananaGrapeCake:undefined;

  //Avocado Menu
  BakedAvocadoFries:undefined;
  AvocadoEggToast:undefined;
  AvocadoMilk:undefined;

  //Cherry Menu
  CherryJelly: undefined;
  CherrySmoothie: undefined;
  CherryTrifle: undefined;

  //Mango Menu
  MangoPuddingMousse: undefined;
  DriedMangoPaste: undefined;
  MangoYogurtSmoothie: undefined;

  //Tomato 
  Shakshuka: undefined;
  TomatoBruschetta: undefined;
  TomatoSoup: undefined;

  //Cabbage
  CabbagePorkSoup: undefined;
  JadeDragonSteamedEgg: undefined;
  MicrowaveCabbageFishSauce: undefined;

  //Brocoli
  BroccoliFriedRice: undefined;
  BroccoliShrimpStirFry: undefined;
  CreamBroccoliSoup: undefined;

  //Onion
  FrenchOnionSoup: undefined;
  JapaneseOnionSalad: undefined;
  OnionRings: undefined;

  //Cucumber
  SpicyCucumberSalad: undefined;
  StirFriedCucumberEgg: undefined;
  CucumberSmoothie: undefined;

  //Lemon
  Lemonade: undefined;
  LemonChicken: undefined;
  LemonTart: undefined;

  //Potato
  MashedPotatoes: undefined;
  BakedPotatoCheese: undefined;
  GarlicButterPotatoes: undefined;

  //Carrot
  CarrotCake: undefined;
  CarrotSoup: undefined;
  CarrotOrangeSmoothie: undefined;

  //Bellpepper
  StuffedBellPeppers: undefined;
  SweetSourStirFry: undefined;
  StirFryPorkBellPepper: undefined;

  //Corn
  CornButter: undefined;
  CornFrittes: undefined;
  CornSoup: undefined;

  //Eggplant
  FriedEggplantEgg:undefined;
  SpicyEggplantSaladShrimp: undefined;
  StirFriedEggplantPork: undefined;

  //BlackBerry
  BlackberryCrumble: undefined;
  BlackberryJam: undefined;
  BlackberrySmoothie: undefined;

  //Cantaloupe
  CantaloupeMilkSmoothie: undefined;
  CantaloupeSalad: undefined;
  CantaloupelceCream: undefined;

  //Zucchini
  StirFriedZucchiniEgg: undefined;
  FriedZucchini: undefined;
  ZucchiniSoup: undefined;

  //Cauliflower
  CauliflowerCheeseBake: undefined;
  FriedCauliflowerGarlic: undefined;
  CauliflowerFriedRice: undefined;

  //Beans
  StirFriedPeasShrimp: undefined;
  RedBeanSweetSoup: undefined;
  MapoTofu: undefined;

  //Pumpkin
  StirFriedPumpkinEgg: undefined;
  PumpkinCustard: undefined;
  PumpkinSoup: undefined;

  //BitterGourd
  StuffedBitterGourdSoup: undefined;
  StirFriedBitterGourdEgg: undefined;
  BraisedBitterGourdPorkRibs: undefined;

  //Nut
  MixedNutSalad: undefined;
  HoneyRoastedCashews: undefined;
  WalnutBrownies: undefined;

  

  





  
  














  
};

// Type helpers
export type FruitName = 
  | 'Apple' 
  | 'Avocado' 
  | 'Banana' 
  | 'Blackberry' 
  | 'Cantaloupe' 
  | 'Cherry' 
  | 'Corn' 
  | 'Grape' 
  | 'Mango' 
  | 'Nut' 
  | 'Orange' 
  | 'Papaya' 
  | 'Pumpkin' 
  | 'Strawberry';

export type VegetableName = 
  | 'Bean' 
  | 'Bellpeper' 
  | 'BitterGourd' 
  | 'Broccoli' 
  | 'Cabbage' 
  | 'Carrot' 
  | 'Cauliflower' 
  | 'Eggplant' 
  | 'Lemon' 
  | 'Onion' 
  | 'Potato' 
  | 'Tomato' 
  | 'Zucchini';

export type AllFoodName = FruitName | VegetableName;

// Type for mapping food names to screen names
export type FoodScreenMap = {
  [key in AllFoodName]: keyof RootStackParamList;
};