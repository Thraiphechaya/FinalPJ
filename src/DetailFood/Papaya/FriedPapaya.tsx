import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type PapayaScreenNav = NativeStackNavigationProp<RootStackParamList, 'PapayaSmoothie'>; 

const FriedPapayaSalad = () => { 
  const navigation = useNavigation<PapayaScreenNav>();

  const saladIngredients = [
    { name: 'มะละกอดิบ (สับเป็นเส้น)', amount: '1 ถ้วย' },
    { name: 'แครอท (ขูดเส้น)', amount: '1/4 ถ้วย' },
    { name: 'แป้งทอดกรอบ', amount: '1/2 ถ้วย' },
    { name: 'น้ำเย็นจัด', amount: 'สำหรับผสมแป้ง' },
    { name: 'น้ำมันพืช (สำหรับทอด)', amount: 'พอท่วม' },
    { name: 'ถั่วลิสงทอด (สำหรับโรย)', amount: '2 ช้อนโต๊ะ' },
  ];

  const sauceIngredients = [
    { name: 'พริกขี้หนู (บุบ)', amount: '2-3 เม็ด (ตามชอบ)' },
    { name: 'ซีอิ๊วขาว หรือ น้ำปลาเจ', amount: '2 ช้อนโต๊ะ' },
    { name: 'น้ำมะนาว', amount: '2 ช้อนโต๊ะ' },
    { name: 'น้ำตาลปี๊บ', amount: '1 ช้อนโต๊ะ' },
    { name: 'มะเขือเทศเชอร์รี่ (ผ่าครึ่ง)', amount: '3 ลูก' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ทำน้ำส้มตำเจ: ผสมน้ำตาลปี๊บ, ซีอิ๊วขาว, น้ำมะนาว ในถ้วย คนให้น้ำตาลละลาย'
    },
    { 
      number: 2, 
      text: 'ใส่พริกขี้หนูบุบ และมะเขือเทศเชอร์รี่ลงไป คนให้เข้ากัน พักไว้'
    },
    { 
      number: 3, 
      text: 'เตรียมทอด: ผสมแป้งทอดกรอบกับน้ำเย็นจัด (ไม่ต้องข้นหรือใสเกินไป)'
    },
    { 
      number: 4, 
      text: 'นำเส้นมะละกอและแครอท ลงไปคลุกกับแป้งที่ผสมไว้ ให้แป้งเคลือบพอทั่ว'
    },
    { 
      number: 5, 
      text: 'ตั้งกระทะ ใส่น้ำมัน ใช้ไฟกลางค่อนข้างแรง พอน้ำมันร้อนจัด'
    },
    { 
      number: 6, 
      text: 'นำมะละกอที่ชุบแป้ง (พยายามหยิบให้เป็นแพ) ลงทอดจนเหลืองกรอบ ตักขึ้นพักให้สะเด็ดน้ำมัน'
    },
    { 
      number: 7, 
      text: 'จัดเสิร์ฟ: วางมะละกอทอดลงจาน โรยด้วยถั่วลิสงทอด'
    },
    { 
      number: 8, 
      text: 'เสิร์ฟคู่น้ำส้มตำเจที่เตรียมไว้ (แยกน้ำราดตอนจะกิน จะคงความกรอบได้นาน)'
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
              uri: 'https://img.wongnai.com/p/1600x0/2021/09/25/44169c331aef495f93bae0c5cc2a9a8d.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ส้มตำทอดเจ</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9E6' }]}>
              <MaterialCommunityIcons name="chili-hot" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>กรอบนอก เปรี้ยว เค็ม หวาน</Text>
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
            <Text style={styles.timeValue}>15 นาที</Text>
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
            <MaterialCommunityIcons name="food-variant" size={24} color="#4CAF50" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมส้มตำทอด</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {saladIngredients.map((item, index) => (
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

        {/* Sauce Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="beaker-outline" size={24} color="#F44336" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมน้ำส้มตำเจ</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {sauceIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#F44336' }]} />
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
    backgroundColor: '#F3F9FF', // สีพื้นหลัง Tag
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  tasteText: {
    fontSize: 14,
    color: '#2196F3', // สีข้อความ Tag
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
  sectionSubtitle: { // (แม้จะไม่ได้ใช้ในหน้านี้ แต่คงไว้เผื่อสูตรอื่น)
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

export default FriedPapayaSalad;