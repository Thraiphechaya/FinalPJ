import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';

type BananaScreenNav = NativeStackNavigationProp<RootStackParamList, 'BananaCake'>;

const BananaCake = () => {
  const navigation = useNavigation<BananaScreenNav>();

  const mainIngredients = [
    { name: 'กล้วยน้ำว้าสุก', amount: '6 ลูก' },
    { name: 'กะทิ', amount: '300 ml' },
    { name: 'แป้งข้าวจ้าว', amount: '60 กรัม' },
    { name: 'แป้งข้าวโพด', amount: '15 กรัม' },
    { name: 'แป้งมัน', amount: '15 กรัม' },
    { name: 'แป้งท้าวยายม่อม', amount: '30 กรัม' },
    { name: 'น้ำตาลมะพร้าว', amount: '120 กรัม' },
    { name: 'น้ำตาลทราย', amount: '30 กรัม' },
  ];

  const toppingIngredients = [
    { name: 'กะทิ', amount: '250 ml' },
    { name: 'แป้งถั่วเขียว', amount: '2 ช้อนชา' },
    { name: 'แป้งข้าวจ้าว', amount: '1 ช้อนชา' },
    { name: 'เกลือ', amount: '1/2 ช้อนชา' },
    { name: 'น้ำตาลทราย', amount: '1 ช้อนโต๊ะ' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'บดกล้วย พอหยาบๆ'
    },
    { 
      number: 2, 
      text: 'ใส่แป้ง แป้งข้าวจ้าว + แป้งมัน + แป้งท้าวยายม่อม + แป้งข้าวโพด ผสมให้เข้ากันอย่างดี'
    },
    { 
      number: 3, 
      text: 'นำอ่างผสมอีกใบ เทกะทิ + น้ำตาลมะพร้าว + เกลือ ผสมให้ทุกอย่างละลายดี'
    },
    { 
      number: 4, 
      text: 'เทกลับมาผสมกับเนื้อกล้วย คนให้เข้ากันดี'
    },
    { 
      number: 5, 
      text: 'เทใส่แม่พิมพ์ นำไปนึ่งจนสุก 10-15 นาที'
    },
    { 
      number: 6, 
      text: 'ทำกะทิแต่งหน้าขนม นำกะทิ + น้ำตาลทราย + เกลือ + แป้งถั่วเขียว + แป้งข้าวจ้าว (คนให้เข้าก่อนตั้งไฟอ่อนๆ)',
      tip: 'เคล็ดลับ: เคี่ยวจนข้น ตั้งยอด'
    },
    { 
      number: 7, 
      text: 'นำแป้งที่อุ่นแล้ว ใส่ถุงบีบ'
    },
    { 
      number: 8, 
      text: 'บีบตามชอบ หรือตามหัวบีบที่มี'
    },
    { 
      number: 9, 
      text: 'เสร็จแล้วจัดเสริฟได้เลย'
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
              uri: 'https://img.wongnai.com/p/1968x0/2018/11/09/cef2735066204e19aa7dae9af56c7081.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ขนมกล้วยกะทิ</Text>
            <View style={styles.tasteTag}>
              <MaterialCommunityIcons name="food" size={16} color="#FF9800" />
              <Text style={styles.tasteText}>หวานหอมจากกล้วยและกะทิ</Text>
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
            <Text style={styles.timeValue}>40 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 ปอนด์</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={("fruit-banana" as any)} size={24} color="#FFD700" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมหลัก</Text>
              <Text style={styles.sectionSubtitle}>สำหรับตัวขนม</Text>
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

        {/* Topping Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="cup" size={24} color="#4CAF50" />
            <View>
              <Text style={styles.sectionTitle}>กะทิแต่งหน้า</Text>
              <Text style={styles.sectionSubtitle}>ส่วนผสมสำหรับท็อปปิ้ง</Text>
            </View>
          </View>
          
          <View style={styles.ingredientsList}>
            {toppingIngredients.map((item, index) => (
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
                  {step.tip && (
                    <View style={styles.tipContainer}>
                      <MaterialCommunityIcons name="lightbulb-on" size={16} color="#FF9800" />
                      <Text style={styles.tipText}>{step.tip}</Text>
                    </View>
                  )}
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
            <MaterialCommunityIcons name={("fruit-banana" as any)} size={16} color="#FF9800" />
            <Text style={styles.tipText}>ใช้กล้วยน้ำว้าสุกจะได้รสหวานหอมธรรมชาติ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name={("mixer" as any)} size={16} color="#4CAF50" />
            <Text style={styles.tipText}>ผสมแป้งให้เข้ากันดีก่อนใส่ส่วนผสมอื่น</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="fire" size={16} color="#FF6B6B" />
            <Text style={styles.tipText}>เคี่ยวกะทิแต่งหน้าไฟอ่อนจนข้นได้ที่</Text>
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
            <Text style={styles.tipText}>เสิร์ฟร้อนหรือเย็นตามชอบ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>บีบหน้าขนมให้สวยงามตามแบบที่ต้องการ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>สามารถปรับความหวานได้ตามความชอบ</Text>
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

export default BananaCake;