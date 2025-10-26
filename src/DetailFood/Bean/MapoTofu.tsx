import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type BeanScreenNav = NativeStackNavigationProp<RootStackParamList, 'BeanScreen'>;

const MapoTofu = () => {
  const navigation = useNavigation<BeanScreenNav>();

  const mainIngredients = [
    { name: 'เต้าหู้อ่อน หรือ เต้าหู้ไข่ (หั่นเต๋า)', amount: '1-2 หลอด/ก้อน' },
    { name: 'หมูสับ', amount: '100 กรัม' },
    { name: 'เห็ดหอมสด หรือ แห้ง (แช่น้ำ หั่นเต๋า)', amount: '2-3 ดอก' },
    { name: 'ต้นหอม (ซอย)', amount: '1 ต้น' },
    { name: 'กระเทียม (สับ)', amount: '1 ช้อนโต๊ะ' },
    { name: 'ขิง (สับ)', amount: '1 ช้อนชา (ไม่ใส่ก็ได้)' },
    { name: 'น้ำมันพืช', amount: '2 ช้อนโต๊ะ' },
  ];

  const sauceIngredients = [
     { name: 'น้ำมันหอย', amount: '1.5 ช้อนโต๊ะ' },
     { name: 'ซีอิ๊วขาว', amount: '1 ช้อนโต๊ะ' },
     { name: 'เต้าเจี้ยว หรือ ซอสพริกเสฉวน(โต้วป้านเจี้ยง)', amount: '1 ช้อนโต๊ะ (ถ้าชอบเผ็ด)' },
     { name: 'น้ำตาลทราย', amount: '1 ช้อนชา' },
     { name: 'พริกไทยป่น', amount: 'เล็กน้อย' },
     { name: 'น้ำซุป หรือ น้ำเปล่า', amount: '1/2 ถ้วย' },
     { name: 'แป้งข้าวโพด หรือ แป้งมัน (ละลายน้ำ)', amount: '1 ช้อนโต๊ะ' },
     { name: 'น้ำมันงา', amount: '1 ช้อนชา' },
  ];

  const steps = [
    {
      number: 1,
      text: 'ตั้งกระทะ ใส่น้ำมันพืช ใช้ไฟกลาง ใส่กระเทียมและขิง(ถ้าใช้)ลงไปผัดให้หอม'
    },
    {
      number: 2,
      text: 'ใส่หมูสับลงไป ผัดยีให้หมูสุกและร่วน'
    },
    {
      number: 3,
      text: 'ใส่เต้าเจี้ยวหรือซอสพริกเสฉวน (ถ้าใช้) ลงไปผัดให้หอม'
    },
    {
      number: 4,
      text: 'ใส่เห็ดหอมลงไปผัด'
    },
    {
      number: 5,
      text: 'ปรุงรสด้วยน้ำมันหอย, ซีอิ๊วขาว, น้ำตาลทราย, พริกไทยป่น'
    },
    {
      number: 6,
      text: 'เติมน้ำซุปหรือน้ำเปล่า รอให้เดือด'
    },
     {
      number: 7,
      text: 'ค่อยๆ ใส่เต้าหู้ที่หั่นไว้ลงไป ใช้ตะหลิวคนเบาๆ ระวังเต้าหู้เละ'
    },
     {
      number: 8,
      text: 'พอเดือดอีกครั้ง ค่อยๆ เทแป้งละลายน้ำลงไป คนเบาๆ จนซอสข้นขึ้นตามต้องการ'
    },
    {
      number: 9,
      text: 'ปิดไฟ ใส่น้ำมันงา และต้นหอมซอย (แบ่งไว้โรยหน้าเล็กน้อย) คลุกเคล้าเบาๆ'
    },
    {
      number: 10,
      text: 'ตักราดบนข้าวสวยร้อนๆ โรยหน้าด้วยต้นหอมซอยที่เหลือ'
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
              uri: 'https://images.aws.nestle.recipes/original/991639ef7abd1cfb431ba33b4ab4be4f_artboard_8.jpg', // Wongnai Image
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>เต้าหู้ทรงเครื่อง</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9E6' }]}>
               {/* ใช้ไอคอน 'food' */}
              <MaterialCommunityIcons name="food" size={16} color="#795548" />
              <Text style={[styles.tasteText, { color: '#795548' }]}>นุ่มละมุนลิ้น รสกลมกล่อม</Text>
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
            <Text style={styles.timeValue}>1-2 ที่</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-variant" size={24} color="#757575" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมหลัก</Text>
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

         {/* Sauce Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="beaker-outline" size={24} color="#F44336" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมซอส</Text>
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
            <Text style={styles.tipText}>ใช้เต้าหู้อ่อนหรือเต้าหู้ไข่จะนุ่มอร่อยกว่าเต้าหู้แข็ง</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ตอนใส่เต้าหู้และตอนคนซอส ให้ทำเบาๆ เพื่อไม่ให้เต้าหู้เละ</Text>
          </View>
           <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ถ้าชอบรสจัดจ้านแบบเสฉวน ให้ใช้ซอสพริกเสฉวน (โต้วป้านเจี้ยง) แทนเต้าเจี้ยว</Text>
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

export default MapoTofu;