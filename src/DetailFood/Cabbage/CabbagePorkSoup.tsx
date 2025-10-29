import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type CabbageScreenNav = NativeStackNavigationProp<RootStackParamList, 'CabbagePorkSoup'>; 

const CabbagePorkSoup = () => { 
  const navigation = useNavigation<CabbageScreenNav>();

  const porkIngredients = [
    { name: 'หมูสับ', amount: '150 กรัม' },
    { name: 'วุ้นเส้น (แช่น้ำให้นิ่ม ตัดสั้น)', amount: '30 กรัม' },
    { name: 'สามเกลอ (รากผักชี,กระเทียม,พริกไทย โขลก)', amount: '1 ช้อนโต๊ะ' },
    { name: 'ซีอิ๊วขาว', amount: '1 ช้อนโต๊ะ' },
  ];
  
  const soupIngredients = [
    { name: 'กะหล่ำปลี (แกะเป็นใบใหญ่)', amount: '5-6 ใบ' },
    { name: 'น้ำซุป (ไก่ หรือ หมู)', amount: '3-4 ถ้วย' },
    { name: 'แครอท (หั่นแว่น)', amount: '1/4 หัว' },
    { name: 'เห็ดหอมแห้ง (แช่น้ำ)', amount: '2-3 ดอก' },
    { name: 'ซีอิ๊วขาว (ปรุงรสซุป)', amount: '1-2 ช้อนโต๊ะ' },
    { name: 'เกลือ, พริกไทย', amount: 'เล็กน้อย' },
    { name: 'ต้นหอม, ผักชี (สำหรับโรย)', amount: 'เล็กน้อย' },
    { name: 'กระเทียมเจียว', amount: 'เล็กน้อย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'เตรียมหมู: ผสมหมูสับ, วุ้นเส้น, สามเกลอ, และซีอิ๊วขาว นวดให้เข้ากันจนเหนียว'
    },
    { 
      number: 2, 
      text: 'เตรียมกะหล่ำปลี: ลวกใบกะหล่ำปลีในน้ำเดือดพอสลด ตักขึ้นแช่น้ำเย็นทันที (จะห่อง่าย)'
    },
    { 
      number: 3, 
      text: 'วางใบกะหล่ำปลีที่ลวกแล้วลงบนเขียง ตักไส้หมูวางตรงกลาง แล้วห่อให้สวยงาม (พับข้าง ม้วน)',
      tip: 'เคล็ดลับ: อาจใช้ก้านต้นหอมลวก มัดกะหล่ำปลีที่ห่อแล้ว เพื่อไม่ให้คลายตัว'
    },
    { 
      number: 4, 
      text: 'ทำน้ำซุป: ต้มน้ำซุปในหม้อ ใส่เห็ดหอม แครอท'
    },
    { 
      number: 5, 
      text: 'พอน้ำซุปเดือด ค่อยๆ ใส่กะหล่ำปลีห่อหมูลงไป'
    },
    { 
      number: 6, 
      text: 'ปรุงรสด้วยซีอิ๊วขาว เกลือ พริกไทย ชิมรสตามชอบ'
    },
    { 
      number: 7, 
      text: 'ต้มต่อด้วยไฟอ่อนประมาณ 15-20 นาที จนกะหล่ำปลีนุ่ม และหมูสุกดี'
    },
    { 
      number: 8, 
      text: 'ตักใส่ชาม โรยหน้าด้วยต้นหอม ผักชี และกระเทียมเจียว'
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
              uri: 'https://cdn-cms.cpbrandsite.com/web/recipe/u4hmwompdxgl5kcv4raimimou70ckalq17ug0vi5.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>แกงจืดกะหล่ำปลีห่อหมู</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#E8F5E9' }]}>
              {/* ใช้ไอคอน 'bowl-mix' (ไม่มี as any) */}
              <MaterialCommunityIcons name="bowl-mix" size={16} color="#4CAF50" />
              <Text style={[styles.tasteText, { color: '#4CAF50' }]}>ซุปใส หวาน กลมกล่อม</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม</Text>
            <Text style={styles.timeValue}>20 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาปรุง</Text>
            <Text style={styles.timeValue}>30 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>2-3 ที่</Text>
          </View>
        </View>

        {/* Pork Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="pig" size={24} color="#E91E63" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมไส้หมู</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {porkIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#E91E63' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Soup Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="bowl-mix" size={24} color="#2196F3" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมน้ำซุป</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {soupIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#2196F3' }]} />
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
            <Text style={styles.tipText}>การลวกใบกะหล่ำปลีก่อน จะทำให้ใบนิ่ม ห่อได้ง่ายขึ้น และไม่แตกตอนต้ม</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ค่อยๆ หย่อนกะหล่ำปลีห่อหมูลงในน้ำซุปที่เดือดเบาๆ จะช่วยให้ไส้หมูสุกทั่วถึง และน้ำซุปไม่ขุ่น</Text>
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

export default CabbagePorkSoup;