import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';

type StrawberryScreenNav = NativeStackNavigationProp<RootStackParamList, 'StrawberryScreen'>;

const StrawberryIceCream = () => {
  const navigation = useNavigation<StrawberryScreenNav>();

  const ingredients = [
    { name: 'วิปปิ้งครีม', amount: '100 กรัม' },
    { name: 'สตรอเบอร์รี่แช่แข็ง', amount: '100 กรัม' },
    { name: 'น้ำตาลทราย', amount: '50 กรัม' },
    { name: 'น้ำมะนาว', amount: '1/2 ช้อนชา' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'วิธีทำง่ายมากๆเลย',
      subSteps: [
        'นำสตรอเบอร์รี่แช่แข็งและน้ำตาลทรายลงไปละลายด้วยกันใช้ไฟปานกลางค่อนไปทางอ่อน ช่วงแรกอย่างเพิ่งคนนะคะเดี๋ยวน้ำตาลจะเป็นก้อน',
        'เมื่อสตรอเบอร์รี่ละลายได้ที่ (แค่พอนิ่มๆ) ใส่น้ำมะนาวลงไป ชิมรสให้ออกหวานตามด้วยเปรี้ยวนิดๆ พักไว้'
      ]
    },
    { 
      number: 2, 
      text: 'ตีวิปปิ้งครีมให้ได้ยอดแข็งพอประมาณ',
      tip: 'เทคนิคการตีคือ นำอ่างผสมและตะกร้อไปแช่ฟรีซให้เย็นจัด เวลาตีให้รองด้วยน้ำแข็งหรือคูลแพ็ค จะตีขึ้นง่ายค่ะ'
    },
    { 
      number: 3, 
      text: 'นำสตรอเบอร์รี่ที่พักไว้มาผสมกับวิปปิ้งครีมที่ตีจนตั้งยอด เมื่อผสมเข้ากันแล้วใส่กล่องแล้วแช่ฟรีซนานประมาณ 6 ชั่วโมง หรือแช่ทิ้งไว้ 1 คืน'
    },
    { 
      number: 4, 
      text: 'เมื่อแช่เย็นจนได้ที่แล้วจะได้ไอศครีมสตรอเบอร์รี่โฮมเมด'
    },
    { 
      number: 5, 
      text: 'พร้อมเสิร์ฟ'
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
              uri: 'https://img.wongnai.com/p/1968x0/2019/04/18/cdcf14bfcc764d608ad6f5bdfef5274a.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ไอศครีมสตรอเบอร์รี่โฮมเมด</Text>
            <View style={styles.tasteTag}>
              <MaterialCommunityIcons name="ice-cream" size={16} color="#FF6B6B" />
              <Text style={styles.tasteText}>หวานหอมเย็นชื่นใจ ทำง่ายได้ที่บ้าน</Text>
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
            <Text style={styles.timeLabel}>เวลาปรุงอาหาร</Text>
            <Text style={styles.timeValue}>20 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="snowflake" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>เวลาแช่แข็ง</Text>
            <Text style={styles.timeValue}>6 ชม.</Text>
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-apple" size={24} color="#FF6B6B" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
              <Text style={styles.sectionSubtitle}>สำหรับไอศครีมโฮมเมด</Text>
            </View>
          </View>
          
          <View style={styles.ingredientsList}>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FF6B6B' }]} />
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
            <MaterialCommunityIcons name="chef-hat" size={24} color="#FF9800" />
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
                  
                  {step.subSteps && step.subSteps.map((subStep, subIndex) => (
                    <View key={subIndex} style={styles.subStepItem}>
                      <View style={styles.subStepDot} />
                      <Text style={styles.subStepText}>{subStep}</Text>
                    </View>
                  ))}
                  
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
            <MaterialCommunityIcons name="chef-hat" size={24} color="#9C27B0" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="snowflake" size={16} color="#2196F3" />
            <Text style={styles.tipText}>แช่อุปกรณ์ให้เย็นก่อนตีวิปปิ้งครีม จะตีขึ้นง่ายกว่า</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="fire-off" size={16} color="#FF6B6B" />
            <Text style={styles.tipText}>อย่าคนสตรอเบอร์รี่ตอนเริ่มต้น เดี๋ยวน้ำตาลเป็นก้อน</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="clock" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>แช่แข็งอย่างน้อย 6 ชั่วโมง หรือทั้งคืนจะได้เนื้อที่ดีที่สุด</Text>
          </View>
        </View>

        {/* Serving Suggestion */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food" size={24} color="#4CAF50" />
            <Text style={styles.sectionTitle}>คำแนะนำในการเสิร์ฟ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>ตกแต่งด้วยสตรอเบอร์รี่สดหรือช็อคโกแลตชิป</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>เสิร์ฟคู่กับวิปปิ้งครีมเพิ่มเติม</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>สามารถปรับความหวานได้ตามชอบ</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4E4A0',
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
    backgroundColor: '#FF6B6B',
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
    marginBottom: 8,
    fontWeight: '600',
  },
  subStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    marginLeft: 8,
  },
  subStepDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginRight: 8,
    marginTop: 8,
  },
  subStepText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    flex: 1,
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

export default StrawberryIceCream;