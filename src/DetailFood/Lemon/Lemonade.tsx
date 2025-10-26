import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type LemonScreenNav = NativeStackNavigationProp<RootStackParamList, 'LemonScreen'>; 

const Lemonade = () => { 
  const navigation = useNavigation<LemonScreenNav>();

  const mainIngredients = [
    { name: 'น้ำเลมอนคั้นสด', amount: '1/2 ถ้วย (ประมาณ 2-3 ลูก)' },
    { name: 'น้ำตาลทราย', amount: '1/2 ถ้วย (ปรับความหวานได้)' },
    { name: 'น้ำเปล่า (สำหรับทำน้ำเชื่อม)', amount: '1/2 ถ้วย' },
    { name: 'น้ำเปล่าเย็นจัด หรือ โซดา', amount: '3-4 ถ้วย (สำหรับผสม)' },
    { name: 'เลมอนฝานบางๆ และ ใบสะระแหน่', amount: 'สำหรับตกแต่ง' },
    { name: 'เกลือ', amount: 'เล็กน้อย (ปลายหยิบมือ)' },
    { name: 'น้ำแข็ง', amount: 'สำหรับเสิร์ฟ' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ทำน้ำเชื่อม: ต้มน้ำเปล่า (1/2 ถ้วย) กับน้ำตาลทรายในหม้อ ใช้ไฟอ่อน คนจนน้ำตาลละลายหมด ปิดไฟ พักให้เย็นสนิท'
    },
    { 
      number: 2, 
      text: 'คั้นน้ำเลมอนสด เตรียมไว้'
    },
    { 
      number: 3, 
      text: 'ในเหยือกผสม เทน้ำเชื่อมที่เย็นแล้ว และน้ำเลมอนคั้นสดลงไป'
    },
    { 
      number: 4, 
      text: 'เติมเกลือเล็กน้อย คนให้เข้ากัน'
    },
    { 
      number: 5, 
      text: 'เติมน้ำเปล่าเย็นจัด หรือ โซดา ลงไป คนให้เข้ากัน'
    },
    { 
      number: 6, 
      text: 'ชิมรสชาติ ปรับความหวานหรือความเปรี้ยวได้ตามชอบ (เติมน้ำเชื่อม/น้ำเลมอน/น้ำเปล่า เพิ่ม)'
    },
    { 
      number: 7, 
      text: 'เตรียมแก้ว ใส่น้ำแข็ง ใส่เลมอนฝาน และใบสะระแหน่'
    },
    { 
      number: 8, 
      text: 'เทน้ำเลมอนเนดที่ผสมไว้ใส่แก้ว พร้อมเสิร์ฟ'
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
              uri: 'https://baac-farmersmarket.com/wp-content/uploads/2025/06/004-2.jpg', 
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>น้ำเลมอนเนด</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFFDE7' }]}>
              {/* ใช้ไอคอน 'cup' */}
              <MaterialCommunityIcons name="cup" size={16} color="#FBC02D" />
              <Text style={[styles.tasteText, { color: '#FBC02D' }]}>เปรี้ยวหวาน ชื่นใจ ดับกระหาย</Text>
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
            <Text style={styles.timeLabel}>เวลาปรุง (น้ำเชื่อม)</Text>
            <Text style={styles.timeValue}>5 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>4-5 แก้ว</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {/* ใช้ไอคอน 'water' */}
            <MaterialCommunityIcons name="water" size={24} color="#FBC02D" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FBC02D' }]} />
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
            <Text style={styles.tipText}>การทำน้ำเชื่อมก่อน จะช่วยให้น้ำตาลละลายหมด ไม่ตกตะกอน และผสมง่าย</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ใส่เกลือเล็กน้อย จะช่วยตัดรสเปรี้ยวแหลมและชูรสหวานให้กลมกล่อมขึ้น</Text>
          </View>
           <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ถ้าชอบซ่า ให้ใช้โซดาเย็นจัดแทนน้ำเปล่าตอนผสม จะอร่อยไปอีกแบบ</Text>
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

export default Lemonade;