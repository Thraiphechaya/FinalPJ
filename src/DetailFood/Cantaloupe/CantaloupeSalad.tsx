import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type CantaloupeScreenNav = NativeStackNavigationProp<RootStackParamList, 'CantaloupeScreen'>;

const CantaloupeSalad = () => {
  const navigation = useNavigation<CantaloupeScreenNav>();

  const saladIngredients = [
    { name: 'แคนตาลูป (หั่นเต๋า หรือ ใช้ที่ตักกลม)', amount: '1 ถ้วย' },
    { name: 'แตงกวาญี่ปุ่น (หั่นเต๋า)', amount: '1/4 ถ้วย' },
    { name: 'หอมแดง (ซอยบาง)', amount: '1-2 ช้อนโต๊ะ' },
    { name: 'ใบสะระแหน่ หรือ ใบมินต์', amount: '1 กำมือ' },
    { name: 'เฟต้าชีส (หั่นเต๋า)', amount: '2 ช้อนโต๊ะ (ไม่ใส่ก็ได้)' },
  ];

  const dressingIngredients = [
    { name: 'น้ำมันมะกอก', amount: '2 ช้อนโต๊ะ' },
    { name: 'น้ำมะนาว หรือ น้ำเลมอน', amount: '1 ช้อนโต๊ะ' },
    { name: 'น้ำผึ้ง', amount: '1 ช้อนชา' },
    { name: 'เกลือ, พริกไทยดำ', amount: 'เล็กน้อย' },
  ];

  const steps = [
    {
      number: 1,
      text: 'เตรียมส่วนผสม: หั่นแคนตาลูป แตงกวา ซอยหอมแดง และเด็ดใบสะระแหน่'
    },
    {
      number: 2,
      text: 'ทำน้ำสลัด: ในถ้วยเล็ก ผสมน้ำมันมะกอก, น้ำมะนาว, น้ำผึ้ง, เกลือ, พริกไทย ตีให้เข้ากัน'
    },
    {
      number: 3,
      text: 'ในชามสลัด ใส่แคนตาลูป, แตงกวา, หอมแดงซอย'
    },
    {
      number: 4,
      text: 'ราดน้ำสลัดที่เตรียมไว้ลงไป คลุกเคล้าเบาๆ ให้เข้ากัน'
    },
    {
      number: 5,
      text: 'ใส่ใบสะระแหน่ และเฟต้าชีส (ถ้าใช้) คลุกเบาๆ อีกครั้ง'
    },
    {
      number: 6,
      text: 'ตักใส่จาน แช่เย็นเล็กน้อยก่อนเสิร์ฟ จะสดชื่นยิ่งขึ้น'
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
              uri: 'https://img.kapook.com/u/2021/wanwanat/1776529970.jpg'
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>สลัดแคนตาลูป</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9C4' }]}>
               {/* ใช้ไอคอน 'leaf' */}
              <MaterialCommunityIcons name="leaf" size={16} color="#F57F17" />
              <Text style={[styles.tasteText, { color: '#F57F17' }]}>สดชื่น หวานเค็ม ตัดเลี่ยน</Text>
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
            <Text style={styles.timeValue}>0 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1-2 ที่</Text>
          </View>
        </View>

        {/* Salad Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-variant" size={24} color="#FFB300" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมสลัด</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {saladIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FFB300' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Dressing Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="beaker-outline" size={24} color="#4CAF50" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมน้ำสลัด</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {dressingIngredients.map((item, index) => (
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
                 {/* ลบส่วนเช็ค tip ออก */}
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
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ใช้ที่ตักผลไม้ทรงกลม (Melon Baller) ตักแคนตาลูป จะทำให้สลัดดูสวยงามน่าทานขึ้น</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ถ้าไม่มีเฟต้าชีส อาจใช้มอสซาเรลล่าสด หรือข้ามไปเลยก็ได้</Text>
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

export default CantaloupeSalad;