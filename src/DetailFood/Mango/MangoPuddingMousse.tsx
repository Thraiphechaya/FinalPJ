import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type MangoScreenNav = NativeStackNavigationProp<RootStackParamList, 'MangoYogurtSmoothie'>; 

const MangoPuddingMousse = () => { 
  const navigation = useNavigation<MangoScreenNav>();

  const puddingIngredients = [
    { name: 'เนื้อมะม่วงสุก (ปั่นละเอียด)', amount: '150 กรัม' },
    { name: 'เจลาตินแผ่น', amount: '2 แผ่น' },
    { name: 'น้ำเปล่า', amount: '50 กรัม' },
    { name: 'น้ำตาลทราย', amount: '30 กรัม' },
  ];
  
  const mousseIngredients = [
    { name: 'กะทิ', amount: '60 กรัม' },
    { name: 'ครีมชีส', amount: '70 กรัม' },
    { name: 'น้ำตาลทราย', amount: '30 กรัม' },
    { name: 'เจลาตินแผ่น', amount: '1 แผ่น' },
    { name: 'น้ำเปล่า', amount: '30 กรัม' },
    { name: 'เกลือ', amount: '1/8 ช้อนชา' },
    { name: 'เนื้อมะม่วงสุก (หั่นเต๋า)', amount: 'สำหรับตกแต่ง' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ทำพุดดิ้ง: แช่เจลาติน (2 แผ่น) ในน้ำเย็นจัดให้นิ่ม'
    },
    { 
      number: 2, 
      text: 'ต้มน้ำเปล่า (50 ก.) กับน้ำตาลทรายให้เดือด ปิดไฟ ใส่เจลาตินที่นิ่มแล้วลงไปคนให้ละลาย'
    },
    { 
      number: 3, 
      text: 'เทส่วนผสมน้ำเชื่อมเจลาตินลงในเนื้อมะม่วงปั่น คนให้เข้ากัน เทใส่แก้ว แช่เย็นให้เซ็ตตัว'
    },
    { 
      number: 4, 
      text: 'ทำมูส: แช่เจลาติน (1 แผ่น) ในน้ำเย็นจัดให้นิ่ม'
    },
    { 
      number: 5, 
      text: 'อุ่นกะทิ (ไม่ต้องเดือด) ใส่เจลาตินที่นิ่มแล้วลงไปคนให้ละลาย พักไว้'
    },
    { 
      number: 6, 
      text: 'ตีครีมชีส, น้ำตาล, เกลือ ให้เนียนเข้ากัน'
    },
    { 
      number: 7, 
      text: 'เทส่วนผสมกะทิ (ที่อุณหภูมิห้อง) ลงในครีมชีส ตีผสมให้เข้ากัน'
    },
    { 
      number: 8, 
      text: 'นำพุดดิ้งมะม่วงที่เซ็ตตัวแล้วออกจากตู้เย็น ราดมูสชีสกะทิลงไปด้านบน'
    },
    { 
      number: 9, 
      text: 'แช่เย็นอีกครั้งให้มูสเซ็ตตัว ก่อนเสิร์ฟตกแต่งด้วยมะม่วงสุกหั่นเต๋า'
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
              uri: 'https://img.wongnai.com/p/1920x0/2023/02/28/140320fc9f714920964bfe86a34e3a51.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>พุดดิ้งมะม่วงมูสชีสกะทิ</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9E6' }]}>
              {/* ใช้ไอคอนมาตรฐาน 'food-variant' (ไม่มี as any) */}
              <MaterialCommunityIcons name="food-variant" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>หวานมัน หอมมะม่วงกะทิ</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม</Text>
            <Text style={styles.timeValue}>30 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาปรุง (ไม่รวมแช่)</Text>
            <Text style={styles.timeValue}>20 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>2-3 ที่</Text>
          </View>
        </View>

        {/* Pudding Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {/* ใช้ไอคอนมาตรฐาน 'food' (ไม่มี as any) */}
            <MaterialCommunityIcons name="food" size={24} color="#FFB300" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมพุดดิ้ง</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {puddingIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FFB300' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Mousse Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="cup" size={24} color="#4CAF50" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมมูสชีสกะทิ</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mousseIngredients.map((item, index) => (
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
            <Text style={styles.tipText}>การแช่เจลาตินในน้ำเย็นจัดก่อน จะช่วยให้เจลาตินดูดน้ำได้ดีและละลายง่าย</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ตอนผสมกะทิลงในครีมชีส ทั้งสองส่วนควรอุณหภูมิใกล้เคียงกัน (ไม่ร้อนหรือเย็นไป) เพื่อไม่ให้ส่วนผสมแยกชั้น</Text>
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

export default MangoPuddingMousse;