import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type EggplantScreenNav = NativeStackNavigationProp<RootStackParamList, 'FriedEggplantEgg'>; 

const SpicyEggplantSaladShrimp = () => { 
  const navigation = useNavigation<EggplantScreenNav>();

  const saladIngredients = [
    { name: 'มะเขือยาว', amount: '2 ลูก' },
    { name: 'กุ้งสด (ลวกสุก)', amount: '6-8 ตัว' },
    { name: 'หมูสับ (รวนสุก)', amount: '50 กรัม' },
    { name: 'หอมแดงซอย', amount: '2 ช้อนโต๊ะ' },
    { name: 'พริกขี้หนูซอย', amount: '1 ช้อนโต๊ะ (ตามชอบ)' },
    { name: 'ไข่ต้ม (ผ่าซีก)', amount: '1 ฟอง' },
    { name: 'ผักชี, ต้นหอม (ซอย)', amount: 'สำหรับโรยหน้า' },
  ];
  
  const dressingIngredients = [
    { name: 'น้ำปลา', amount: '2 ช้อนโต๊ะ' },
    { name: 'น้ำมะนาว', amount: '3 ช้อนโต๊ะ' },
    { name: 'น้ำตาลปี๊บ', amount: '1 ช้อนโต๊ะ' },
    { name: 'น้ำพริกเผา', amount: '1 ช้อนชา (ถ้าชอบ)' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'เผามะเขือยาวด้วยไฟแรง จนเปลือกไหม้ดำและเนื้อมะเขือนิ่ม',
      tip: 'เคล็ดลับ: ใช้เตาแก๊สโดยตรง หรือเตาถ่าน จะหอมกว่าการอบ'
    },
    { 
      number: 2, 
      text: 'นำมะเขือเผามาลอกเปลือกดำออก ล้างน้ำเร็วๆ หั่นเป็นท่อนพอดีคำ จัดใส่จาน'
    },
    { 
      number: 3, 
      text: 'ทำน้ำยำ: ผสมน้ำปลา, น้ำมะนาว, น้ำตาลปี๊บ, น้ำพริกเผา(ถ้าใส่) ในถ้วย คนให้น้ำตาลละลาย'
    },
    { 
      number: 4, 
      text: 'ใส่พริกขี้หนูซอย และหอมแดงซอยลงไป คนให้เข้ากัน ชิมรสปรับตามชอบ'
    },
    { 
      number: 5, 
      text: 'ใส่หมูสับรวน และกุ้งลวกลงไปในน้ำยำ คลุกเคล้าให้เข้ากัน'
    },
     { 
      number: 6, 
      text: 'นำส่วนผสมที่ยำแล้ว ราดลงบนมะเขือเผาที่จัดเตรียมไว้'
    },
     { 
      number: 7, 
      text: 'วางไข่ต้มผ่าซีกลงไป'
    },
    { 
      number: 8, 
      text: 'โรยหน้าด้วยผักชี ต้นหอมซอย พร้อมเสิร์ฟ'
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
              uri: 'https://i.ytimg.com/vi/qEboSw-psNk/maxresdefault.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ยำมะเขือยาวกุ้งสด</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFEBEE' }]}>
              {/* ใช้ไอคอน 'chili-hot' */}
              <MaterialCommunityIcons name="chili-hot" size={16} color="#D32F2F" />
              <Text style={[styles.tasteText, { color: '#D32F2F' }]}>หอมกลิ่นมะเขือเผา รสจัดจ้าน</Text>
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
            <MaterialCommunityIcons name="food-variant" size={24} color="#512DA8" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมยำ</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {saladIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#512DA8' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Dressing Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="beaker-outline" size={24} color="#F44336" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมน้ำยำ</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {dressingIngredients.map((item, index) => (
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
        
        {/* Tips Section (อัปเดตไอคอนตามคำขอ) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ตอนลอกเปลือกมะเขือเผา ให้จุ่มมือในน้ำเย็น จะช่วยให้ลอกง่ายขึ้นและไม่ร้อนมือ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>น้ำยำควรมีรสชาติจัดจ้าน เปรี้ยว เค็ม เผ็ด นำ เพราะมะเขือยาวมีรสจืด</Text>
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

export default SpicyEggplantSaladShrimp;