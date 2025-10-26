import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type OnionScreenNav = NativeStackNavigationProp<RootStackParamList, 'OnionScreen'>; 

const OnionRings = () => { 
  const navigation = useNavigation<OnionScreenNav>();

  const mainIngredients = [
    { name: 'หอมใหญ่ (หัวใหญ่)', amount: '1-2 หัว' },
    { name: 'แป้งทอดกรอบ', amount: '1 ถ้วย' },
    { name: 'น้ำเย็นจัด', amount: 'ประมาณ 1/2 ถ้วย (ค่อยๆ เติม)' },
    { name: 'เกลือ, พริกไทย', amount: 'เล็กน้อย (ปรุงรสแป้ง)' },
    { name: 'น้ำมันพืช (สำหรับทอด)', amount: 'ท่วมชิ้นหอม' },
    { name: 'ซอสมะเขือเทศ หรือ มายองเนส', amount: 'สำหรับจิ้ม' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ปอกเปลือกหอมใหญ่ หั่นเป็นแว่นหนาประมาณ 1/2 นิ้ว แล้วแยกออกเป็นวงๆ'
    },
    { 
      number: 2, 
      text: 'เตรียมแป้งชุบทอด: ผสมแป้งทอดกรอบ, เกลือ, พริกไทย ในชาม'
    },
    { 
      number: 3, 
      text: 'ค่อยๆ เติมน้ำเย็นจัดลงไป คนให้เข้ากันจนแป้งข้นพอเคลือบหอม (ไม่ใสหรือข้นเกินไป)',
      tip: 'เคล็ดลับ: น้ำเย็นจัดจะช่วยให้แป้งกรอบนานขึ้น'
    },
    { 
      number: 4, 
      text: 'ตั้งกระทะ ใส่น้ำมัน ใช้ไฟกลางค่อนข้างแรง รอให้น้ำมันร้อนจัด'
    },
    { 
      number: 5, 
      text: 'นำวงหอมใหญ่ชุบลงในแป้งที่ผสมไว้ให้ทั่ว'
    },
    { 
      number: 6, 
      text: 'ค่อยๆ หย่อนลงทอดในน้ำมันร้อน (อย่าใส่เยอะเกินไปในแต่ละครั้ง)'
    },
    { 
      number: 7, 
      text: 'ทอดจนเหลืองกรอบทั้งสองด้าน ตักขึ้นพักบนตะแกรงให้สะเด็ดน้ำมัน'
    },
    { 
      number: 8, 
      text: 'ทำซ้ำจนหมด'
    },
    { 
      number: 9, 
      text: 'จัดใส่จาน เสิร์ฟร้อนๆ คู่กับซอสที่ชอบ'
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
              uri: 'https://img.freepik.com/free-photo/delicious-homemade-crunchy-fried-onion-rings-with-spicy-sauce_261158-3047.jpg?w=740', // Wongnai Image
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>หอมทอด</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9E6' }]}>
              {/* ใช้ไอคอน 'ring' */}
              <MaterialCommunityIcons name="ring" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>กรอบนอก หวานใน กินเพลิน</Text>
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
            <Text style={styles.timeValue}>15 นาที</Text>
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
            {/* ใช้ไอคอน 'food-variant' */}
            <MaterialCommunityIcons name="food-variant" size={24} color="#795548" />
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
            <Text style={styles.tipText}>ใช้น้ำมันใหม่และไฟแรงสม่ำเสมอ จะช่วยให้หอมทอดไม่อมน้ำมัน</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>อาจเพิ่มรสชาติให้แป้งชุบทอด โดยใส่ผงปาปริก้า หรือผงกระเทียมเล็กน้อย</Text>
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

export default OnionRings;