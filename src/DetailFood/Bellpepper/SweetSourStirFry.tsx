import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type BellPepperScreenNav = NativeStackNavigationProp<RootStackParamList, 'SweetSourStirFry'>; 

const SweetSourStirFry = () => { 
  const navigation = useNavigation<BellPepperScreenNav>();

  const mainIngredients = [
    { name: 'เนื้อหมู หรือ ไก่ (หั่นชิ้น)', amount: '150 กรัม' },
    { name: 'พริกหยวก (เขียว,แดง,เหลือง หั่นเต๋า)', amount: '1 ถ้วยรวมกัน' },
    { name: 'หอมใหญ่ (หั่นเต๋า)', amount: '1/2 หัว' },
    { name: 'แตงกวา (ผ่าครึ่งคว้านไส้ หั่นเฉียง)', amount: '1/2 ลูก' },
    { name: 'มะเขือเทศ (หั่นเสี้ยว)', amount: '1 ลูก' },
    { name: 'สับปะรด (หั่นชิ้น)', amount: '1/4 ถ้วย' },
    { name: 'กระเทียม (สับ)', amount: '1 ช้อนโต๊ะ' },
    { name: 'น้ำมันพืช', amount: '2 ช้อนโต๊ะ' },
  ];

  const sauceIngredients = [
     { name: 'ซอสมะเขือเทศ', amount: '3 ช้อนโต๊ะ' },
     { name: 'น้ำตาลทราย', amount: '1.5 ช้อนโต๊ะ' },
     { name: 'น้ำส้มสายชู', amount: '1 ช้อนโต๊ะ' },
     { name: 'ซีอิ๊วขาว', amount: '1 ช้อนโต๊ะ' },
     { name: 'น้ำเปล่า', amount: '1/4 ถ้วย' },
     { name: 'แป้งข้าวโพด (ละลายน้ำเล็กน้อย)', amount: '1 ช้อนชา (ถ้าชอบข้น)' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'เตรียมซอส: ผสมซอสมะเขือเทศ, น้ำตาล, น้ำส้มสายชู, ซีอิ๊วขาว, น้ำเปล่า ในถ้วย คนให้เข้ากัน พักไว้'
    },
    { 
      number: 2, 
      text: 'หั่นผักต่างๆ เตรียมไว้: พริกหยวก, หอมใหญ่, แตงกวา, มะเขือเทศ, สับปะรด'
    },
    { 
      number: 3, 
      text: 'ตั้งกระทะ ใส่น้ำมันพืช ใช้ไฟกลางค่อนข้างแรง ใส่กระเทียมลงไปเจียวให้หอม'
    },
    { 
      number: 4, 
      text: 'ใส่เนื้อหมูหรือไก่ลงไป ผัดพอสุก'
    },
    { 
      number: 5, 
      text: 'ใส่ผักที่สุกยากก่อน (หอมใหญ่, พริกหยวก, แครอทถ้ามี) ผัดพอสลด'
    },
     { 
      number: 6, 
      text: 'ใส่ผักที่เหลือ (แตงกวา, มะเขือเทศ, สับปะรด) ผัดเร็วๆ'
    },
     { 
      number: 7, 
      text: 'เทซอสที่ผสมไว้ลงไป คลุกเคล้าให้เข้ากัน'
    },
    { 
      number: 8, 
      text: 'ถ้าชอบซอสข้น ให้เติมแป้งข้าวโพดละลายน้ำลงไปเล็กน้อย คนเร็วๆ ให้ซอสข้นขึ้น'
    },
    { 
      number: 9, 
      text: 'ผัดต่ออีกครู่ พอให้ผักสุกกรอบ ปิดไฟ'
    },
    { 
      number: 10, 
      text: 'ตักใส่จาน เสิร์ฟร้อนๆ กับข้าวสวย'
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
              uri: 'https://recipe.sgethai.com/wp-content/uploads/2025/02/280225-sweet-and-sour-chicken-recipe-cover.webp', // Wongnai Image
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ผัดเปรี้ยวหวาน</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFEBEE' }]}>
              {/* ใช้ไอคอน 'food-variant' */}
              <MaterialCommunityIcons name="food-variant" size={16} color="#F44336" />
              <Text style={[styles.tasteText, { color: '#F44336' }]}>เปรี้ยวหวานลงตัว สีสันสดใส</Text>
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
            <Text style={styles.timeValue}>15 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>2 ที่</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food" size={24} color="#4CAF50" />
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

        {/* Sauce Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="beaker-outline" size={24} color="#F44336" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมซอส</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {sauceIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#F44336' }]} />
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
                 {/* แก้ไข: ลบส่วนเช็ค tip ออก */}
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
            <Text style={styles.tipText}>ผัดผักแต่ละชนิดตามลำดับความสุกยากง่าย จะช่วยให้ผักทุกอย่างสุกกรอบพอดี ไม่เละ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ใช้ไฟแรงในการผัด จะช่วยให้ผักกรอบ และมีกลิ่นหอมของกระทะ</Text>
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

export default SweetSourStirFry;