import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type OrangeScreenNav = NativeStackNavigationProp<RootStackParamList, 'OrangeScreen'>; // สมมติว่า Screen นี้ชื่อ 'OrangeScreen'

const JuiceOrange = () => {
  const navigation = useNavigation<OrangeScreenNav>();

  const mainIngredients = [
    { name: 'ส้ม (สายน้ำผึ้ง หรือ เขียวหวาน)', amount: '3-5 ผล' },
    { name: 'เกลือป่น', amount: 'เล็กน้อย (1 ปลายหยิบมือ)' },
    { name: 'น้ำแข็ง', amount: 'สำหรับเสิร์ฟ (หรือไม่ใส่)' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ล้างเปลือกส้มด้านนอกให้สะอาด ซับให้แห้ง'
    },
    { 
      number: 2, 
      text: 'ผ่าส้มครึ่งตามขวาง เตรียมพร้อมสำหรับคั้น'
    },
    { 
      number: 3, 
      text: 'นำส้มที่ผ่าครึ่งแล้วไปคั้นด้วยที่คั้นน้ำส้ม',
      tip: 'เคล็ดลับ: ไม่ควรกดบี้เปลือกส้มแรงเกินไป เพราะน้ำมันจากเปลือก (ที่มีรสขม) อาจจะออกมาปนกับน้ำส้ม'
    },
    { 
      number: 4, 
      text: 'เทน้ำส้มผ่านกระชอนตาถี่ๆ (ขั้นตอนนี้สำหรับคนที่ไม่ชอบเกล็ดส้ม)'
    },
    { 
      number: 5, 
      text: 'เติมเกลือป่นลงไปเล็กน้อย คนให้เข้ากัน (เกลือจะช่วยชูรสหวานของส้มให้ชัดขึ้น)'
    },
    { 
      number: 6, 
      text: 'เทใส่แก้วที่มีน้ำแข็ง หรือเสิร์ฟแบบแช่เย็น (ถ้าส้มเย็นอยู่แล้ว)'
    },
    { 
      number: 7, 
      text: 'เสิร์ฟทันทีเพื่อคุณค่าทางอาหารสูงสุด'
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
              // เปลี่ยนรูปภาพเป็นน้ำส้ม
              uri: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg', 
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>น้ำส้มคั้นสด</Text>
            <View style={styles.tasteTag}>
              {/* เปลี่ยนไอคอนและข้อความ */}
              <MaterialCommunityIcons name="fruit-citrus" size={16} color="#FF9800" />
              <Text style={styles.tasteText}>สดชื่น วิตามินซีสูง</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียมส่วนผสม</Text>
            <Text style={styles.timeValue}>5 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาทำ</Text>
            <Text style={styles.timeValue}>5 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 แก้ว</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {/* เปลี่ยนไอคอน */}
            <MaterialCommunityIcons name={("fruit-citrus" as any)} size={24} color="#FF9800" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมหลัก</Text>
              {/* ลบ Subtitle ที่ไม่จำเป็นออก */}
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
          {/* เปลี่ยนเคล็ดลับ */}
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name={("fruit-citrus" as any)} size={16} color="#FF9800" />
            <Text style={styles.tipText}>เลือกส้มที่เปลือกบางและมีน้ำหนัก จะได้น้ำเยอะ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#FF6B6B" />
            <Text style={styles.tipText}>อย่าคั้นแรงจนถึงเปลือก จะทำให้น้ำมีรสขมจากน้ำมันที่เปลือก</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="plus-circle-outline" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>ใส่เกลือเล็กน้อยจะช่วยดึงรสหวานของส้มให้ชัดเจนขึ้น</Text>
          </View>
        </View>

        {/* Serving Suggestion */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food" size={24} color="#9C27B0" />
            <Text style={styles.sectionTitle}>คำแนะนำในการเสิร์ฟ</Text>
          </View>
          {/* เปลี่ยนคำแนะนำ */}
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>ควรดื่มทันทีหลังจากคั้นเสร็จ เพื่อให้ได้วิตามินซีสูงสุด</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>ดื่มแบบแช่เย็น (ไม่ใส่น้ำแข็ง) จะได้รสชาติส้มที่เข้มข้น</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>ตกแต่งขอบแก้วด้วยส้มฝานบางๆ เพื่อความสวยงาม</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// ส่วนของ Styles (ใช้ของเดิมทั้งหมด)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4E4A0', // สีพื้นหลัง (จากโค้ดเดิม)
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
    backgroundColor: '#FFF9F9', // อาจปรับสีให้เข้ากับส้ม เช่น '#FFF3E0'
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  tasteText: {
    fontSize: 14,
    color: '#FF6B6B', // อาจปรับสีให้เข้ากับส้ม เช่น '#E65100'
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

export default JuiceOrange;