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
  BellpeperScreen: undefined;
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
  MenuBellpeper: undefined;
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
  BananaCake: undefined;
  CaramelBananaToast: undefined;
  ButteredBanana: undefined;
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