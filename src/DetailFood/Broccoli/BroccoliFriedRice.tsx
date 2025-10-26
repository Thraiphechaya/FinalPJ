import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type BroccoliScreenNav = NativeStackNavigationProp<RootStackParamList, 'BroccoliScreen'>; 

const BroccoliFriedRice = () => { 
  const navigation = useNavigation<BroccoliScreenNav>();

  const mainIngredients = [
    { name: 'ข้าวสวย (เย็น หรือค้างคืน)', amount: '1 ถ้วย' },
    { name: 'บรอกโคลี (หั่นชิ้นเล็ก)', amount: '1/2 ถ้วย' },
    { name: 'ไข่ไก่', amount: '1 ฟอง' },
    { name: 'กระเทียม (สับ)', amount: '1 ช้อนชา' },
    { name: 'หอมใหญ่ (หั่นเต๋าเล็ก)', amount: '1/4 หัว' },
    { name: 'แครอท (หั่นเต๋าเล็ก)', amount: '1/4 ถ้วย' },
    { name: 'ซีอิ๊วขาว หรือ ซอสปรุงรส', amount: '1-2 ช้อนโต๊ะ' },
    { name: 'น้ำตาลทราย', amount: '1/2 ช้อนชา (ตัดรส)' },
    { name: 'น้ำมันพืช', amount: '2 ช้อนโต๊ะ' },
    { name: 'พริกไทยป่น', amount: 'เล็กน้อย' },
    { name: 'ต้นหอมซอย (สำหรับโรย)', amount: 'เล็กน้อย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ตั้งกระทะ ใส่น้ำมันพืช ใช้ไฟกลางค่อนข้างแรง'
    },
    { 
      number: 2, 
      text: 'พอน้ำมันร้อน ใส่กระเทียมลงไปเจียวให้หอม'
    },
    { 
      number: 3, 
      text: 'ใส่หอมใหญ่ และแครอท ผัดให้นิ่มเล็กน้อย'
    },
    { 
      number: 4, 
      text: 'ตอกไข่ไก่ใส่ลงไป ยีไข่ให้พอแตก ผัดให้ไข่สุก'
    },
    { 
      number: 5, 
      text: 'ใส่บรอกโคลีหั่นชิ้นเล็กลงไป ผัดให้พอสลด'
    },
    { 
      number: 6, 
      text: 'ใส่ข้าวสวยเย็นลงไป ใช้ตะหลิวยีข้าวให้กระจายตัว ไม่จับเป็นก้อน'
    },
    { 
      number: 7, 
      text: 'ปรุงรสด้วยซีอิ๊วขาว และน้ำตาลทราย'
    },
    { 
      number: 8, 
      text: 'เร่งไฟแรง ผัดคลุกเคล้าให้ส่วนผสมทุกอย่างเข้ากันดี และข้าวมีกลิ่นหอมกระทะ (ประมาณ 1-2 นาที)'
    },
    { 
      number: 9, 
      text: 'ปิดไฟ โรยพริกไทยป่น และต้นหอมซอย คลุกเคล้าเบาๆ'
    },
    { 
      number: 10, 
      text: 'ตักใส่จาน เสิร์ฟร้อนๆ อาจมีมะนาวฝานและแตงกวาเคียง'
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
              uri: 'https://www.lemon8-app.com/seo/image?item_id=7222886304244154881&index=3&sign=c395502e7d92aa23f3475e0ff68d96df', // Wongnai Image (Broccoli fried rice)
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ข้าวผัดบรอกโคลี</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#E8F5E9' }]}>
              {/* ใช้ไอคอน 'rice' */}
              <MaterialCommunityIcons name="rice" size={16} color="#4CAF50" />
              <Text style={[styles.tasteText, { color: '#4CAF50' }]}>อิ่มท้อง ง่ายๆ ได้ผัก</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม</Text>
            <Text style={styles.timeValue}>10 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาปรุง</Text>
            <Text style={styles.timeValue}>15 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 ที่</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-variant" size={24} color="#388E3C" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
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
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>{step.text}</Text>
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
            <Text style={styles.tipText}>ใช้ข้าวสวยที่เย็นแล้ว หรือข้าวค้างคืน จะทำให้ผัดง่าย ข้าวเป็นเม็ดสวย ไม่แฉะติดกระทะ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>หั่นบรอกโคลีชิ้นเล็กๆ จะช่วยให้สุกง่าย และเข้ากับส่วนผสมอื่นๆ ได้ดี</Text>
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

export default BroccoliFriedRice;