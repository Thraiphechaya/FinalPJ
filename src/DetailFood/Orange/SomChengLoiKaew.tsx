import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; 

type OrangeScreenNav = NativeStackNavigationProp<RootStackParamList, 'OrangeScreen'>; 


const SomChengLoiKaew = () => { 
  const navigation = useNavigation<OrangeScreenNav>();

 
  const mainIngredients = [
    { name: 'ส้มเช้ง', amount: '2-3 ลูก' },
    { name: 'น้ำตาลทราย (หรือน้ำลอยดอกมะลิ)', amount: '3 ช้อนโต๊ะ' },
    { name: 'น้ำเปล่า', amount: 'สำหรับทำน้ำเชื่อม (พอท่วมส้ม)' },
    { name: 'เกลือ', amount: '1/2 ช้อนชา' },
  ];

 
  const steps = [
    { 
      number: 1, 
      text: 'ปอกเปลือกส้มเช้ง (ลอกเยื่อขาวออกให้หมด) หั่นเป็นชิ้นพอดีคำ'
    },
    { 
      number: 2, 
      text: 'ตั้งหม้อต้มน้ำเปล่า (ปริมาณพอท่วมส้ม)'
    },
    { 
      number: 3, 
      text: 'ใส่น้ำตาลทรายลงไปเคี่ยวให้ละลาย'
    },
    { 
      number: 4, 
      text: 'จากนั้นใส่ส้มเช้งที่หั่นเตรียมไว้ลงไป'
    },
    { 
      number: 5, 
      text: 'ใส่เกลือลงไปเล็กน้อย คนให้เข้ากัน ปิดไฟ'
    },
    { 
      number: 6, 
      text: 'ตักเสิร์ฟใส่ชาม หรือพักให้เย็นแล้วนำไปแช่ตู้เย็นก่อนเสิร์ฟ'
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
              // รูปจากสูตร Wongnai (ใช้ ID จาก URL)
              uri: 'https://www.lemon8-app.com/seo/image?item_id=7168498973806871042&index=1&sign=a71b8453d725ea39c3ab089fa9b2986d',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ส้มเช้งลอยแก้ว</Text>
            <View style={styles.tasteTag}>
              {/* เปลี่ยนไอคอนและข้อความ */}
              <MaterialCommunityIcons name="snowflake" size={16} color="#2196F3" />
              <Text style={[styles.tasteText, { color: '#2196F3' }]}>เปรี้ยวอมหวาน หวานเย็นชื่นใจ</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียมส่วนผสม</Text>
            <Text style={styles.timeValue}>15 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาปรุงอาหาร</Text>
            <Text style={styles.timeValue}>15 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1-2 ที่</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={("fruit-citrus" as any)} size={24} color="#FF9800" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมทั้งหมด</Text>
              {/* ลบ Subtitle */}
            </View>
          </View>
          
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FF9800' }]} />
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

        {/* Tips Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#FF6B6B" />
            <Text style={styles.tipText}>ต้องปอกเยื่อสีขาวของส้มเช้งออกให้หมด ไม่งั้นน้ำเชื่อมจะมีรสขม</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name={("flower-poppy" as any)} size={16} color="#E91E63" />
            <Text style={styles.tipText}>หากใช้น้ำลอยดอกมะลิแทนน้ำตาลทราย จะช่วยเพิ่มกลิ่นหอม</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name={("snowflake" as any)} size={16} color="#2196F3" />
            <Text style={styles.tipText}>ยิ่งแช่เย็นยิ่งอร่อย เสิร์ฟพร้อมน้ำแข็งทุบจะสดชื่นมาก</Text>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: '#F3F9FF', // สีพื้นหลัง Tag
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  tasteText: {
    fontSize: 14,
    color: '#2196F3', // สีข้อความ Tag
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
  sectionSubtitle: { // (แม้จะไม่ได้ใช้ในหน้านี้ แต่คงไว้เผื่อสูตรอื่น)
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

export default SomChengLoiKaew;