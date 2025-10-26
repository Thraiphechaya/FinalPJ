import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type OnionScreenNav = NativeStackNavigationProp<RootStackParamList, 'OnionScreen'>; 

const FrenchOnionSoup = () => { 
  const navigation = useNavigation<OnionScreenNav>();

  const mainIngredients = [
    { name: 'หอมใหญ่ (ซอยบาง)', amount: '3-4 หัว' },
    { name: 'เนยจืด', amount: '2 ช้อนโต๊ะ' },
    { name: 'น้ำมันมะกอก', amount: '1 ช้อนโต๊ะ' },
    { name: 'แป้งสาลีอเนกประสงค์', amount: '1 ช้อนโต๊ะ' },
    { name: 'น้ำสต็อกเนื้อ', amount: '4 ถ้วย' },
    { name: 'ไวน์ขาว (ไม่ใส่ก็ได้)', amount: '1/4 ถ้วย' },
    { name: 'ใบไทม์สด หรือ ใบกระวาน', amount: '1-2 กิ่ง/ใบ' },
    { name: 'เกลือ, พริกไทยดำ', amount: 'ตามชอบ' },
  ];

  const toppingIngredients = [
     { name: 'ขนมปังฝรั่งเศส (หั่นหนา)', amount: '2-3 ชิ้น' },
     { name: 'ชีสกรูแยร์ หรือ มอสซาเรลล่า (ขูด)', amount: '1/2 ถ้วย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ตั้งหม้อ ใส่เนยและน้ำมันมะกอก ใช้ไฟอ่อน'
    },
    { 
      number: 2, 
      text: 'ใส่หอมใหญ่ซอยลงไป ผัดช้าๆ ไปเรื่อยๆ จนหอมใหญ่เปลี่ยนเป็นสีน้ำตาลเข้ม (Caramelize)',
      tip: 'เคล็ดลับ: ขั้นตอนนี้สำคัญที่สุด ใช้เวลาประมาณ 30-40 นาที ไฟต้องอ่อน และคนเป็นระยะ ห้ามใจร้อน ไม่งั้นหอมจะไหม้และขม'
    },
    { 
      number: 3, 
      text: 'เมื่อหอมได้ที่ โรยแป้งสาลีลงไป ผัดเร็วๆ ประมาณ 1 นาที'
    },
    { 
      number: 4, 
      text: 'ถ้าใช้ไวน์ขาว ให้เทลงไปตอนนี้ ขูดก้นหม้อเบาๆ เคี่ยวให้แอลกอฮอล์ระเหย'
    },
    { 
      number: 5, 
      text: 'ค่อยๆ เทน้ำสต็อกเนื้อลงไป ใส่ใบไทม์/ใบกระวาน'
    },
    { 
      number: 6, 
      text: 'ปรุงรสด้วยเกลือ พริกไทย ต้มให้เดือด แล้วลดไฟลง เคี่ยวต่ออีก 20-30 นาที'
    },
    { 
      number: 7, 
      text: 'ตักใบไทม์/ใบกระวานออก ชิมรส ปรุงเพิ่มตามชอบ'
    },
    { 
      number: 8, 
      text: 'ตักซุปใส่ถ้วยที่ทนความร้อนได้'
    },
     { 
      number: 9, 
      text: 'วางขนมปังฝรั่งเศส (อาจปิ้งก่อนเล็กน้อย) ลงบนหน้าซุป โรยด้วยชีสขูด'
    },
    { 
      number: 10, 
      text: 'นำเข้าเตาอบ (ใช้ไฟบน หรือ Broil) หรือใช้ไฟพ่น (Torch) จนชีสละลายและเป็นสีน้ำตาลสวยงาม',
      tip: 'เคล็ดลับ: ระวังอย่าให้ชีสไหม้'
    },
    { 
      number: 11, 
      text: 'เสิร์ฟทันทีขณะร้อน (ระวังถ้วยร้อนมาก)'
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
              uri: 'https://naturalpalm.com/wp-content/uploads/2019/11/%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9-%E0%B8%8B%E0%B8%B8%E0%B8%9B%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%AB%E0%B8%AD%E0%B8%A1-%E0%B8%AA%E0%B8%B9%E0%B9%89%E0%B8%AB%E0%B8%99%E0%B8%B2%E0%B8%A7-02.jpg', // Wongnai Image
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ซุปหัวหอม</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF3E0' }]}>
              {/* ใช้ไอคอน 'bowl-mix' */}
              <MaterialCommunityIcons name="bowl-mix" size={16} color="#795548" />
              <Text style={[styles.tasteText, { color: '#795548' }]}>หวานหอม กลมกล่อม ชีสเยิ้ม</Text>
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
            <Text style={styles.timeValue}>60 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>2-3 ที่</Text>
          </View>
        </View>

        {/* Soup Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-variant" size={24} color="#795548" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมซุป</Text>
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

        {/* Topping Ingredients Section */}
         <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="cheese" size={24} color="#FFC107" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมหน้าชีส</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {toppingIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FFC107' }]} />
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
            <Text style={styles.tipText}>การผัดหอมใหญ่ให้เป็นสีน้ำตาลเข้ม (Caramelize) คือหัวใจของซุปนี้ ต้องใช้ไฟอ่อนและใจเย็นๆ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ใช้น้ำสต็อกเนื้อจะให้รสชาติที่เข้มข้นกลมกล่อมตามต้นตำรับที่สุด</Text>
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

export default FrenchOnionSoup;