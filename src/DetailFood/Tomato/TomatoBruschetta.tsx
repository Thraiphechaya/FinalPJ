import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type TomatoScreenNav = NativeStackNavigationProp<RootStackParamList, 'TomatoScreen'>; 

const TomatoBruschetta = () => { 
  const navigation = useNavigation<TomatoScreenNav>();

  const toppingIngredients = [
    { name: 'มะเขือเทศ (หั่นเต๋าเล็ก)', amount: '1-2 ลูก' },
    { name: 'หอมแดง (สับละเอียด)', amount: '1/4 หัว' },
    { name: 'กระเทียม (สับละเอียด)', amount: '1 กลีบ' },
    { name: 'ใบโหระพาอิตาลี (สับ)', amount: '1 กำมือ' },
    { name: 'น้ำมันมะกอก', amount: '2 ช้อนโต๊ะ' },
    { name: 'เกลือ, พริกไทยดำ', amount: 'เล็กน้อย' },
  ];
  
  const baseIngredients = [
    { name: 'ขนมปังฝรั่งเศส (หั่นเฉียง)', amount: '4-5 ชิ้น' },
    { name: 'น้ำมันมะกอก (สำหรับทา)', amount: 'เล็กน้อย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ทำหน้าท็อปปิ้ง: ในชามผสม ใส่มะเขือเทศหั่นเต๋า, หอมแดงสับ, กระเทียมสับ, และใบโหระพา'
    },
    { 
      number: 2, 
      text: 'ปรุงรสด้วยน้ำมันมะกอก เกลือ พริกไทย คลุกเคล้าให้เข้ากัน พักไว้ 10 นาทีให้รสชาติเข้าเนื้อ'
    },
    { 
      number: 3, 
      text: 'เตรียมขนมปัง: ทาน้ำมันมะกอกบางๆ บนขนมปังที่หั่นไว้'
    },
    { 
      number: 4, 
      text: 'นำขนมปังไปปิ้ง หรือจี่บนกระทะ ให้กรอบเหลือง'
    },
    { 
      number: 5, 
      text: 'ตักส่วนผสมท็อปปิ้งมะเขือเทศ (พยายามตักแต่เนื้อ ไม่เอาน้ำ) วางบนขนมปังปิ้ง'
    },
    { 
      number: 6, 
      text: 'จัดเสิร์ฟทันที (ก่อนขนมปังจะนิ่ม)'
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
              uri: 'https://howtocookhub.com/wp-content/uploads/2023/03/7-3-1024x1024.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>บรูสเก็ตต้าหน้ามะเขือเทศ</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFEBEE' }]}>
              {/* ใช้ไอคอน 'food-croissant' แทนขนมปัง */}
              <MaterialCommunityIcons name="food-croissant" size={16} color="#D32F2F" />
              <Text style={[styles.tasteText, { color: '#D32F2F' }]}>สดชื่น เปรี้ยวเค็ม ตัดกรอบ</Text>
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
            <Text style={styles.timeValue}>5 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1-2 ที่</Text>
          </View>
        </View>

        {/* Topping Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-variant" size={24} color="#F44336" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมท็อปปิ้ง</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {toppingIngredients.map((item, index) => (
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
        
        {/* Base Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-croissant" size={24} color="#795548" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมขนมปัง</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {baseIngredients.map((item, index) => (
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
            <Text style={styles.tipText}>ใช้มะเขือเทศพันธุ์ที่มีเนื้อเยอะ น้ำน้อย (เช่น มะเขือเทศเชอร์รี หรือ โรม่า) จะทำให้ท็อปปิ้งไม่แฉะ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>หลังจากปิ้งขนมปังแล้ว ให้ผ่ากระเทียมสดครึ่งซีก แล้วถูลงบนหน้าขนมปังปิ้งตอนร้อนๆ จะเพิ่มกลิ่นหอมมาก</Text>
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

export default TomatoBruschetta;