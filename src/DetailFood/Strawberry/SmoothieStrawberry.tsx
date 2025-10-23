import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';

type StrawberryScreenNav = NativeStackNavigationProp<RootStackParamList, 'StrawberryScreen'>;

const SmoothieStrawberry = () => {
  const navigation = useNavigation<StrawberryScreenNav>();

  const ingredients = [
    { name: 'สตรอเบอร์รี่แช่แข็ง', amount: '100 กรัม' },
    { name: 'นมจืด', amount: '200 มล.' },
    { name: 'น้ำตาลไอซิ่ง', amount: '1-2 ช้อนชา' },
    { name: 'วิปครีม', amount: 'สำหรับตกแต่ง' },
    { name: 'ครัมเบิ้ล', amount: 'สำหรับตกแต่ง' },
    { name: 'สตรอเบอร์รี่อบแห้ง', amount: 'สำหรับตกแต่ง' },
  ];

  const steps = [
    { number: 1, text: 'นำสตรอเบอร์รี่แช่แข็งใส่โถปั่น ตามด้วยนมจืด เพิ่มความหวานด้วยไอซิ่ง (ไม่ใส่ก็ได้)' },
    { number: 2, text: 'ปั่นให้ละเอียดเนื้อเนียน' },
    { number: 3, text: 'บีบวิปครีม เพิ่มครัมเบิ้ล และสตรอเบอร์รี่อบแห้งตกแต่ง' },
    { number: 4, text: 'พร้อมดื่ม' },
  ];

  return (
    <View style={styles.container}>
      {/* Header 
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
      </View>
            */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <Image
            source={{
              uri: 'https://www.falconforprofessional.com/wp-content/uploads/2023/10/50.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>สมูทตี้สตรอเบอร์รี่โยเกิร์ต</Text>
            <View style={styles.tasteTag}>
              <MaterialCommunityIcons name="cup" size={16} color="#FF6B6B" />
              <Text style={styles.tasteText}>รสเปรี้ยวอมหวาน กลิ่นหอมเย็นสดชื่น</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียมส่วนผสม</Text>
            <Text style={styles.timeValue}>3 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาปรุงอาหาร</Text>
            <Text style={styles.timeValue}>4 นาที</Text>
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-apple" size={24} color="#4CAF50" />
            <Text style={styles.sectionTitle}>ส่วนผสม</Text>
            <Text style={styles.sectionSubtitle}>สำหรับ 1 แก้ว</Text>
          </View>
          
          <View style={styles.ingredientsList}>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientDot} />
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
            <MaterialCommunityIcons name="chef-hat" size={24} color="#FF9800" />
            <Text style={styles.sectionTitle}>วิธีทำ</Text>
          </View>
          
          <View style={styles.stepsList}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <Text style={styles.stepText}>{step.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Nutrition Info */}
        <View style={styles.nutritionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="nutrition" size={24} color="#2196F3" />
            <Text style={styles.sectionTitle}>คุณค่าทางโภชนาการ</Text>
          </View>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>32</Text>
              <Text style={styles.nutritionLabel}>กิโลแคลอรี่</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>7.7g</Text>
              <Text style={styles.nutritionLabel}>คาร์โบไฮเดรต</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>2g</Text>
              <Text style={styles.nutritionLabel}>ไฟเบอร์</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>สูง</Text>
              <Text style={styles.nutritionLabel}>วิตามินซี</Text>
            </View>
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
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
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
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
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
    fontSize: 14,
    color: '#666',
    marginLeft: 'auto',
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
    backgroundColor: '#4CAF50',
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
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  nutritionCard: {
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
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default SmoothieStrawberry;