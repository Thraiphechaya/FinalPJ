import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type CherryScreenNav = NativeStackNavigationProp<RootStackParamList, 'CherryJelly'>; 

const CherryTrifle = () => { 
  const navigation = useNavigation<CherryScreenNav>();

  const custardIngredients = [
    { name: 'ไข่ไก่ (เฉพาะไข่แดง)', amount: '2 ฟอง' },
    { name: 'น้ำตาลทราย', amount: '50 กรัม' },
    { name: 'แป้งข้าวโพด', amount: '1.5 ช้อนโต๊ะ' },
    { name: 'นมสด (รสจืด)', amount: '1 ถ้วย' },
    { name: 'กลิ่นวานิลลา', amount: '1 ช้อนชา' },
  ];
  
  const assemblyIngredients = [
    { name: 'เลดี้ฟิงเกอร์ (หรือบิสกิต/เค้กเนย)', amount: '4-5 ชิ้น' },
    { name: 'เชอร์รี่กระป๋อง (แยกน้ำและเนื้อ)', amount: '1 กระป๋อง' },
    { name: 'วิปครีม (ตีฟู)', amount: '1 ถ้วย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ทำคัสตาร์ด: ในชามผสม ตีไข่แดง, น้ำตาลทราย, และแป้งข้าวโพด ให้เข้ากัน'
    },
    { 
      number: 2, 
      text: 'อุ่นนมสดในหม้อให้พอร้อน (ระวังอย่าให้เดือด)'
    },
    { 
      number: 3, 
      text: 'ค่อยๆ เทนมร้อนลงในส่วนผสมไข่ (Temper) โดยคนตลอดเวลาเพื่อไม่ให้ไข่สุก'
    },
    { 
      number: 4, 
      text: 'เทส่วนผสมทั้งหมดกลับใส่หม้อ ตั้งไฟอ่อน กวนตลอดเวลาจนส่วนผสมข้นขึ้น'
    },
    { 
      number: 5, 
      text: 'ยกลงจากเตา ใส่กลิ่นวานิลลา พักไว้ให้เย็น (ใช้พลาสติกแรปปิดผิวหน้าคัสตาร์ดกันหน้าแข็ง)'
    },
    { 
      number: 6, 
      text: 'เตรียมแก้วใสสำหรับเสิร์ฟ'
    },
    { 
      number: 7, 
      text: 'นำเลดี้ฟิงเกอร์จุ่มใน "น้ำเชอร์รี่" (จากกระป๋อง) พอชุ่ม แล้ววางเรียงที่ก้นแก้ว'
    },
    { 
      number: 8, 
      text: 'วาง "เนื้อเชอร์รี่" ทับลงไป'
    },
    { 
      number: 9, 
      text: 'ราดคัสตาร์ดที่เย็นแล้วทับเป็นชั้นถัดไป'
    },
    { 
      number: 10, 
      text: 'บีบวิปครีมที่ตีฟูแล้วปิดท้ายด้านบน'
    },
    { 
      number: 11, 
      text: 'ตกแต่งด้วยเชอร์รี่ และนำไปแช่เย็นก่อนเสิร์ฟ'
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
              uri: 'https://www.oliveandmango.com/images/uploads/2022_12_16_black_forest_trifle_1.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>เชอร์รี่ไทรเฟิล</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFEBEE' }]}>
              <MaterialCommunityIcons name="glass-cocktail" size={16} color="#C62828" />
              <Text style={[styles.tasteText, { color: '#C62828' }]}>หอมหวาน ครีมมี่ ฉ่ำเชอร์รี่</Text>
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
            <Text style={styles.timeValue}>10 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1-2 ที่</Text>
          </View>
        </View>

        {/* Custard Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="egg-easter" size={24} color="#FFB300" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมคัสตาร์ด</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {custardIngredients.map((item, index) => (
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
        
        {/* Assembly Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="chef-hat" size={24} color="#C62828" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมประกอบร่าง</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {assemblyIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#C62828' }]} />
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
            {/* 1. ไอคอนเดิม (lightbulb-on) สำหรับ Header */}
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            {/* 2. ไอคอนใหม่ (lightbulb-outline) สำหรับกล่อง Tip */}
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ตอนทำคัสตาร์ด ต้องกวนไฟอ่อนตลอดเวลา และห้ามปล่อยให้เดือด ไม่อย่างนั้นไข่จะสุกเป็นลิ่ม</Text>
          </View>
          <View style={styles.tipContainer}>
            {/* 2. ไอคอนใหม่ (lightbulb-outline) สำหรับกล่อง Tip */}
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>การแช่ไทรเฟิลให้เย็นจัดก่อนเสิร์ฟ จะช่วยให้เลดี้ฟิงเกอร์นุ่มและรสชาติเข้ากันมากขึ้น</Text>
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

export default CherryTrifle;