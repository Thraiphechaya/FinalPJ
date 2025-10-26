import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type PotatoScreenNav = NativeStackNavigationProp<RootStackParamList, 'PotatoScreen'>; 

const MashedPotatoes = () => { 
  const navigation = useNavigation<PotatoScreenNav>();

  const mainIngredients = [
    { name: 'มันฝรั่ง (ปอกเปลือก หั่นเต๋า)', amount: '3-4 หัว (ประมาณ 500g)' },
    { name: 'นมสด (อุ่น)', amount: '1/4 - 1/2 ถ้วย (ปรับความข้นได้)' },
    { name: 'เนยจืด (อุณหภูมิห้อง)', amount: '2-3 ช้อนโต๊ะ' },
    { name: 'เกลือ', amount: '1/2 ช้อนชา (ปรับรส)' },
    { name: 'พริกไทยขาวป่น', amount: 'เล็กน้อย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'นำมันฝรั่งที่ปอกเปลือกและหั่นเต๋าแล้ว ใส่หม้อ เติมน้ำให้ท่วม ใส่เกลือเล็กน้อย'
    },
    { 
      number: 2, 
      text: 'ต้มด้วยไฟกลางจนมันฝรั่งสุกนิ่ม (ใช้ส้อมจิ้มแล้วนิ่ม بسهولة)',
      tip: 'เคล็ดลับ: อย่าต้มนานเกินไป มันฝรั่งจะอุ้มน้ำ ทำให้มันบดแฉะ'
    },
    { 
      number: 3, 
      text: 'เทน้ำทิ้งให้หมด พักมันฝรั่งให้สะเด็ดน้ำ และระอุเล็กน้อย (ประมาณ 1-2 นาที)'
    },
    { 
      number: 4, 
      text: 'บดมันฝรั่งขณะที่ยังร้อนด้วยที่บดมันฝรั่ง (Potato Masher/Ricer) หรือหลังส้อม จนละเอียดเนียน'
    },
    { 
      number: 5, 
      text: 'ค่อยๆ ใส่นมอุ่น และเนย ลงไปทีละน้อย ใช้พายยางหรือทัพพีคนตะล่อมเบาๆ ให้เข้ากัน'
    },
    { 
      number: 6, 
      text: 'ปรุงรสด้วยเกลือ และพริกไทยขาว คนให้เข้ากัน ชิมรส ปรับตามชอบ'
    },
    { 
      number: 7, 
      text: 'ตักใส่จาน อาจราดด้วยเกรวี่ หรือทานเคียงกับสเต็ก'
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
              uri: 'https://cdn.hellokhunmor.com/wp-content/uploads/2019/09/14.-Mashed-potato.jpg?w=1080&q=100', 
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>มันบด</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9E6' }]}>
              {/* ใช้ไอคอน 'food' */}
              <MaterialCommunityIcons name="food" size={16} color="#795548" />
              <Text style={[styles.tasteText, { color: '#795548' }]}>เนื้อเนียน นุ่มละมุน หอมเนย</Text>
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
            {/* ใช้ไอคอน 'pot-steam' */}
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
            <Text style={styles.tipText}>ใช้มันฝรั่งชนิดเนื้อร่วน (Starchy Potato) เช่น Russet จะบดได้เนียนกว่าชนิดเนื้อแน่น (Waxy)</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>อย่าใช้เครื่องปั่น (Blender) บดมันฝรั่ง เพราะจะทำให้เนื้อมันเหนียวเหมือนกาว</Text>
          </View>
           <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ค่อยๆ เติมนมทีละน้อย จนได้ความข้นเนียนตามที่ต้องการ</Text>
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

export default MashedPotatoes;