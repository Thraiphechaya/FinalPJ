import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';

type BananaScreenNav = NativeStackNavigationProp<RootStackParamList, 'BananaCake'>;

const CaramelBananaToast = () => {
  const navigation = useNavigation<BananaScreenNav>();

  const toastIngredients = [
    { name: 'เอโร่ ขนมปังคาราเมลโทสต์', amount: '1 ชิ้น' },
    { name: 'ซอสช็อกโกแลต', amount: 'สำหรับตกแต่ง' },
    { name: 'กล้วยหอมสุก', amount: 'สำหรับตกแต่ง' },
    { name: 'วิปปิงครีม', amount: 'สำหรับตกแต่ง' },
    { name: 'ผงโกโก้', amount: 'สำหรับตกแต่ง' },
    { name: 'โรสแมรี', amount: 'สำหรับตกแต่ง' },
  ];

  const caramelSauceIngredients = [
    { name: 'น้ำตาลทรายขาว', amount: '265 กรัม' },
    { name: 'น้ำเปล่า', amount: '30 กรัม' },
    { name: 'วิปปิงครีม', amount: '160 กรัม' },
    { name: 'เนย', amount: '80 กรัม' },
    { name: 'เกลือ', amount: '½ ช้อนชา' },
  ];

  const steps = [
    { 
      number: 1, 
      title: 'ทำซอสคาราเมล',
      text: 'ใส่น้ำตาลและน้ำเปล่าลงในหม้อ ใช้ไฟอ่อน ๆ ค่อย ๆ ให้น้ำตาลละลาย และเป็นสีที่ต้องการ',
      subSteps: [
        'จากนั้นนำวิปปิงครีมอุณหภูมิห้อง เทใส่ลงไปคนให้เข้ากัน',
        'เมื่อเข้ากันดีแล้ว ตามด้วยเกลือและเนยเป็นลำดับสุดท้าย'
      ]
    },
    { 
      number: 2, 
      title: 'ย่างขนมปัง',
      text: 'นำ เอโร่ ขนมปังคาราเมลโทสต์ ออกมาพักในอุณหภูมิห้อง 30 นาที',
      subSteps: [
        'จากนั้นนำไปย่างในกระทะด้วยไฟอ่อน ๆ ให้ขึ้นสีทั้งสองด้าน',
        'ด้านละประมาณ 3 นาที หรือจนได้สีที่สวยงาม',
        'เตรียมวิปปิงครีมไว้โดยการตีให้ขึ้นฟู จากนั้นใส่ถุงบีบแล้วพักไว้'
      ]
    },
    { 
      number: 3, 
      title: 'ประกอบร่าง',
      text: 'ทา เอโร่ ขนมปังคาราเมลโทสต์ ที่ย่างไว้ด้วยซอสช็อกโกแลต',
      subSteps: [
        'จากนั้นตามด้วยวิปครีมที่ตีไว้',
        'เรียงกล้วยหั่นแว่นลงไปให้สวยงาม',
        'ราดด้วยซอสคาราเมลที่ทำไว้',
        'โรยด้วยผงโกโก้ และตกแต่งด้วยโรสแมรีให้สวยงาม'
      ]
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
              uri: 'https://img.wongnai.com/p/800x0/2024/03/19/4948f9d9d0c24ff6a6a0c0f279c9e0aa.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>คาราเมลบานอฟฟีโทสต์</Text>
            <View style={styles.tasteTag}>
              <MaterialCommunityIcons name={("toast" as any)} size={16} color="#FF9800" />
              <Text style={styles.tasteText}>ขนมปังคาราเมลกับกล้วยหอมและซอสคาราเมล</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม</Text>
            <Text style={styles.timeValue}>30 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาปรุง</Text>
            <Text style={styles.timeValue}>15 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="account" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 ที่</Text>
          </View>
        </View>

        {/* Toast Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={("toast" as any)} size={24} color="#8B4513" />
            <View>
              <Text style={styles.sectionTitle}>วัตถุดิบบานอฟฟีโทสต์</Text>
              <Text style={styles.sectionSubtitle}>ส่วนประกอบหลัก</Text>
            </View>
          </View>
          
          <View style={styles.ingredientsList}>
            {toastIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#8B4513' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Caramel Sauce Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={("saucepan" as any)} size={24} color="#D2691E" />
            <View>
              <Text style={styles.sectionTitle}>ซอสคาราเมล</Text>
              <Text style={styles.sectionSubtitle}>ส่วนผสมซอส</Text>
            </View>
          </View>
          
          <View style={styles.ingredientsList}>
            {caramelSauceIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#D2691E' }]} />
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
                    <Text style={styles.stepNumberText}>STEP {step.number}</Text>
                  </View>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepText}>{step.text}</Text>
                  
                  {step.subSteps && step.subSteps.map((subStep, subIndex) => (
                    <View key={subIndex} style={styles.subStepItem}>
                      <View style={styles.subStepDot} />
                      <Text style={styles.subStepText}>{subStep}</Text>
                    </View>
                  ))}
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
            <MaterialCommunityIcons name="fire" size={16} color="#FF6B6B" />
            <Text style={styles.tipText}>ใช้ไฟอ่อนในการทำซอสคาราเมลเพื่อป้องกันไหม้</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="thermometer" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>ใช้วิปปิงครีมอุณหภูมิห้องเพื่อผสมซอสได้ง่าย</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name={("fruit-banana" as any)} size={16} color="#FFD700" />
            <Text style={styles.tipText}>เลือกกล้วยหอมสุกพอดีสำหรับรสชาติที่ดีที่สุด</Text>
          </View>
        </View>

        {/* Serving Suggestion */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food" size={24} color="#9C27B0" />
            <Text style={styles.sectionTitle}>คำแนะนำในการเสิร์ฟ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>เสิร์ฟร้อน ๆ จะได้รสชาติที่ดีที่สุด</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>ตกแต่งด้วยโรสแมรีให้สวยงามน่าทาน</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>สามารถเพิ่มไอศครีมวานิลลาได้ตามชอบ</Text>
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

export default CaramelBananaToast;