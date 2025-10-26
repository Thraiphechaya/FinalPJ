import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type PotatoScreenNav = NativeStackNavigationProp<RootStackParamList, 'PotatoScreen'>; 

const GarlicButterPotatoes = () => { 
  const navigation = useNavigation<PotatoScreenNav>();

  const mainIngredients = [
    { name: 'มันฝรั่ง (ลูกเล็ก หรือหั่นเต๋า)', amount: '500 กรัม' },
    { name: 'เนยจืด', amount: '2-3 ช้อนโต๊ะ' },
    { name: 'กระเทียม (สับละเอียด)', amount: '3-4 กลีบ' },
    { name: 'พาร์สลีย์สด (สับ)', amount: '1-2 ช้อนโต๊ะ' },
    { name: 'เกลือ', amount: '1/2 ช้อนชา (ปรับรส)' },
    { name: 'พริกไทยดำบดหยาบ', amount: '1/4 ช้อนชา' },
    { name: 'น้ำมันพืช (สำหรับต้ม/ผัด)', amount: 'เล็กน้อย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ล้างมันฝรั่งให้สะอาด หั่นเป็นชิ้นพอดีคำ (ถ้าลูกเล็กไม่ต้องหั่น)'
    },
    { 
      number: 2, 
      text: 'ต้มมันฝรั่งในน้ำเดือดใส่เกลือเล็กน้อย จนเกือบสุก (ใช้ส้อมจิ้มแล้วยังรู้สึกตึงๆ นิดหน่อย)',
      tip: 'เคล็ดลับ: ต้มแค่พอเกือบสุก จะทำให้ตอนผัดเนื้อไม่เละ และผิวด้านนอกเกรียมสวย'
    },
    { 
      number: 3, 
      text: 'เทน้ำทิ้ง พักมันฝรั่งให้สะเด็ดน้ำ'
    },
    { 
      number: 4, 
      text: 'ตั้งกระทะ ใส่น้ำมันพืชเล็กน้อย ใช้ไฟกลางค่อนข้างแรง'
    },
    { 
      number: 5, 
      text: 'ใส่มันฝรั่งที่ต้มแล้วลงไป จี่หรือผัดให้ผิวเริ่มเหลืองเกรียมเล็กน้อย (ประมาณ 5-7 นาที)'
    },
     { 
      number: 6, 
      text: 'ลดไฟลง ใส่เนยลงไป รอจนเนยละลาย'
    },
     { 
      number: 7, 
      text: 'ใส่กระเทียมสับ ผัดเร็วๆ ให้หอม (ระวังกระเทียมไหม้)'
    },
    { 
      number: 8, 
      text: 'ปิดไฟ ใส่พาร์สลีย์สับ เกลือ และพริกไทยดำ'
    },
    { 
      number: 9, 
      text: 'คลุกเคล้าให้เข้ากัน ชิมรส ปรับตามชอบ'
    },
    { 
      number: 10, 
      text: 'ตักใส่จาน เสิร์ฟเป็นเครื่องเคียง'
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
              uri: 'https://www.sugarsaltmagic.com/wp-content/uploads/2020/12/Garlic-Butter-Potatoes-with-Crispy-Prosciutto-4FEAT-500x500.jpg', 
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>มันฝรั่งผัดเนยกระเทียม</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9E6' }]}>
              {/* ใช้ไอคอน 'garlic' */}
              <MaterialCommunityIcons name="food-variant" size={16} color="#795548" />
              <Text style={[styles.tasteText, { color: '#795548' }]}>หอมเนยกระเทียม ผิวนอกเกรียม</Text>
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
            <Text style={styles.timeValue}>20 นาที</Text>
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
            <MaterialCommunityIcons name="pot-steam" size={24} color="#795548" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
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
            <Text style={styles.tipText}>การต้มมันฝรั่งก่อนนำไปผัด จะช่วยให้มันฝรั่งสุกทั่วถึง และใช้เวลาผัดสั้นลง</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ใส่กระเทียมตอนท้ายๆ หลังลดไฟแล้ว เพื่อไม่ให้กระเทียมไหม้และมีรสขม</Text>
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

export default GarlicButterPotatoes;