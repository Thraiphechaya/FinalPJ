import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type CarrotScreenNav = NativeStackNavigationProp<RootStackParamList, 'CarrotScreen'>; 

const CarrotSoup = () => { 
  const navigation = useNavigation<CarrotScreenNav>();

  const mainIngredients = [
    { name: 'แครอท (หั่นแว่น หรือ เต๋า)', amount: '3-4 หัว' },
    { name: 'หอมใหญ่ (หั่นเต๋า)', amount: '1/2 หัว' },
    { name: 'มันฝรั่ง (หั่นเต๋า - ช่วยให้ซุปข้น)', amount: '1/2 หัว (ไม่ใส่ก็ได้)' },
    { name: 'เนยจืด หรือ น้ำมันมะกอก', amount: '1 ช้อนโต๊ะ' },
    { name: 'น้ำสต็อก (ผัก หรือ ไก่)', amount: '3-4 ถ้วย' },
    { name: 'ครีมสด (Whipping Cream)', amount: '1/4 ถ้วย (ไม่ใส่ก็ได้)' },
    { name: 'เกลือ, พริกไทยขาว', amount: 'ตามชอบ' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ตั้งหม้อ ใส่เนยหรือน้ำมัน ใช้ไฟกลาง'
    },
    { 
      number: 2, 
      text: 'ใส่หอมใหญ่ลงไปผัดจนนิ่มและใส'
    },
    { 
      number: 3, 
      text: 'ใส่แครอท และมันฝรั่ง (ถ้าใช้) ลงไปผัดประมาณ 5 นาที'
    },
    { 
      number: 4, 
      text: 'เทน้ำสต็อกลงไปให้พอท่วมผัก'
    },
    { 
      number: 5, 
      text: 'ต้มให้เดือด แล้วลดไฟลง เคี่ยวต่อประมาณ 20-30 นาที หรือจนผักทุกอย่างนิ่มเปื่อย'
    },
    { 
      number: 6, 
      text: 'ยกลงจากเตา ใช้เครื่องปั่นมือถือ (Immersion Blender) ปั่นซุปให้เนียนละเอียด',
      tip: 'เคล็ดลับ: ถ้าไม่มีเครื่องปั่นมือถือ พักซุปให้เย็นลงเล็กน้อย แล้วเทใส่โถปั่นปกติ ปั่นจนเนียน'
    },
    { 
      number: 7, 
      text: 'นำซุปกลับไปตั้งไฟอ่อน (ถ้าต้องการซุปครีม ให้ใส่ครีมสดตอนนี้) คนให้เข้ากัน อุ่นให้ร้อน แต่ไม่ต้องเดือด'
    },
    { 
      number: 8, 
      text: 'ปรุงรสด้วยเกลือและพริกไทยขาว ชิมรสตามชอบ'
    },
    { 
      number: 9, 
      text: 'ตักใส่ถ้วย อาจตกแต่งด้วยครีมสด หรือพาร์สลีย์สับ'
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
              uri: 'https://external-preview.redd.it/adding-broccoli-stalks-to-carrot-soup-v0-TI4sM9CLpvZMdf7H6rQfW5yNWFuOHlKbruvtkG2fsqU.jpeg?width=640&crop=smart&auto=webp&s=14c71cf52563460b67c9c462310da34c6022adcf', // Wongnai Image
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ซุปแครอท</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF3E0' }]}>
              {/* ใช้ไอคอน 'bowl-mix' */}
              <MaterialCommunityIcons name="bowl-mix" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>หวานธรรมชาติ เนื้อเนียนละมุน</Text>
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
            <Text style={styles.timeValue}>35 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>2-3 ที่</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {/* ใช้ไอคอน 'carrot' ได้ เพราะมีแน่ๆ */}
             <MaterialCommunityIcons name="carrot" size={24} color="#F57C00" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#F57C00' }]} />
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
                {/* แก้ไข: ใส่ส่วนที่เช็ค tip กลับมา เพราะขั้นตอนนี้มี tip */}
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>{step.text}</Text>
                  {step.tip && (
                    <View style={styles.tipContainer}>
                      <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
                      <Text style={styles.tipText}>{step.tip}</Text>
                    </View>
                  )}
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
            <Text style={styles.tipText}>การผัดหอมใหญ่จนใส จะช่วยดึงความหวานออกมา ทำให้ซุปกลมกล่อม</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ถ้าชอบกลิ่นหอม สามารถใส่ขิงสับเล็กน้อยลงไปผัดพร้อมหอมใหญ่ได้</Text>
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

export default CarrotSoup;