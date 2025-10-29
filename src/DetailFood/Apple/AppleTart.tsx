import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type AppleScreenNav = NativeStackNavigationProp<RootStackParamList, 'AppleTart'>; 

const AppleTart = () => { 
  const navigation = useNavigation<AppleScreenNav>();

  const crustIngredients = [
    { name: 'แป้งสาลีอเนกประสงค์', amount: '1+1/4 ถ้วย' },
    { name: 'เนยจืด (เย็นจัด หั่นเต๋า)', amount: '1/2 ถ้วย' },
    { name: 'น้ำตาลไอซิ่ง', amount: '2 ช้อนโต๊ะ' },
    { name: 'น้ำเย็นจัด', amount: '3-4 ช้อนโต๊ะ' },
    { name: 'เกลือ', amount: '1/4 ช้อนชา' },
  ];

  const fillingIngredients = [
    { name: 'แอปเปิ้ล (ปอกเปลือก หั่นบาง)', amount: '2-3 ลูก' },
    { name: 'น้ำตาลทราย', amount: '1/4 ถ้วย' },
    { name: 'น้ำมะนาว', amount: '1 ช้อนโต๊ะ' },
    { name: 'เนยจืดละลาย (สำหรับทา)', amount: '1 ช้อนโต๊ะ' },
    { name: 'แยมแอปริคอต (สำหรับทาหน้า)', amount: '2 ช้อนโต๊ะ' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ทำแป้งทาร์ต: ผสมแป้ง, น้ำตาลไอซิ่ง, เกลือ ในโถผสม'
    },
    { 
      number: 2, 
      text: 'ใส่เนยเย็นจัด ใช้ที่สับแป้ง (Pastry Blender) หรือปลายนิ้ว บี้เนยกับแป้งจนมีลักษณะคล้ายทรายหยาบ'
    },
    { 
      number: 3, 
      text: 'ค่อยๆ พรมน้ำเย็นจัดลงไปทีละช้อน ตะล่อมให้แป้งเริ่มจับตัวเป็นก้อน (อย่าให้แฉะ)'
    },
    { 
      number: 4, 
      text: 'ห่อแป้งด้วยพลาสติกแรป นำไปแช่เย็นอย่างน้อย 30 นาที'
    },
    { 
      number: 5, 
      text: 'วอร์มเตาอบที่ 180-200 องศาเซลเซียส'
    },
    { 
      number: 6, 
      text: 'นำแป้งออกมารีดบนพื้นผิวที่โรยแป้งนวล ให้เป็นแผ่นกลม กรุลงในพิมพ์ทาร์ต ตัดขอบส่วนเกิน'
    },
    { 
      number: 7, 
      text: 'เตรียมไส้: คลุกเคล้าแอปเปิ้ลหั่นบางกับน้ำตาลและน้ำมะนาว'
    },
    { 
      number: 8, 
      text: 'เรียงแอปเปิ้ลลงบนแป้งทาร์ตให้สวยงาม (เรียงเป็นวงกลมซ้อนกัน)'
    },
    { 
      number: 9, 
      text: 'ทาหน้าแอปเปิ้ลด้วยเนยละลาย นำเข้าเตาอบ 35-45 นาที หรือจนขอบทาร์ตเป็นสีทองและแอปเปิ้ลสุกนิ่ม'
    },
    { 
      number: 10, 
      text: 'นำออกจากเตา ทาหน้าด้วยแยมแอปริคอต (อุ่นให้เหลวเล็กน้อย) เพื่อความเงางาม'
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
              uri: 'https://img.wongnai.com/p/1920x0/2020/10/30/205f762b793e43339835ea88b863778a.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ทาร์ตแอปเปิ้ล</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF3E0' }]}>
              <MaterialCommunityIcons name="chart-pie" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>หอมเนย เปรี้ยวหวานลงตัว</Text>
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
            <Text style={styles.timeLabel}>เวลาปรุง (ไม่รวมแช่)</Text>
            <Text style={styles.timeValue}>45 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 ชิ้น (9 นิ้ว)</Text>
          </View>
        </View>

        {/* Crust Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="layers-outline" size={24} color="#795548" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมแป้งทาร์ต (Crust)</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {crustIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#795548' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Filling Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={("food-apple" as any)} size={24} color="#F44336" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมไส้ (Filling)</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {fillingIngredients.map((item, index) => (
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


export default AppleTart;