import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type CauliflowerScreenNav = NativeStackNavigationProp<RootStackParamList, 'CauliflowerCheeseBake'>;

const CauliflowerFriedRice = () => {
  const navigation = useNavigation<CauliflowerScreenNav>();

  const mainIngredients = [
    { name: 'กะหล่ำดอก (สับละเอียด หรือ ปั่นหยาบ)', amount: '1 หัวเล็ก' },
    { name: 'ไข่ไก่', amount: '1-2 ฟอง' },
    { name: 'กระเทียม (สับ)', amount: '1 ช้อนชา' },
    { name: 'หอมใหญ่ (หั่นเต๋าเล็ก)', amount: '1/4 หัว' },
    { name: 'แครอท, ถั่วลันเตา (ตามชอบ)', amount: '1/4 ถ้วย' },
    { name: 'เนื้อสัตว์ (ไก่, กุ้ง, หมู) (ถ้าใส่)', amount: '50-100 กรัม' },
    { name: 'ซีอิ๊วขาว หรือ ซอสปรุงรส', amount: '1-2 ช้อนโต๊ะ' },
    { name: 'น้ำมันหอย (ถ้าชอบ)', amount: '1 ช้อนชา' },
    { name: 'น้ำมันพืช', amount: '2 ช้อนโต๊ะ' },
    { name: 'พริกไทยป่น', amount: 'เล็กน้อย' },
    { name: 'ต้นหอมซอย (สำหรับโรย)', amount: 'เล็กน้อย' },
  ];

  const steps = [
    {
      number: 1,
      text: 'เตรียมข้าวกะหล่ำดอก: สับกะหล่ำดอกด้วยมีดให้ละเอียด หรือใช้ Food Processor ปั่นหยาบๆ ให้มีลักษณะคล้ายเม็ดข้าว'
    },
    {
      number: 2,
      text: 'ตั้งกระทะ ใส่น้ำมันพืช ใช้ไฟกลางค่อนข้างแรง ใส่กระเทียมลงไปเจียวให้หอม'
    },
    {
      number: 3,
      text: 'ถ้าใส่เนื้อสัตว์ ให้ใส่ลงไปผัดตอนนี้จนสุก'
    },
    {
      number: 4,
      text: 'ใส่หอมใหญ่, แครอท, ถั่วลันเตา ผัดให้นิ่มเล็กน้อย'
    },
    {
      number: 5,
      text: 'ตอกไข่ใส่ลงไป ยีไข่ให้พอแตก ผัดให้ไข่สุก'
    },
    {
      number: 6,
      text: 'ใส่ข้าวกะหล่ำดอกที่เตรียมไว้ลงไป ผัดคลุกเคล้าให้เข้ากัน'
    },
     {
      number: 7,
      text: 'ปรุงรสด้วยซีอิ๊วขาว, น้ำมันหอย(ถ้าใช้)'
    },
     {
      number: 8,
      text: 'เร่งไฟแรง ผัดเร็วๆ ให้กะหล่ำดอกสุก แต่ยังมีความกรุบเล็กน้อย (ประมาณ 2-3 นาที)',
      tip: 'เคล็ดลับ: อย่าผัดนานเกินไป ข้าวกะหล่ำดอกจะแฉะและไม่เป็นเม็ด'
    },
    {
      number: 9,
      text: 'ปิดไฟ โรยพริกไทยป่น และต้นหอมซอย คลุกเคล้าเบาๆ'
    },
    {
      number: 10,
      text: 'ตักใส่จาน เสิร์ฟร้อนๆ'
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
              uri: 'https://s359.kapook.com/pagebuilder/107d9c22-c561-4e73-83d8-ec8eb89afe28.jpg', // รูปข้าวผัด
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ข้าวผัดกะหล่ำดอก</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#E8F5E9' }]}>
               {/* ใช้ไอคอน 'rice' */}
              <MaterialCommunityIcons name="rice" size={16} color="#4CAF50" />
              <Text style={[styles.tasteText, { color: '#4CAF50' }]}>อร่อยเบาท้อง ทางเลือกสุขภาพ</Text>
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
            <Text style={styles.timeValue}>10 นาที</Text>
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
            <MaterialCommunityIcons name="food" size={24} color="#757575" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#757575' }]} />
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
                {/* มี tip ในขั้นตอนนี้ */}
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

        {/* Tips Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ใช้ Food Processor ปั่นกะหล่ำดอก จะได้เม็ดขนาดสม่ำเสมอเหมือนข้าวมากกว่าการสับด้วยมีด</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ผัดด้วยไฟแรงและเร็ว จะช่วยให้ข้าวกะหล่ำดอกไม่แฉะ คงความกรุบไว้ได้</Text>
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

export default CauliflowerFriedRice;