import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type AppleScreenNav = NativeStackNavigationProp<RootStackParamList, 'ApplePie'>; 

const ApplePie = () => { // 
  const navigation = useNavigation<AppleScreenNav>();

  const mainIngredients = [
    { name: 'แป้งพายสำเร็จรูป (แช่แข็ง)', amount: '2 แผ่น' },
    { name: 'แอปเปิ้ลเขียว (ปอกเปลือก หั่นเต๋า)', amount: '3-4 ลูก' },
    { name: 'น้ำตาลทราย (หรือน้ำตาลทรายแดง)', amount: '1/3 ถ้วย' },
    { name: 'แป้งข้าวโพด', amount: '1 ช้อนโต๊ะ' },
    { name: 'ผงซินนามอน (อบเชยป่น)', amount: '1 ช้อนชา' },
    { name: 'น้ำมะนาว', amount: '1 ช้อนโต๊ะ' },
    { name: 'เนยจืด', amount: '1 ช้อนโต๊ะ' },
    { name: 'ไข่ไก่ (สำหรับทาหน้า)', amount: '1 ฟอง' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'วอร์มเตาอบที่ 180 องศาเซลเซียส'
    },
    { 
      number: 2, 
      text: 'ทำไส้: ในชามผสม ใส่แอปเปิ้ลหั่นเต๋า, น้ำตาล, แป้งข้าวโพด, ผงซินนามอน และน้ำมะนาว คลุกเคล้าให้เข้ากัน'
    },
    { 
      number: 3, 
      text: 'นำแป้งพายแผ่นที่ 1 (คลายเย็นแล้ว) กรุลงในพิมพ์พาย'
    },
    { 
      number: 4, 
      text: 'เทส่วนผสมไส้แอปเปิ้ลลงไป เกลี่ยให้ทั่ว วางเนยจืดหั่นเต๋าเล็กๆ กระจายบนหน้าไส้'
    },
    { 
      number: 5, 
      text: 'นำแป้งพายแผ่นที่ 2 มาปิดด้านบน (หรือตัดเป็นเส้นๆ สานกันเป็นลายตาราง)'
    },
    { 
      number: 6, 
      text: 'บีบขอบแป้งพายให้ติดกันแน่น และใช้ส้อมจิ้มหน้าพาย (หรือกรีดเล็กน้อย) เพื่อให้ไอน้ำระบาย'
    },
    { 
      number: 7, 
      text: 'ตีไข่ไก่ให้เข้ากัน ใช้แปรงทาลงบนหน้าพายให้ทั่ว'
    },
    { 
      number: 8, 
      text: 'นำเข้าเตาอบ 40-50 นาที หรือจนกระทั่งหน้าพายเป็นสีเหลืองทองสวย และไส้เดือดปุดๆ'
    },
    { 
      number: 9, 
      text: 'นำออกจากเตา พักให้เย็นลงเล็กน้อยก่อนตัดเสิร์ฟ'
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
              uri: 'https://img-global.cpcdn.com/steps/207c7f3a8d28c580/320x256cq80/%E0%B8%A7%E0%B8%98%E0%B8%97%E0%B8%B3-%E0%B8%AA%E0%B8%95%E0%B8%A3-%E0%B9%82%E0%B8%AE%E0%B8%A1%E0%B9%80%E0%B8%A1%E0%B8%94%E0%B8%9E%E0%B8%B2%E0%B8%A2%E0%B9%81%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%9B%E0%B8%A5-homemade-apple-pie-from-scratch-9-%E0%B8%A3%E0%B8%9B.webp',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>พายแอปเปิ้ล (Apple Pie)</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF3E0' }]}>
              <MaterialCommunityIcons name="chart-pie" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>หอมซินนามอน ไส้ฉ่ำ</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม</Text>
            <Text style={styles.timeValue}>20 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาปรุง</Text>
            <Text style={styles.timeValue}>45 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 ชิ้น (9 นิ้ว)</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={("food-apple" as any)} size={24} color="#F44336" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมทั้งหมด</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
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
            <MaterialCommunityIcons name={("ice-cream" as any)} size={16} color="#2196F3" />
            <Text style={styles.tipText}>เสิร์ฟตอนอุ่นๆ คู่กับไอศกรีมวานิลลา จะอร่อยมาก (เรียกว่า "Pie à la mode")</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="fire" size={16} color="#FF6B6B" />
            <Text style={styles.tipText}>หากอบแล้วหน้าพายเริ่มสีเข้มเร็วเกินไป ให้ใช้ฟอยล์คลุมหน้าพายไว้ แล้วอบต่อจนไส้สุก</Text>
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
    marginBottom: 25,
  },
  stepNumberContainer: {
    marginRight: 12,
  },
  stepNumber: {
    width: 70,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 6,
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  subStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    marginLeft: 8,
  },
  subStepDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginRight: 8,
    marginTop: 8,
  },
  subStepText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    flex: 1,
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


export default ApplePie;