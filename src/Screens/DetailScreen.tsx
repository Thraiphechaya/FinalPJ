import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { supabase } from '../lib/supabase';

// Define types
type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface Vegetable {
  id: number;
  name: string;
  description: string;
  picture: string;
  createat?: string;
}

interface Fruit {
  id: number;
  name: string;
  description: string;
  picture: string;
  createat?: string;
}

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
  id: number;
  name: string;
  description: string;
  picture: string;
  type: 'fruit' | 'vegetable';
  taste: string;
  nutrition: NutritionItem[];
  benefits: BenefitItem[];
}

const DetailScreen: React.FC = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const route = useRoute<DetailScreenRouteProp>();
  
  const { 
    itemId, 
    itemType, 
    itemName, 
    itemDescription, 
    itemPicture, 
    isFavorite, 
    userId 
  } = route.params;

  const [food, setFood] = useState<FoodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ดึงข้อมูลจาก Supabase
  useEffect(() => {
    fetchFoodDetail();
  }, [itemId, itemType]);

  const fetchFoodDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching ${itemType} detail from Supabase - ID: ${itemId}`);

      let data;
      let error;

      if (itemType === 'vegetable') {
        ({ data, error } = await supabase
          .from('vegetable')
          .select('*')
          .eq('id', itemId)
          .single());
      } else {
        ({ data, error } = await supabase
          .from('fruit')
          .select('*')
          .eq('id', itemId)
          .single());
      }

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error(`${itemType} not found`);
      }

      console.log('Data from Supabase:', data);
      
      const transformedData: FoodData = {
        id: data.id,
        name: data.name,
        description: data.description,
        picture: data.picture,
        type: itemType,
        taste: getTasteFromName(data.name),
        nutrition: getNutritionFromType(data.name, itemType),
        benefits: getBenefitsFromType(data.name, itemType)
      };

      setFood(transformedData);
      
    } catch (error) {
      console.error('Error fetching food detail from Supabase:', error);
      setError('Failed to load food details from database');
      
      const fallbackData: FoodData = {
        id: itemId,
        name: itemName,
        description: itemDescription,
        picture: itemPicture,
        type: itemType,
        taste: 'รส...',
        nutrition: [
          { label: 'พลังงาน', value: 'กำลังพัฒนา', icon: 'fire' },
          { label: 'วิตามิน', value: 'กำลังพัฒนา', icon: 'fruit-citrus' },
        ],
        benefits: [
          { text: 'กำลังพัฒนาข้อมูล', icon: 'hammer-wrench' },
        ]
      };
      setFood(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // Function สำหรับไปหน้าเมนูอาหาร
  const handleMenuPress = () => {
    const foodName = food?.name || itemName;
    const foodType = food?.type || itemType;

    console.log(`Looking for menu for: ${foodName}`);

    // Mapping ชื่อผักผลไม้ไปยังหน้าเมนู
    const menuMapping: { [key: string]: string } = {
      // ผลไม้
      'apple': 'MenuApple',
      'แอปเปิ้ล': 'MenuApple',
      'avocado': 'MenuAvocado',
      'อะโวคาโด': 'MenuAvocado',
      'banana': 'MenuBanana',
      'กล้วย': 'MenuBanana',
      'blackberry': 'MenuBlackberry',
      'แบล็คเบอร์รี่': 'MenuBlackberry',
      'cantaloupe': 'MenuCantaloupe',
      'แคนตาลูป': 'MenuCantaloupe',
      'cherry': 'MenuCherry',
      'เชอร์รี่': 'MenuCherry',
      'grape': 'MenuGrape',
      'องุ่น': 'MenuGrape',
      'lemon': 'MenuLemon',
      'เลม่อน': 'MenuLemon',
      'มะนาว': 'MenuLemon',
      'mango': 'MenuMango',
      'มะม่วง': 'MenuMango',
      'orange': 'MenuOrange',
      'ส้ม': 'MenuOrange',
      'papaya': 'MenuPapaya',
      'มะละกอ': 'MenuPapaya',
      'strawberry': 'MenuStrawberry',
      'สตรอเบอร์รี่': 'MenuStrawberry',

      // ผัก
      'bean': 'MenuBean',
      'ถั่ว': 'MenuBean',
      'ถั่วลันเตา': 'MenuBean',
      'bellpepper': 'MenuBellPepper',
      'พริกหยวก': 'MenuBellPepper',
      'bittergourd': 'MenuBitterGourd',
      'มะระ': 'MenuBitterGourd',
      'broccoli': 'MenuBroccoli',
      'บรอกโคลี': 'MenuBroccoli',
      'cabbage': 'MenuCabbage',
      'กะหล่ำปลี': 'MenuCabbage',
      'carrot': 'MenuCarrot',
      'แครอท': 'MenuCarrot',
      'cauliflower': 'MenuCauliflower',
      'กะหล่ำดอก': 'MenuCauliflower',
      'corn': 'MenuCorn',
      'ข้าวโพด': 'MenuCorn',
      'cucumber': 'MenuCucumber',
      'แตงกวา': 'MenuCucumber',
      'eggplant': 'MenuEggplant',
      'มะเขือยาว': 'MenuEggplant',
      'มะเขือ': 'MenuEggplant',
      'onion': 'MenuOnion',
      'หัวหอม': 'MenuOnion',
      'potato': 'MenuPotato',
      'มันฝรั่ง': 'MenuPotato',
      'pumpkin': 'MenuPumpkin',
      'ฟักทอง': 'MenuPumpkin',
      'tomato': 'MenuTomato',
      'มะเขือเทศ': 'MenuTomato',
      'zucchini': 'MenuZucchini',
      'ซูกินี': 'MenuZucchini',
    };

    // หาชื่อเมนูที่ตรงกัน (ไม่สนใจตัวพิมพ์ใหญ่เล็ก)
    const foodNameLower = foodName.toLowerCase();
    const targetMenuKey = Object.keys(menuMapping).find(key => 
      foodNameLower.includes(key.toLowerCase())
    );

    if (targetMenuKey) {
      const menuScreen = menuMapping[targetMenuKey];
      console.log(`Navigating to: ${menuScreen} for ${foodName}`);
      
      navigation.navigate(menuScreen as any, {
        foodName: foodName,
        foodType: foodType,
        foodId: food?.id || itemId,
        foodPicture: food?.picture || itemPicture
      });
    } else {
      console.log(`No menu found for: ${foodName}`);
      Alert.alert(
        'กำลังพัฒนา', 
        `เมนูแนะนำสำหรับ ${foodName} กำลังอยู่ในขั้นตอนการพัฒนา`,
        [{ text: 'ตกลง' }]
      );
    }
  };

  // Helper functions สำหรับแปลงข้อมูล
  const getTasteFromName = (name: string): string => {
    const tasteMap: { [key: string]: string } = {
      'กล้วย': 'รสหวาน กลิ่นหอมเฉพาะตัว',
      'สตรอเบอร์รี่': 'รสเปรี้ยวอมหวาน กลิ่นหอมเฉพาะตัว',
      'แอปเปิ้ล': 'รสหวานกรอบ',
      'บรอกโคลี': 'รสจืดอมขมเล็กน้อย กรอบ',
      'แครอท': 'รสหวาน กรอบ',
      'มะเขือเทศ': 'รสเปรี้ยวอมหวาน',
      'มะม่วง': 'รสหวานอมเปรี้ยว',
      'ส้ม': 'รสหวานอมเปรี้ยว',
      'แตงโม': 'รสหวานสดชื่น',
      'สับปะรด': 'รสหวานอมเปรี้ยว',
      'ฝรั่ง': 'รสหวานกรอบ',
      'มะนาว': 'รสเปรี้ยว',
      'ทุเรียน': 'รสหวานมัน กลิ่นหอมเฉพาะตัว',
      'มังคุด': 'รสหวานอมเปรี้ยว',
      'ลำไย': 'รสหวาน',
      'ลิ้นจี่': 'รสหวาน',
      'เงาะ': 'รสหวาน',
      'ขนุน': 'รสหวานหอม',
      'อะโวคาโด': 'รสมันเนียน',
      'แบล็คเบอร์รี่': 'รสเปรี้ยวอมหวาน',
      'แคนตาลูป': 'รสหวานหอม',
      'เชอร์รี่': 'รสหวานอมเปรี้ยว',
      'องุ่น': 'รสหวาน',
      'เลม่อน': 'รสเปรี้ยว',
      'มะละกอ': 'รสหวานนุ่ม',
      'พริกหยวก': 'รสจืด กรอบ',
      'มะระ': 'รสขม',
      'กะหล่ำปลี': 'รสจืด กรอบ',
      'กะหล่ำดอก': 'รสจืด นุ่ม',
      'ข้าวโพด': 'รสหวาน',
      'แตงกวา': 'รสจืด กรอบ',
      'มะเขือยาว': 'รสนุ่มนวล',
      'หัวหอม': 'รสเผ็ดร้อน',
      'มันฝรั่ง': 'รสมัน',
      'ฟักทอง': 'รสหวานนุ่ม',
      'ซูกินี': 'รสจืด กรอบ',
    };
    return tasteMap[name] || 'รส...';
  };

  const getNutritionFromType = (name: string, type: 'fruit' | 'vegetable'): NutritionItem[] => {
    const nutritionData: { [key: string]: NutritionItem[] } = {
      'กล้วย': [
        { label: 'พลังงาน', value: '118 กิโลแคลอรี่', icon: 'fire' },
        { label: 'ใยอาหาร', value: '2.4 กรัม', icon: 'food-apple' },
        { label: 'โพแทสเซียม', value: '241 มิลลิกรัม', icon: 'atom' },
        { label: 'วิตามินซี', value: '13 มิลลิกรัม', icon: 'fruit-citrus' },
      ],
      'สตรอเบอร์รี่': [
        { label: 'พลังงาน', value: '33 กิโลแคลอรี่', icon: 'fire' },
        { label: 'วิตามินซี', value: '66 มิลลิกรัม', icon: 'fruit-citrus' },
        { label: 'ใยอาหาร', value: '3.0 กรัม', icon: 'food-apple' },
      ],
      'แอปเปิ้ล': [
        { label: 'พลังงาน', value: '52 กิโลแคลอรี่', icon: 'fire' },
        { label: 'ใยอาหาร', value: '2.4 กรัม', icon: 'food-apple' },
        { label: 'วิตามินซี', value: '4.6 มิลลิกรัม', icon: 'fruit-citrus' },
      ],
      'บรอกโคลี': [
        { label: 'พลังงาน', value: '34 กิโลแคลอรี่', icon: 'fire' },
        { label: 'วิตามินซี', value: '89.2 มิลลิกรัม', icon: 'fruit-citrus' },
        { label: 'แคลเซียม', value: '47 มิลลิกรัม', icon: 'bone' },
      ],
      'แครอท': [
        { label: 'พลังงาน', value: '41 กิโลแคลอรี่', icon: 'fire' },
        { label: 'วิตามินเอ', value: '835 ไมโครกรัม', icon: 'eye' },
        { label: 'เบต้าแคโรทีน', value: '8285 ไมโครกรัม', icon: 'carrot' },
      ],
    };
    
    return nutritionData[name] || [
      { label: 'พลังงาน', value: 'กำลังพัฒนา', icon: 'fire' },
      { label: 'วิตามิน', value: 'กำลังพัฒนา', icon: 'fruit-citrus' },
      { label: 'ใยอาหาร', value: 'กำลังพัฒนา', icon: 'food-apple' },
    ];
  };

  const getBenefitsFromType = (name: string, type: 'fruit' | 'vegetable'): BenefitItem[] => {
    const benefitsData: { [key: string]: BenefitItem[] } = {
      'กล้วย': [
        { text: 'บรรเทาอาหารท้องผูก', icon: 'stomach' },
        { text: 'บำรุงผิวพรรณ', icon: 'spa' },
        { text: 'ให้พลังงานเร็ว', icon: 'lightning-bolt' },
      ],
      'สตรอเบอร์รี่': [
        { text: 'อุดมด้วยวิตามินซี', icon: 'shield-check' },
        { text: 'ดีต่อสุขภาพหัวใจ', icon: 'heart' },
        { text: 'บำรุงสายตา', icon: 'eye' },
      ],
      'แอปเปิ้ล': [
        { text: 'ลดความเสี่ยงโรคหัวใจ', icon: 'heart' },
        { text: 'ช่วยควบคุมน้ำหนัก', icon: 'scale' },
        { text: 'บำรุงสมอง', icon: 'brain' },
      ],
      'บรอกโคลี': [
        { text: 'ต้านอนุมูลอิสระ', icon: 'shield-check' },
        { text: 'บำรุงกระดูก', icon: 'bone' },
        { text: 'ดีต่อระบบย่อยอาหาร', icon: 'stomach' },
      ],
      'แครอท': [
        { text: 'บำรุงสายตา', icon: 'eye' },
        { text: 'เสริมสร้างภูมิคุ้มกัน', icon: 'shield-check' },
        { text: 'ดีต่อสุขภาพผิว', icon: 'spa' },
      ],
    };
    
    return benefitsData[name] || [
      { text: 'กำลังพัฒนาข้อมูล', icon: 'hammer-wrench' },
    ];
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRetry = () => {
    fetchFoodDetail();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูลจาก Supabase...</Text>
      </View>
    );
  }

  if (error && !food) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle" size={64} color="#FF6B6B" />
        <Text style={styles.errorTitle}>เกิดข้อผิดพลาด</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>ลองอีกครั้ง</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!food) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>ไม่พบข้อมูล</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
            source={{ uri: food.picture }}
            style={styles.image}
            resizeMode="cover"
            onError={() => console.log('Image load error for:', food.name)}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>{food.name}</Text>
            
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

        {/* Description Section */}
        <View style={styles.descriptionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="information" size={24} color="#4CAF50" />
            <Text style={styles.sectionTitle}>คำอธิบาย</Text>
          </View>
          <Text style={styles.descriptionText}>{food.description}</Text>
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

        {/* Error Warning */}
        {error && (
          <View style={styles.warningCard}>
            <MaterialCommunityIcons name="alert" size={24} color="#FF9800" />
            <Text style={styles.warningText}>
              กำลังแสดงข้อมูลจากแหล่งข้อมูลสำรอง
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

// Styles (เหมือนเดิม)
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A4E4A0',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#2E7D32',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A4E4A0',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  descriptionCard: {
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
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  warningCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 14,
    color: '#E65100',
    flex: 1,
    fontWeight: '500',
  },
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