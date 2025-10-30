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

interface NutritionItem {
  label: string;
  value: string;
  icon: string;
}

interface BenefitItem {
  text: string;
  icon: string;
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

      console.log(`Fetching ${itemType} detail from Supabase - ID: ${itemId}, Type: ${itemType}`);

      if (!itemId || !itemType) {
        throw new Error('Missing item ID or type');
      }

      let data;
      let error;

      const tableName = itemType === 'vegetable' ? 'vegetable' : 'fruit';
      
      console.log(`Querying table: ${tableName} with ID: ${itemId}`);

      ({ data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', itemId)
        .single());

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        console.warn(`No data found for ${itemType} with ID: ${itemId}`);
        throw new Error(`${itemType} not found in database`);
      }

      console.log('Data from Supabase:', data);
      
      // ✅ ใช้ชื่ออาหารจากฐานข้อมูลเพื่อหาโภชนาการ
      const foodName = data.name || itemName;
      const transformedData: FoodData = {
        id: data.id || itemId || 0,
        name: foodName || "Unknown Food",
        description: data.description || itemDescription || "No description available",
        picture: data.picture || itemPicture || "",
        type: itemType || "vegetable",
        taste: getTasteFromName(foodName),
        nutrition: getNutritionFromType(foodName, itemType),
        benefits: getBenefitsFromType(foodName, itemType)
      };

      console.log('Transformed data:', transformedData); // ✅ Debug ข้อมูลที่แปลงแล้ว
      setFood(transformedData);
      
    } catch (error: any) {
      console.error('Error fetching food detail from Supabase:', error);
      
      if (error.code === 'PGRST116') {
        setError(`ไม่พบข้อมูล ${itemType} รหัส ${itemId} ในฐานข้อมูล`);
      } else if (error.message?.includes('not found')) {
        setError(`ไม่พบข้อมูล ${itemType} ในฐานข้อมูล`);
      } else {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล: ' + (error.message || 'Unknown error'));
      }
      
      // ✅ Fallback data ที่ปลอดภัย
      const fallbackData: FoodData = {
        id: itemId || 0,
        name: itemName || "Unknown Food",
        description: itemDescription || "No description available",
        picture: itemPicture || "",
        type: itemType || "vegetable",
        taste: getTasteFromName(itemName),
        nutrition: getNutritionFromType(itemName, itemType),
        benefits: getBenefitsFromType(itemName, itemType)
      };
      console.log('Fallback data:', fallbackData); // ✅ Debug fallback data
      setFood(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ฟังก์ชัน helper ที่ปลอดภัย - เพิ่มข้อมูลให้ครบ
  const getTasteFromName = (name: string): string => {
    if (!name || typeof name !== 'string') {
      return 'รส...';
    }
    
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
    
    return tasteMap[name] || 'รสอร่อย';
  };

  const getNutritionFromType = (name: string, type: 'fruit' | 'vegetable'): NutritionItem[] => {
    if (!name || typeof name !== 'string') {
      return [
        { label: 'กำลังพัฒนา', value: 'ข้อมูลไม่พร้อม', icon: 'hammer-wrench' }
      ];
    }
    
    const nutritionData: { [key: string]: NutritionItem[] } = {
      'กล้วย': [
        { label: 'พลังงาน', value: '89 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '22.8 กรัม', icon: 'food-apple' },
        { label: 'โปรตีน', value: '1.1 กรัม', icon: 'food-drumstick' },
        { label: 'ใยอาหาร', value: '2.6 กรัม', icon: 'wheat' },
        { label: 'โพแทสเซียม', value: '358 มก.', icon: 'atom' },
        { label: 'วิตามินบี6', value: '0.4 มก.', icon: 'pill' },
      ],
      'สตรอเบอร์รี่': [
        { label: 'พลังงาน', value: '32 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '7.7 กรัม', icon: 'food-apple' },
        { label: 'วิตามินซี', value: '58.8 มก.', icon: 'fruit-citrus' },
        { label: 'ใยอาหาร', value: '2.0 กรัม', icon: 'wheat' },
        { label: 'โฟเลต', value: '24 ไมโครกรัม', icon: 'leaf' },
      ],
      'แอปเปิ้ล': [
        { label: 'พลังงาน', value: '52 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '13.8 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '2.4 กรัม', icon: 'wheat' },
        { label: 'วิตามินซี', value: '4.6 มก.', icon: 'fruit-citrus' },
        { label: 'โพแทสเซียม', value: '107 มก.', icon: 'atom' },
      ],
      'บรอกโคลี': [
        { label: 'พลังงาน', value: '34 กิโลแคลอรี่', icon: 'fire' },
        { label: 'โปรตีน', value: '2.8 กรัม', icon: 'food-drumstick' },
        { label: 'ใยอาหาร', value: '2.6 กรัม', icon: 'wheat' },
        { label: 'วิตามินซี', value: '89.2 มก.', icon: 'fruit-citrus' },
        { label: 'วิตามินเค', value: '101.6 ไมโครกรัม', icon: 'pill' },
        { label: 'แคลเซียม', value: '47 มก.', icon: 'bone' },
      ],
      'แครอท': [
        { label: 'พลังงาน', value: '41 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '9.6 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '4.7 กรัม', icon: 'candy' },
        { label: 'วิตามินเอ', value: '835 ไมโครกรัม', icon: 'eye' },
        { label: 'เบต้าแคโรทีน', value: '8285 ไมโครกรัม', icon: 'carrot' },
        { label: 'วิตามินเค', value: '13.2 ไมโครกรัม', icon: 'pill' },
      ],
      'มะเขือเทศ': [
        { label: 'พลังงาน', value: '18 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '3.9 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '2.6 กรัม', icon: 'candy' },
        { label: 'วิตามินซี', value: '14 มก.', icon: 'fruit-citrus' },
        { label: 'วิตามินเอ', value: '42 ไมโครกรัม', icon: 'eye' },
        { label: 'ไลโคปีน', value: '2573 ไมโครกรัม', icon: 'atom' },
      ],
      'มะม่วง': [
        { label: 'พลังงาน', value: '60 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '15 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '13.7 กรัม', icon: 'candy' },
        { label: 'วิตามินซี', value: '36 มก.', icon: 'fruit-citrus' },
        { label: 'วิตามินเอ', value: '54 ไมโครกรัม', icon: 'eye' },
        { label: 'ใยอาหาร', value: '1.6 กรัม', icon: 'wheat' },
      ],
      'ส้ม': [
        { label: 'พลังงาน', value: '47 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '11.8 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '9.4 กรัม', icon: 'candy' },
        { label: 'วิตามินซี', value: '53.2 มก.', icon: 'fruit-citrus' },
        { label: 'ใยอาหาร', value: '2.4 กรัม', icon: 'wheat' },
        { label: 'โพแทสเซียม', value: '181 มก.', icon: 'atom' },
      ],
      // ✅ เพิ่มข้อมูลผักให้ครบ
      'ถั่ว': [
        { label: 'พลังงาน', value: '81 กิโลแคลอรี่', icon: 'fire' },
        { label: 'โปรตีน', value: '5.4 กรัม', icon: 'food-drumstick' },
        { label: 'ใยอาหาร', value: '5.1 กรัม', icon: 'wheat' },
        { label: 'วิตามินเอ', value: '35 ไมโครกรัม', icon: 'eye' },
        { label: 'วิตามินซี', value: '16.3 มก.', icon: 'fruit-citrus' },
      ],
      'พริกหยวก': [
        { label: 'พลังงาน', value: '31 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '6 กรัม', icon: 'food-apple' },
        { label: 'วิตามินซี', value: '127.7 มก.', icon: 'fruit-citrus' },
        { label: 'วิตามินเอ', value: '157 ไมโครกรัม', icon: 'eye' },
      ],
      'มะระ': [
        { label: 'พลังงาน', value: '17 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '3.7 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '2.8 กรัม', icon: 'wheat' },
        { label: 'วิตามินซี', value: '84 มก.', icon: 'fruit-citrus' },
      ],
      'กะหล่ำปลี': [
        { label: 'พลังงาน', value: '25 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '5.8 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '2.5 กรัม', icon: 'wheat' },
        { label: 'วิตามินซี', value: '36.6 มก.', icon: 'fruit-citrus' },
        { label: 'วิตามินเค', value: '76 ไมโครกรัม', icon: 'pill' },
      ],
      'กะหล่ำดอก': [
        { label: 'พลังงาน', value: '25 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '5.3 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '2.5 กรัม', icon: 'wheat' },
        { label: 'วิตามินซี', value: '48.2 มก.', icon: 'fruit-citrus' },
        { label: 'วิตามินเค', value: '15.5 ไมโครกรัม', icon: 'pill' },
      ],
      'ข้าวโพด': [
        { label: 'พลังงาน', value: '86 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '19 กรัม', icon: 'food-apple' },
        { label: 'โปรตีน', value: '3.2 กรัม', icon: 'food-drumstick' },
        { label: 'ใยอาหาร', value: '2.7 กรัม', icon: 'wheat' },
      ],
      'แตงกวา': [
        { label: 'พลังงาน', value: '15 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '3.6 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '1.7 กรัม', icon: 'candy' },
        { label: 'วิตามินเค', value: '16.4 ไมโครกรัม', icon: 'pill' },
      ],
      'มะเขือยาว': [
        { label: 'พลังงาน', value: '25 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '5.9 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '3 กรัม', icon: 'wheat' },
        { label: 'โฟเลต', value: '22 ไมโครกรัม', icon: 'leaf' },
      ],
      'หัวหอม': [
        { label: 'พลังงาน', value: '40 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '9.3 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '4.2 กรัม', icon: 'candy' },
        { label: 'วิตามินซี', value: '7.4 มก.', icon: 'fruit-citrus' },
      ],
      'มันฝรั่ง': [
        { label: 'พลังงาน', value: '77 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '17.5 กรัม', icon: 'food-apple' },
        { label: 'โปรตีน', value: '2 กรัม', icon: 'food-drumstick' },
        { label: 'วิตามินซี', value: '19.7 มก.', icon: 'fruit-citrus' },
        { label: 'โพแทสเซียม', value: '421 มก.', icon: 'atom' },
      ],
      'ฟักทอง': [
        { label: 'พลังงาน', value: '26 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '6.5 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '0.5 กรัม', icon: 'wheat' },
        { label: 'วิตามินเอ', value: '8510 หน่วยสากล', icon: 'eye' },
        { label: 'วิตามินซี', value: '9 มก.', icon: 'fruit-citrus' },
      ],
      'ซูกินี': [
        { label: 'พลังงาน', value: '17 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '3.1 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '1 กรัม', icon: 'wheat' },
        { label: 'วิตามินซี', value: '17.9 มก.', icon: 'fruit-citrus' },
      ],
      // ✅ เพิ่มข้อมูลผลไม้ให้ครบ
      'อะโวคาโด': [
        { label: 'พลังงาน', value: '160 กิโลแคลอรี่', icon: 'fire' },
        { label: 'ไขมัน', value: '14.7 กรัม', icon: 'oil' },
        { label: 'ใยอาหาร', value: '6.7 กรัม', icon: 'wheat' },
        { label: 'โพแทสเซียม', value: '485 มก.', icon: 'atom' },
        { label: 'วิตามินเค', value: '21 ไมโครกรัม', icon: 'pill' },
      ],
      'แบล็คเบอร์รี่': [
        { label: 'พลังงาน', value: '43 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '9.6 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '5.3 กรัม', icon: 'wheat' },
        { label: 'วิตามินซี', value: '21 มก.', icon: 'fruit-citrus' },
        { label: 'วิตามินเค', value: '19.8 ไมโครกรัม', icon: 'pill' },
      ],
      'แคนตาลูป': [
        { label: 'พลังงาน', value: '34 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '8.2 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '7.9 กรัม', icon: 'candy' },
        { label: 'วิตามินเอ', value: '169 ไมโครกรัม', icon: 'eye' },
        { label: 'วิตามินซี', value: '36.7 มก.', icon: 'fruit-citrus' },
      ],
      'เชอร์รี่': [
        { label: 'พลังงาน', value: '50 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '12.2 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '8.5 กรัม', icon: 'candy' },
        { label: 'วิตามินซี', value: '7 มก.', icon: 'fruit-citrus' },
        { label: 'โพแทสเซียม', value: '173 มก.', icon: 'atom' },
      ],
      'องุ่น': [
        { label: 'พลังงาน', value: '69 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '18.1 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '15.5 กรัม', icon: 'candy' },
        { label: 'วิตามินเค', value: '14.6 ไมโครกรัม', icon: 'pill' },
        { label: 'โพแทสเซียม', value: '191 มก.', icon: 'atom' },
      ],
      'เลม่อน': [
        { label: 'พลังงาน', value: '29 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '9.3 กรัม', icon: 'food-apple' },
        { label: 'ใยอาหาร', value: '2.8 กรัม', icon: 'wheat' },
        { label: 'วิตามินซี', value: '53 มก.', icon: 'fruit-citrus' },
      ],
      'มะละกอ': [
        { label: 'พลังงาน', value: '43 กิโลแคลอรี่', icon: 'fire' },
        { label: 'คาร์โบไฮเดรต', value: '11 กรัม', icon: 'food-apple' },
        { label: 'น้ำตาล', value: '7.8 กรัม', icon: 'candy' },
        { label: 'วิตามินซี', value: '60.9 มก.', icon: 'fruit-citrus' },
        { label: 'วิตามินเอ', value: '47 ไมโครกรัม', icon: 'eye' },
      ],
    };
    
    // ✅ ถ้าไม่พบข้อมูล ให้ใช้ข้อมูลพื้นฐาน
    return nutritionData[name] || [
      { label: 'พลังงาน', value: 'กำลังพัฒนา', icon: 'fire' },
      { label: 'คาร์โบไฮเดรต', value: 'กำลังพัฒนา', icon: 'food-apple' },
      { label: 'ใยอาหาร', value: 'กำลังพัฒนา', icon: 'wheat' },
      { label: 'วิตามิน', value: 'กำลังพัฒนา', icon: 'fruit-citrus' },
    ];
  };

  const getBenefitsFromType = (name: string, type: 'fruit' | 'vegetable'): BenefitItem[] => {
    if (!name || typeof name !== 'string') {
      return [
        { text: 'กำลังพัฒนาข้อมูล', icon: 'hammer-wrench' }
      ];
    }
    
    const benefitsData: { [key: string]: BenefitItem[] } = {
      'กล้วย': [
        { text: 'ช่วยในระบบย่อยอาหาร', icon: 'stomach' },
        { text: 'ให้พลังงานเร็ว', icon: 'lightning-bolt' },
        { text: 'บำรุงหัวใจ', icon: 'heart' },
        { text: 'ช่วยควบคุมความดันโลหิต', icon: 'heart-pulse' },
      ],
      'สตรอเบอร์รี่': [
        { text: 'อุดมด้วยวิตามินซี', icon: 'shield-check' },
        { text: 'ดีต่อสุขภาพหัวใจ', icon: 'heart' },
        { text: 'บำรุงสายตา', icon: 'eye' },
        { text: 'ต้านการอักเสบ', icon: 'shield-plus' },
      ],
      'แอปเปิ้ล': [
        { text: 'ลดความเสี่ยงโรคหัวใจ', icon: 'heart' },
        { text: 'ช่วยควบคุมน้ำหนัก', icon: 'scale' },
        { text: 'บำรุงสมอง', icon: 'brain' },
        { text: 'ดีต่อสุขภาพฟัน', icon: 'tooth' },
      ],
      'บรอกโคลี': [
        { text: 'ต้านอนุมูลอิสระ', icon: 'shield-check' },
        { text: 'บำรุงกระดูก', icon: 'bone' },
        { text: 'ดีต่อระบบย่อยอาหาร', icon: 'stomach' },
        { text: 'เสริมภูมิคุ้มกัน', icon: 'shield-plus' },
      ],
      'แครอท': [
        { text: 'บำรุงสายตา', icon: 'eye' },
        { text: 'เสริมสร้างภูมิคุ้มกัน', icon: 'shield-check' },
        { text: 'ดีต่อสุขภาพผิว', icon: 'spa' },
        { text: 'ลดความเสี่ยงมะเร็ง', icon: 'shield-plus' },
      ],
      'มะเขือเทศ': [
        { text: 'ลดความเสี่ยงมะเร็ง', icon: 'shield-check' },
        { text: 'บำรุงหัวใจ', icon: 'heart' },
        { text: 'ดีต่อผิวพรรณ', icon: 'spa' },
        { text: 'บำรุงสายตา', icon: 'eye' },
      ],
      'มะม่วง': [
        { text: 'บำรุงสายตา', icon: 'eye' },
        { text: 'เสริมภูมิคุ้มกัน', icon: 'shield-check' },
        { text: 'ช่วยระบบย่อยอาหาร', icon: 'stomach' },
        { text: 'ดีต่อสุขภาพผิว', icon: 'spa' },
      ],
      'ส้ม': [
        { text: 'เสริมสร้างภูมิคุ้มกัน', icon: 'shield-check' },
        { text: 'บำรุงผิวพรรณ', icon: 'spa' },
        { text: 'ลดความดันโลหิต', icon: 'heart' },
        { text: 'ดีต่อสุขภาพหัวใจ', icon: 'heart-pulse' },
      ],
      // ✅ เพิ่มข้อมูลประโยชน์ให้ครบ
      'ถั่ว': [
        { text: 'ช่วยลดคอเลสเตอรอล', icon: 'heart' },
        { text: 'ควบคุมน้ำตาลในเลือด', icon: 'needle' },
        { text: 'ดีต่อระบบย่อยอาหาร', icon: 'stomach' },
      ],
      'พริกหยวก': [
        { text: 'เสริมภูมิคุ้มกัน', icon: 'shield-check' },
        { text: 'บำรุงสายตา', icon: 'eye' },
        { text: 'ดีต่อสุขภาพผิว', icon: 'spa' },
      ],
      'มะระ': [
        { text: 'ควบคุมน้ำตาลในเลือด', icon: 'needle' },
        { text: 'ดีต่อตับ', icon: 'liver' },
        { text: 'ช่วยลดคอเลสเตอรอล', icon: 'heart' },
      ],
      'กะหล่ำปลี': [
        { text: 'ต้านการอักเสบ', icon: 'shield-plus' },
        { text: 'ดีต่อระบบย่อยอาหาร', icon: 'stomach' },
        { text: 'ช่วยลดน้ำหนัก', icon: 'scale' },
      ],
      // ... เพิ่มข้อมูล benefits อื่นๆ ตามรูปแบบด้านบน
    };
    
    return benefitsData[name] || [
      { text: 'อุดมด้วยวิตามินและแร่ธาตุ', icon: 'fruit-citrus' },
      { text: 'ดีต่อสุขภาพโดยรวม', icon: 'heart' },
      { text: 'ช่วยในการย่อยอาหาร', icon: 'stomach' },
      { text: 'เสริมสร้างภูมิคุ้มกัน', icon: 'shield-check' },
    ];
  };

  // ... ฟังก์ชันอื่นๆ เหมือนเดิม
  const handleMenuPress = () => {
    // ... โค้ดเดิม
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRetry = () => {
    fetchFoodDetail();
  };

  // ✅ เพิ่ม console.log เพื่อ debug
  useEffect(() => {
    if (food) {
      console.log('Food data for display:', {
        name: food.name,
        nutritionCount: food.nutrition.length,
        nutrition: food.nutrition,
        benefitsCount: food.benefits.length,
        benefits: food.benefits
      });
    }
  }, [food]);

  // ... JSX และ styles เหมือนเดิม
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
              {error}
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

// Styles เหมือนเดิม
const styles = StyleSheet.create({
  // ... styles ทั้งหมดตามเดิม
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