import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type BellPepperScreenNav = NativeStackNavigationProp<RootStackParamList, 'BellPepperScreen'>; 

const StuffedBellPeppers = () => { 
  const navigation = useNavigation<BellPepperScreenNav>();

  const fillingIngredients = [
    { name: 'หมูสับ', amount: '200 กรัม' },
    { name: 'วุ้นเส้น (แช่น้ำ ตัดสั้น)', amount: '50 กรัม' },
    { name: 'สามเกลอ (รากผักชี,กระเทียม,พริกไทย โขลก)', amount: '1 ช้อนโต๊ะ' },
    { name: 'ซีอิ๊วขาว', amount: '1.5 ช้อนโต๊ะ' },
    { name: 'น้ำตาลทราย', amount: '1 ช้อนชา' },
    { name: 'เห็ดหอมแห้ง (แช่น้ำ สับ)', amount: '2 ดอก (ไม่ใส่ก็ได้)' },
  ];
  
  const mainIngredients = [
    { name: 'พริกหยวก (คว้านไส้ออก)', amount: '3-4 เม็ด' },
    { name: 'น้ำซุป', amount: '1-2 ถ้วย (สำหรับนึ่ง/ตุ๋น)' },
    { name: 'ซีอิ๊วขาว (ปรุงรสน้ำซุป)', amount: '1 ช้อนโต๊ะ' },
    { name: 'ต้นหอม, ผักชี (สำหรับโรย)', amount: 'เล็กน้อย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'เตรียมไส้: ผสมหมูสับ, วุ้นเส้น, สามเกลอ, ซีอิ๊วขาว, น้ำตาล, เห็ดหอมสับ ในชาม นวดให้เข้ากันจนเหนียว'
    },
    { 
      number: 2, 
      text: 'เตรียมพริกหยวก: ล้างพริกหยวก ผ่าครึ่ง หรือผ่าด้านบน คว้านไส้และเมล็ดออกให้หมด'
    },
    { 
      number: 3, 
      text: 'นำไส้หมูที่เตรียมไว้ ยัดใส่ในพริกหยวกให้เต็ม (ไม่ต้องแน่นเกินไป)'
    },
    { 
      number: 4, 
      text: 'เรียงพริกหยวกยัดไส้ลงในหม้อ หรือภาชนะสำหรับนึ่ง'
    },
    { 
      number: 5, 
      text: 'เทน้ำซุปตามลงไป ปรุงรสน้ำซุปด้วยซีอิ๊วขาวเล็กน้อย'
    },
    { 
      number: 6, 
      text: 'นำไปตั้งไฟอ่อนๆ ตุ๋น หรือนำไปนึ่งในลังถึง ประมาณ 20-30 นาที จนพริกหยวกนิ่มและหมูสุก',
      tip: 'เคล็ดลับ: การตุ๋นด้วยไฟอ่อน จะทำให้พริกหยวกนุ่มและรสชาติเข้าเนื้อดีกว่า'
    },
    { 
      number: 7, 
      text: 'ตักใส่ชาม โรยหน้าด้วยต้นหอม ผักชี และพริกไทยป่น'
    },
    { 
      number: 8, 
      text: 'เสิร์ฟร้อนๆ กับข้าวสวย'
    },
  ];

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
            source={{
              uri: 'https://www.pim.in.th/images/all-side-dish-pork/stuffed-banana-pepper-with-pork/stuffed-banana-pepper-with-pork-01.jpg', // Wongnai Image
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>พริกหยวกยัดไส้หมูสับ</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#E8F5E9' }]}>
              {/* ใช้ไอคอน 'food' */}
              <MaterialCommunityIcons name="food" size={16} color="#4CAF50" />
              <Text style={[styles.tasteText, { color: '#4CAF50' }]}>นุ่มละมุน ไส้แน่น ซุปกลมกล่อม</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม</Text>
            <Text style={styles.timeValue}>15 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาปรุง</Text>
            <Text style={styles.timeValue}>30 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>2-3 ที่</Text>
          </View>
        </View>

        {/* Filling Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="pig" size={24} color="#E91E63" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมไส้หมู</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {fillingIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#E91E63' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {/* ใช้ไอคอน 'chili-mild' แทนพริกหยวก */}
            <MaterialCommunityIcons name="chili-mild" size={24} color="#4CAF50" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมหลัก</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#4CAF50' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="chef-hat" size={24} color="#FF6B6B" />
            <Text style={styles.sectionTitle}>วิธีทำ</Text>
          </View>
          <View style={styles.stepsList}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumberContainer}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{step.number}</Text>
                  </View>
                </View>
                {/* แก้ไข: ใส่ส่วนเช็ค tip กลับมา */}
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>{step.text}</Text>
                  {step.tip && (
                    <View style={styles.tipContainer}>
                      <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
                      <Text style={styles.tipText}>{step.tip}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tips Section (อัปเดตไอคอนตามคำขอ) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>เลือกพริกหยวกเม็ดอวบๆ ตรงๆ จะยัดไส้ได้ง่ายและสวยงาม</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>นวดหมูสับกับส่วนผสมให้นานหน่อย จะทำให้ไส้เหนียวนุ่ม ไม่แข็งกระด้าง</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4E4A0', // สีพื้นหลัง
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
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
  timeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timeItem: {
    alignItems: 'center',
    flex: 1,
  },
  timeSeparator: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    marginTop: 2,
  },
  ingredientsList: {
    marginTop: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  ingredientText: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  ingredientAmount: {
    fontSize: 12,
    color: '#666',
  },
  stepsList: {
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumberContainer: {
    marginRight: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#E65100',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
});

export default StuffedBellPeppers;