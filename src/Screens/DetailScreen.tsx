import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

// Define types
type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface NutritionItem {
  label: string;
  value: string;
  icon: string;
}

interface BenefitItem {
  text: string;
  icon: string;
}

interface FoodData {
  image: string;
  title: string;
  thaiName: string;
  type: 'fruit' | 'vegetable';
  taste: string;
  nutrition: NutritionItem[];
  benefits: BenefitItem[];
  menuScreen: keyof RootStackParamList;
}

interface FoodDataMap {
  [key: string]: FoodData;
}

// Mapping สำหรับแปลงชื่ออังกฤษเป็นไทย
const foodNameMapping: { [key: string]: string } = {
  // Fruits
  'Apple': 'แอปเปิ้ล',
  'Avocado': 'อาโวคาโด',
  'Banana': 'กล้วย',
  'Blackberry': 'แบล็กเบอร์รี่',
  'Cantaloupe': 'แคนตาลูป',
  'Cherry': 'เชอร์รี่',
  'Corn': 'ข้าวโพด',
  'Grape': 'องุ่น',
  'Mango': 'มะม่วง',
  'Nut': 'ถั่ว',
  'Orange': 'ส้ม',
  'Papaya': 'มะละกอ',
  'Pumpkin': 'ฟักทอง',
  'Strawberry': 'สตรอเบอร์รี่',
  
  // Vegetables
  'Bean': 'ถั่วฝักยาว',
  'Bellpeper': 'พริกหวาน',
  'BitterGourd': 'มะระ',
  'Broccoli': 'บรอกโคลี',
  'Cabbage': 'กะหล่ำปลี',
  'Carrot': 'แครอท',
  'Cauliflower': 'กะหล่ำดอก',
  'Eggplant': 'มะเขือยาว',
  'Lemon': 'มะนาว',
  'Onion': 'หัวหอม',
  'Potato': 'มันฝรั่ง',
  'Tomato': 'มะเขือเทศ',
  'Zucchini': 'ซูกินี'
};

// Mapping ไปยังหน้าจอต่างๆ
const foodToDetailScreenMap: { [key: string]: keyof RootStackParamList } = {
  // Fruits
  'Apple': 'AppleScreen',
  'Avocado': 'AvocadoScreen',
  'Banana': 'BananaScreen',
  'Blackberry': 'BlackberryScreen',
  'Cantaloupe': 'CantaloupeScreen',
  'Cherry': 'CherryScreen',
  'Corn': 'CornScreen',
  'Grape': 'GrapeScreen',
  'Mango': 'MangoScreen',
  'Nut': 'NutScreen',
  'Orange': 'OrangeScreen',
  'Papaya': 'PapayaScreen',
  'Pumpkin': 'PumpkinScreen',
  'Strawberry': 'StrawberryScreen',
  
  // Vegetables
  'Bean': 'BeanScreen',
  'Bellpeper': 'BellpeperScreen',
  'BitterGourd': 'BitterGourdScreen',
  'Broccoli': 'BroccoliScreen',
  'Cabbage': 'CabbageScreen',
  'Carrot': 'CarrotScreen',
  'Cauliflower': 'CauliflowerScreen',
  'Eggplant': 'EggplantScreen',
  'Lemon': 'LemonScreen',
  'Onion': 'OnionScreen',
  'Potato': 'PotatoScreen',
  'Tomato': 'TomatoScreen',
  'Zucchini': 'ZucchiniScreen',
};

const foodToMenuScreenMap: { [key: string]: keyof RootStackParamList } = {
  // Fruits
  'Apple': 'MenuApple',
  'Avocado': 'MenuAvocado',
  'Banana': 'MenuBanana',
  'Blackberry': 'MenuBlackberry',
  'Cantaloupe': 'MenuCantaloupe',
  'Cherry': 'MenuCherry',
  'Corn': 'MenuCorn',
  'Grape': 'MenuGrape',
  'Mango': 'MenuMango',
  'Nut': 'MenuNut',
  'Orange': 'MenuOrange',
  'Papaya': 'MenuPapaya',
  'Pumpkin': 'MenuPumpkin',
  'Strawberry': 'MenuStrawberry',
  
  // Vegetables
  'Bean': 'MenuBean',
  'Bellpeper': 'MenuBellpeper',
  'BitterGourd': 'MenuBitterGourd',
  'Broccoli': 'MenuBroccoli',
  'Cabbage': 'MenuCabbage',
  'Carrot': 'MenuCarrot',
  'Cauliflower': 'MenuCauliflower',
  'Eggplant': 'MenuEggplant',
  'Lemon': 'MenuLemon',
  'Onion': 'MenuOnion',
  'Potato': 'MenuPotato',
  'Tomato': 'MenuTomato',
  'Zucchini': 'MenuZucchini',
};

// ข้อมูลพื้นฐานสำหรับผักและผลไม้ทั้งหมด
const foodData: FoodDataMap = {
  // Fruits
  'Apple': {
    image: 'https://img.wongnai.com/p/1968x0/2020/01/15/8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a.jpg',
    title: 'แอปเปิ้ล',
    thaiName: 'แอปเปิ้ล',
    type: 'fruit',
    taste: 'รสหวานกรอบ',
    nutrition: [
      { label: 'พลังงาน', value: '52 กิโลแคลอรี่', icon: 'fire' },
      { label: 'ใยอาหาร', value: '2.4 กรัม', icon: 'food-apple' },
      { label: 'วิตามินซี', value: '4.6 มิลลิกรัม', icon: 'fruit-citrus' },
      { label: 'โพแทสเซียม', value: '107 มิลลิกรัม', icon: 'atom' },
    ],
    benefits: [
      { text: 'ดีต่อสุขภาพฟัน', icon: 'tooth' },
      { text: 'ช่วยควบคุมน้ำหนัก', icon: 'scale' },
      { text: 'บำรุงหัวใจ', icon: 'heart' },
    ],
    menuScreen: 'MenuApple'
  },
  'Banana': {
    image: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/30/20/2000007266230/2000007266230_1-20250314103554-.jpg',
    title: 'กล้วย',
    thaiName: 'กล้วย',
    type: 'fruit',
    taste: 'รสหวาน กลิ่นหอมเฉพาะตัว',
    nutrition: [
      { label: 'พลังงาน', value: '118 กิโลแคลอรี่', icon: 'fire' },
    { label: 'ไขมันทั้งหมด', value: '0.15 กรัม', icon: 'water' },
    { label: 'ใยอาหาร', value: '2,4 กรัม', icon: 'food-apple' },
    { label: 'คาร์โบไฮเดรต', value: '27.18 กรัม', icon: 'wheat' },
    { label: 'แคลเซียม', value: '7 มิลลิกรัม', icon: 'bone' },
    { label: 'ฟอสฟอรัส', value: '26 มิลลิกรัม', icon: 'periodic-table' },
    { label: 'ธาตุเหล็ก', value: '0.52 มิลลิกรัม', icon: 'magnet' },
    { label: 'โพแทสเซียม', value: '241 มิลลิกรัม', icon: 'atom' },
    { label: 'ทองแดง', value: '0.08 มิลลิกรัม', icon: 'copper' },
    { label: 'สังกะสี', value: '0.13 มิลลิกรัม', icon: 'zinc' },
    { label: 'วิตามินเอ', value: '3 ไมโครกรัม', icon: 'eye' },
    { label: 'วิตามินซี', value: '13 มิลลิกรัม', icon: 'fruit-citrus' },
    { label: 'น้ำตาลรวม', value: '18.47 กรัม', icon: 'candy' },
    { label: 'แมกนีเซียม', value: '25 มิลลิกรัม', icon: 'magnet-on' },
    { label: 'โปรตีนรวม', value: '0.78 กรัม', icon: 'protein' },
    ],
    benefits: [
      { text: 'บรรเทาอาหารท้องผูก', icon: 'stomach' },
      { text: 'บำรุงผิวพรรณ', icon: 'spa' },
      { text: 'ให้พลังงานเร็ว', icon: 'lightning-bolt' },
    ],
    menuScreen: 'MenuBanana'
  },
  'Strawberry': {
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg',
    title: 'สตรอเบอร์รี่',
    thaiName: 'สตรอเบอร์รี่',
    type: 'fruit',
    taste: 'รสเปรี้ยวอมหวาน กลิ่นหอมเฉพาะตัว',
    nutrition: [
      { label: 'พลังงาน', value: '33 กิโลแคลอรี่', icon: 'fire' },
    { label: 'ไขมันทั้งหมด', value: '0.30 กรัม', icon: 'water' },
    { label: 'ใยอาหาร', value: '3.0 กรัม', icon: 'food-apple' },
    { label: 'คาร์โบไฮเดรต', value: '5.45 กรัม', icon: 'wheat' },
    { label: 'แคลเซียม', value: '7 มิลลิกรัม', icon: 'bone' },
    { label: 'ฟอสฟอรัส', value: '23 มิลลิกรัม', icon: 'periodic-table' },
    { label: 'ธาตุเหล็ก', value: '0.31 มิลลิกรัม', icon: 'magnet' },
    { label: 'โพแทสเซียม', value: '145 มิลลิกรัม', icon: 'atom' },
    { label: 'ทองแดง', value: '0.06 มิลลิกรัม', icon: 'copper' },
    { label: 'สังกะสี', value: '0.14 มิลลิกรัม', icon: 'zinc' },
    { label: 'วิตามินเอ', value: '1 ไมโครกรัม', icon: 'eye' },
    { label: 'วิตามินซี', value: '66 มิลลิกรัม', icon: 'fruit-citrus' },
    { label: 'น้ำตาลรวม', value: '4.03 กรัม', icon: 'candy' },
    { label: 'แมกนีเซียม', value: '9 มิลลิกรัม', icon: 'magnet-on' },
    { label: 'โปรตีนรวม', value: '0.7 กรัม', icon: 'protein' },
    ],
    benefits: [
      { text: 'อุดมด้วยวิตามินซี', icon: 'shield-check' },
      { text: 'ดีต่อสุขภาพหัวใจ', icon: 'heart' },
      { text: 'บำรุงสายตา', icon: 'eye' },
    ],
    menuScreen: 'MenuStrawberry'
  },
  'Broccoli': {
    image: 'https://img.wongnai.com/p/1968x0/2021/07/15/8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a.jpg',
    title: 'บรอกโคลี',
    thaiName: 'บรอกโคลี',
    type: 'vegetable',
    taste: 'รสจืดอมขมเล็กน้อย กรอบ',
    nutrition: [
      { label: 'พลังงาน', value: '34 กิโลแคลอรี่', icon: 'fire' },
      { label: 'โปรตีน', value: '2.8 กรัม', icon: 'protein' },
      { label: 'วิตามินซี', value: '89 มิลลิกรัม', icon: 'fruit-citrus' },
      { label: 'วิตามินเค', value: '101 ไมโครกรัม', icon: 'leaf' },
    ],
    benefits: [
      { text: 'ต้านมะเร็ง', icon: 'shield-cross' },
      { text: 'บำรุงกระดูก', icon: 'bone' },
      { text: 'ดีต่อระบบย่อยอาหาร', icon: 'stomach' },
    ],
    menuScreen: 'MenuBroccoli'
  },
  'Carrot': {
    image: 'https://img.wongnai.com/p/1968x0/2020/05/20/8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a.jpg',
    title: 'แครอท',
    thaiName: 'แครอท',
    type: 'vegetable',
    taste: 'รสหวาน กรอบ',
    nutrition: [
      { label: 'พลังงาน', value: '41 กิโลแคลอรี่', icon: 'fire' },
      { label: 'วิตามินเอ', value: '835 ไมโครกรัม', icon: 'eye' },
      { label: 'เบต้าแคโรทีน', value: '8285 ไมโครกรัม', icon: 'carrot' },
      { label: 'ใยอาหาร', value: '2.8 กรัม', icon: 'food-apple' },
    ],
    benefits: [
      { text: 'บำรุงสายตา', icon: 'eye' },
      { text: 'ต้านอนุมูลอิสระ', icon: 'shield-sun' },
      { text: 'ดีต่อสุขภาพผิว', icon: 'face-woman' },
    ],
    menuScreen: 'MenuCarrot'
  },
  'Tomato': {
    image: 'https://img.wongnai.com/p/1968x0/2020/08/20/8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a.jpg',
    title: 'มะเขือเทศ',
    thaiName: 'มะเขือเทศ',
    type: 'vegetable',
    taste: 'รสเปรี้ยวอมหวาน',
    nutrition: [
      { label: 'พลังงาน', value: '18 กิโลแคลอรี่', icon: 'fire' },
      { label: 'วิตามินซี', value: '14 มิลลิกรัม', icon: 'fruit-citrus' },
      { label: 'ไลโคปีน', value: '2573 ไมโครกรัม', icon: 'atom' },
      { label: 'โพแทสเซียม', value: '237 มิลลิกรัม', icon: 'atom' },
    ],
    benefits: [
      { text: 'ต้านมะเร็ง', icon: 'shield-cross' },
      { text: 'บำรุงหัวใจ', icon: 'heart' },
      { text: 'ดีต่อสุขภาพผิว', icon: 'face-woman' },
    ],
    menuScreen: 'MenuTomato'
  },
  // สามารถเพิ่มข้อมูลผักและผลไม้อื่นๆ ตามต้องการ
};

// ข้อมูล default สำหรับอาหารที่ยังไม่มีข้อมูล
const defaultFoodData: FoodData = {
  image: 'https://img.wongnai.com/p/1968x0/2021/07/15/8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a.jpg',
  title: 'กำลังพัฒนา',
  thaiName: 'กำลังพัฒนา',
  type: 'fruit',
  taste: 'รส...',
  nutrition: [
    { label: 'พลังงาน', value: 'กำลังพัฒนา', icon: 'fire' },
    { label: 'วิตามิน', value: 'กำลังพัฒนา', icon: 'fruit-citrus' },
  ],
  benefits: [
    { text: 'กำลังพัฒนาข้อมูล', icon: 'hammer-wrench' },
  ],
  menuScreen: 'Home'
};

const DetailScreen: React.FC = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const route = useRoute<DetailScreenRouteProp>();
  const { fruitName } = route.params;

  // ดึงข้อมูลอาหารตามชื่อที่ได้รับจาก prediction
  const food = foodData[fruitName] || {
    ...defaultFoodData,
    title: foodNameMapping[fruitName] || fruitName,
    thaiName: foodNameMapping[fruitName] || fruitName
  };

  // ฟังก์ชันสำหรับไปยังเมนูแนะนำ
  const handleMenuPress = () => {
    const menuScreen = foodToMenuScreenMap[fruitName];
    
    if (menuScreen && menuScreen !== 'Home') {
      // ใช้ type assertion แบบปลอดภัย
      navigation.navigate(menuScreen as any);
    } else {
      Alert.alert(
        'กำลังพัฒนา', 
        `เมนูแนะนำสำหรับ ${food.title} กำลังอยู่ในขั้นตอนการพัฒนา`,
        [{ text: 'ตกลง' }]
      );
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: food.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>{food.title}</Text>
            
            {/* แสดงประเภท */}
            <View style={[
              styles.typeTag,
              food.type === 'fruit' ? styles.fruitType : styles.vegetableType
            ]}>
              <MaterialCommunityIcons 
                name={food.type === 'fruit' ? "fruit-cherries" : "sprout"} 
                size={14} 
                color="#fff" 
              />
              <Text style={styles.typeText}>
                {food.type === 'fruit' ? 'ผลไม้' : 'ผัก'}
              </Text>
            </View>
            
            <View style={styles.tasteTag}>
              <MaterialCommunityIcons name="silverware" size={14} color="#FF6B6B" />
              <Text style={styles.tasteText}>{food.taste}</Text>
            </View>
          </View>
        </View>

        {/* Nutrition Section */}
        <View style={styles.nutritionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="nutrition" size={24} color="#4CAF50" />
            <Text style={styles.sectionTitle}>คุณค่าทางโภชนาการ</Text>
          </View>
          <Text style={styles.sectionSubtitle}>ต่อ 100 กรัม</Text>
        
          <View style={styles.nutritionGrid}>
            {food.nutrition.map((item, index) => (
              <View key={index} style={styles.nutritionItem}>
                <View style={styles.nutritionIcon}>
                  <MaterialCommunityIcons name={item.icon as any} size={20} color="#4CAF50" />
                </View>
                <View style={styles.nutritionText}>
                  <Text style={styles.nutritionLabel}>{item.label}</Text>
                  <Text style={styles.nutritionValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Health Benefits */}
        <View style={styles.benefitsCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="heart-plus" size={24} color="#FF6B6B" />
            <Text style={styles.sectionTitle}>ประโยชน์ต่อสุขภาพ</Text>
          </View>
          <View style={styles.benefitsList}>
            {food.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <MaterialCommunityIcons name={benefit.icon as any} size={16} color="#4CAF50" />
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Info Text สำหรับข้อมูลที่กำลังพัฒนา */}
        {!foodData[fruitName] && (
          <View style={styles.developmentCard}>
            <MaterialCommunityIcons name="hammer-wrench" size={24} color="#FF9800" />
            <Text style={styles.developmentText}>
              ข้อมูลสำหรับ {food.title} กำลังอยู่ในขั้นตอนการพัฒนา
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Floating Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={handleMenuPress}
      >
        <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="#fff" />
        <Text style={styles.menuButtonText}>เมนูแนะนำ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4E4A0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  heroContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    gap: 4,
  },
  fruitType: {
    backgroundColor: '#FF9800',
  },
  vegetableType: {
    backgroundColor: '#4CAF50',
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tasteTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  tasteText: {
    fontSize: 14,
    color: '#FF6B6B',
    marginLeft: 6,
    fontWeight: '500',
  },
  nutritionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  benefitsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  developmentCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  developmentText: {
    fontSize: 14,
    color: '#E65100',
    flex: 1,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  nutritionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  nutritionText: {
    flex: 1,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
  },
  menuButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default DetailScreen;

/*ไปทำหน้าเมนูกับหน้ารายละเอียดอาหาร แล้วก็หารูปผักผลไม้และสารอาหารมา!!!*/