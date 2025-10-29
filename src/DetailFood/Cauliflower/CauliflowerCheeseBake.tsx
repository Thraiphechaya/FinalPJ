import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type CauliflowerScreenNav = NativeStackNavigationProp<RootStackParamList, 'CauliflowerCheeseBake'>;

const CauliflowerCheeseBake = () => {
  const navigation = useNavigation<CauliflowerScreenNav>();

  const mainIngredients = [
    { name: 'กะหล่ำดอก (หั่นชิ้นพอดีคำ)', amount: '1 หัว' },
    { name: 'เนยจืด', amount: '2 ช้อนโต๊ะ' },
    { name: 'แป้งสาลีอเนกประสงค์', amount: '2 ช้อนโต๊ะ' },
    { name: 'นมสด', amount: '1.5 ถ้วย' },
    { name: 'เชดด้าชีส (ขูด)', amount: '1 ถ้วย (ปรับเพิ่มลดได้)' },
    { name: 'เกลือ, พริกไทยขาวป่น', amount: 'ตามชอบ' },
    { name: 'ลูกจันทน์ป่น (Nutmeg)', amount: 'เล็กน้อย (ไม่ใส่ก็ได้)' },
    { name: 'เกล็ดขนมปัง (ถ้าชอบหน้ากรอบ)', amount: '1/4 ถ้วย' },
  ];

  const steps = [
    {
      number: 1,
      text: 'วอร์มเตาอบที่ 180 องศาเซลเซียส'
    },
    {
      number: 2,
      text: 'ลวกกะหล่ำดอกในน้ำเดือดใส่เกลือเล็กน้อย ประมาณ 3-5 นาที ให้พอสลด (ไม่ต้องสุกนิ่ม) ตักขึ้นพักให้สะเด็ดน้ำ'
    },
    {
      number: 3,
      text: 'ทำซอสชีส (Bechamel): ตั้งหม้อ ใส่เนย ใช้ไฟอ่อน รอเนยละลาย ใส่แป้งลงไปผัดเร็วๆ ให้เข้ากัน (ประมาณ 1 นาที)'
    },
    {
      number: 4,
      text: 'ค่อยๆ เทนมสดลงไปทีละน้อย ใช้ตะกร้อมือคนตลอดเวลาเพื่อไม่ให้แป้งจับตัวเป็นก้อน'
    },
    {
      number: 5,
      text: 'เคี่ยวซอสด้วยไฟอ่อนจนข้นขึ้นเล็กน้อย ปรุงรสด้วยเกลือ พริกไทย และลูกจันทน์ป่น (ถ้าใช้)'
    },
    {
      number: 6,
      text: 'ปิดไฟ ใส่ชีสขูดลงไป (แบ่งไว้โรยหน้าเล็กน้อย) คนให้ชีสละลายเข้ากับซอส'
    },
     {
      number: 7,
      text: 'นำกะหล่ำดอกที่ลวกไว้ใส่ในถาดอบ หรือจานทนความร้อน'
    },
     {
      number: 8,
      text: 'ราดซอสชีสลงไปให้ทั่ว คลุกเคล้าเล็กน้อย'
    },
    {
      number: 9,
      text: 'โรยหน้าด้วยชีสขูดที่เหลือ และเกล็ดขนมปัง (ถ้าใช้)'
    },
    {
      number: 10,
      text: 'นำเข้าเตาอบ ประมาณ 20-25 นาที หรือจนหน้าเหลืองสวยงาม'
    },
     {
      number: 11,
      text: 'นำออกจากเตา พักไว้เล็กน้อยก่อนเสิร์ฟ'
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
              uri: 'https://img.wongnai.com/p/1920x0/2019/10/22/3161b1b6653a418494876fb2f483317b.jpg', // รูป Gratin
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>กะหล่ำดอกอบชีส</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9C4' }]}>
              {/* ใช้ไอคอน 'cheese' */}
              <MaterialCommunityIcons name="cheese" size={16} color="#FBC02D" />
              <Text style={[styles.tasteText, { color: '#FBC02D' }]}>หอมมัน เข้มข้น ชีสเยิ้ม</Text>
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
             {/* ใช้ไอคอน 'cauliflower' */}
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
                 {/* ลบส่วนเช็ค tip ออก */}
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
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>อย่าลวกกะหล่ำดอกนานเกินไป เพราะต้องนำไปอบต่ออีก จะทำให้เละได้</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ตอนทำซอสชีส ต้องคนตลอดเวลาและใช้ไฟอ่อน ป้องกันซอสไหม้และแป้งจับตัวเป็นก้อน</Text>
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

export default CauliflowerCheeseBake;