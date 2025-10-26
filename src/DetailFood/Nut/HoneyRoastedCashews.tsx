import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type NutScreenNav = NativeStackNavigationProp<RootStackParamList, 'NutScreen'>;

const HoneyRoastedCashews = () => {
  const navigation = useNavigation<NutScreenNav>();

  const mainIngredients = [
    { name: 'เม็ดมะม่วงหิมพานต์ (ดิบ)', amount: '1 ถ้วย' },
    { name: 'น้ำผึ้ง', amount: '1-2 ช้อนโต๊ะ' },
    { name: 'น้ำมันมะพร้าว หรือ เนยละลาย', amount: '1 ช้อนชา' },
    { name: 'เกลือ', amount: 'เล็กน้อย (ปลายหยิบมือ)' },
    { name: 'ผงซินนามอน (ถ้าชอบ)', amount: '1/4 ช้อนชา' },
  ];

  const steps = [
    {
      number: 1,
      text: 'วอร์มเตาอบที่ 150-160 องศาเซลเซียส เตรียมถาดอบปูกระดาษไข'
    },
    {
      number: 2,
      text: 'ในชามผสม ผสมน้ำผึ้ง, น้ำมันมะพร้าว/เนยละลาย, เกลือ, และผงซินนามอน (ถ้าใช้) คนให้เข้ากัน'
    },
    {
      number: 3,
      text: 'ใส่เม็ดมะม่วงหิมพานต์ดิบลงไป คลุกเคล้าให้ส่วนผสมเคลือบทั่วเม็ดถั่ว'
    },
    {
      number: 4,
      text: 'เทเม็ดมะม่วงลงบนถาดอบ เกลี่ยให้กระจายตัวเป็นชั้นเดียว ไม่ซ้อนทับกัน'
    },
    {
      number: 5,
      text: 'นำเข้าเตาอบ ประมาณ 10-15 นาที หรือจนถั่วเป็นสีเหลืองทองสวย และน้ำผึ้งเริ่มแห้งเคลือบ',
      tip: 'เคล็ดลับ: คอยสังเกตและคนถั่วเป็นระยะ (ทุก 5 นาที) เพื่อให้สุกทั่วถึงและป้องกันไหม้'
    },
    {
      number: 6,
      text: 'นำออกจากเตา พักบนถาดให้เย็นสนิท (ถั่วจะกรอบขึ้นเมื่อเย็นตัวลง)'
    },
     {
      number: 7,
      text: 'เมื่อเย็นสนิทแล้ว เก็บใส่ภาชนะปิดสนิท'
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
              uri: 'https://www.lemon8-app.com/seo/image?item_id=7194061378695545345&index=0&sign=5b42d277345823c7637741cea5c38cbc', // รูปถั่วอบ
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>เม็ดมะม่วงหิมพานต์อบน้ำผึ้ง</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9E6' }]}>
               {/* ใช้ไอคอน 'peanut' แทนเม็ดมะม่วง */}
              <MaterialCommunityIcons name="peanut" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>หวานเค็ม กรอบมัน เคี้ยวเพลิน</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม</Text>
            <Text style={styles.timeValue}>5 นาที</Text>
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
            <Text style={styles.timeValue}>~1 ถ้วย</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="peanut" size={24} color="#795548" />
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

        {/* Tips Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ใช้อุณหภูมิต่ำในการอบ จะช่วยให้ถั่วสุกกรอบทั่วถึง และน้ำผึ้งไม่ไหม้เร็วเกินไป</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ต้องพักให้เย็นสนิทจริงๆ ถั่วถึงจะกรอบ อย่าเพิ่งเก็บใส่ขวดตอนยังอุ่น</Text>
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

export default HoneyRoastedCashews;