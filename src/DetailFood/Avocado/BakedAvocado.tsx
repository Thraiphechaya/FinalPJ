import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type AvocadoScreenNav = NativeStackNavigationProp<RootStackParamList, 'AvocadoScreen'>; 

const BakedAvocadoFries = () => { 
  const navigation = useNavigation<AvocadoScreenNav>();

  const mainIngredients = [
    { name: 'อะโวคาโด (เกือบสุก, ยังแข็งเล็กน้อย)', amount: '1-2 ลูก' },
    { name: 'แป้งสาลีอเนกประสงค์', amount: '1/2 ถ้วย' },
    { name: 'เกลือ, พริกไทย', amount: 'สำหรับปรุงรสแป้ง' },
    { name: 'ไข่ไก่ (ตีพอแตก)', amount: '1-2 ฟอง' },
    { name: 'เกล็ดขนมปัง', amount: '1 ถ้วย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'วอร์มเตาอบที่ 200 องศาเซลเซียส เตรียมถาดอบปูกระดาษไข'
    },
    { 
      number: 2, 
      text: 'ปอกเปลือกอะโวคาโด หั่นเป็นแท่งยาว (เหมือนเฟรนช์ฟราย)'
    },
    { 
      number: 3, 
      text: 'เตรียม 3 จาน: 1.แป้ง (ผสมเกลือ,พริกไทย), 2.ไข่ไก่, 3.เกล็ดขนมปัง'
    },
    { 
      number: 4, 
      text: 'นำแท่งอะโวคาโด คลุกแป้ง ให้ทั่ว'
    },
    { 
      number: 5, 
      text: 'นำไปชุบไข่ไก่ (ให้พอหมาด)'
    },
    { 
      number: 6, 
      text: 'นำไปคลุกเกล็ดขนมปัง กดให้ติดแน่น'
    },
    { 
      number: 7, 
      text: 'วางเรียงบนถาดอบ (อย่าให้ซ้อนกัน) พ่นสเปรย์น้ำมัน (ถ้ามี) จะช่วยให้สีสวยขึ้น'
    },
    { 
      number: 8, 
      text: 'นำเข้าเตาอบ 15-20 นาที จนกว่าจะเหลืองกรอบ'
    },
    { 
      number: 9, 
      text: 'เสิร์ฟทันทีคู่กับซอสมาโย หรือซอสที่ชอบ'
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
              uri: 'https://img.wongnai.com/p/1968x0/2018/08/04/378a833cdffd4379933d44d3f563673d.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>อะโวคาโด อบกรอบ</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#E8F5E9' }]}>
              {/* ใช้ as any เพื่อแก้ปัญหา TypeScript */}
              <MaterialCommunityIcons name="food" size={16} color="#4CAF50" />
              <Text style={[styles.tasteText, { color: '#4CAF50' }]}>กรอบนอก นุ่มใน มัน!</Text>
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
            <Text style={styles.timeLabel}>เวลาอบ</Text>
            <Text style={styles.timeValue}>20 นาที</Text>
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
            <MaterialCommunityIcons name={"food" as any} size={24} color="#388E3C" />
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
        
        {/* Tips Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="alarm" size={16} color="#E65100" />
            <Text style={styles.tipText}>ควรใช้อะโวคาโดที่ยังไม่สุกนิ่ม (กำลังดี หรือเกือบสุก) เพราะถ้าสุกเกินไปจะเละตอนหั่นและคลุก</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name={"alarm" as any} size={16} color="#2196F3" />
            <Text style={styles.tipText}>สามารถใช้ "หม้อทอดไร้น้ำมัน" (Air Fryer) แทนเตาอบได้ โดยใช้อุณหภูมิ 180-200 องศา ประมาณ 10-15 นาที</Text>
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

export default BakedAvocadoFries;