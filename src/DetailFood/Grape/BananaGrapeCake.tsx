import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type GrapeScreenNav = NativeStackNavigationProp<RootStackParamList, 'GrapeScreen'>; 

const BananaGrapeCake = () => { 
  const navigation = useNavigation<GrapeScreenNav>();

  const wetIngredients = [
    { name: 'กล้วยหอมสุก (บดละเอียด)', amount: '2 ลูก' },
    { name: 'ไข่ไก่ (เบอร์ 2)', amount: '2 ฟอง' },
    { name: 'น้ำตาลทราย', amount: '1/2 ถ้วย (ปรับลดได้)' },
    { name: 'เนยละลาย (หรือน้ำมันพืช)', amount: '1/2 ถ้วย' },
    { name: 'นมสด', amount: '2 ช้อนโต๊ะ' },
    { name: 'น้ำมะนาว', amount: '1 ช้อนชา (ใส่ในกล้วยกันดำ)' },
    { name: 'กลิ่นวานิลลา', amount: '1 ช้อนชา' },
  ];
  
  const dryIngredients = [
    { name: 'แป้งเค้ก (หรือแป้งอเนกฯ)', amount: '1+1/2 ถ้วย' },
    { name: 'ผงฟู', amount: '1 ช้อนชา' },
    { name: 'เบกกิ้งโซดา', amount: '1 ช้อนชา' },
    { name: 'เกลือป่น', amount: '1/2 ช้อนชา' },
    { name: 'ลูกเกด (องุ่นอบแห้ง)', amount: '1/2 ถ้วย' },
    { name: 'แป้งสาลี (สำหรับคลุกลูกเกด)', amount: '1 ช้อนโต๊ะ' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'วอร์มเตาอบที่ 175 องศาเซลเซียส เตรียมพิมพ์ (ทาเนย, ปูกระดาษไข หรือใส่ถ้วยคัพเค้ก)'
    },
    { 
      number: 2, 
      text: 'บดกล้วยหอมให้ละเอียด เติมน้ำมะนาวลงไป คนให้เข้ากัน พักไว้'
    },
    { 
      number: 3, 
      text: 'ร่อนของแห้ง: แป้งเค้ก, ผงฟู, เบกกิ้งโซดา, เกลือ เข้าด้วยกัน 1-2 รอบ'
    },
    { 
      number: 4, 
      text: 'นำลูกเกดไปคลุกกับแป้งสาลี 1 ช้อนโต๊ะ (ที่แบ่งมา) ให้ทั่ว พักไว้',
      tip: 'เคล็ดลับ: การคลุกลูกเกดกับแป้งก่อน จะช่วยให้ลูกเกดไม่จมไปกองที่ก้นพิมพ์'
    },
    { 
      number: 5, 
      text: 'ในอ่างผสม ตีไข่ไก่กับน้ำตาลทรายให้ขึ้นฟูเล็กน้อย'
    },
    { 
      number: 6, 
      text: 'ใส่เนยละลาย (หรือน้ำมัน), นมสด, และกลิ่นวานิลลา ตีผสมให้เข้ากัน'
    },
    { 
      number: 7, 
      text: 'ใส่กล้วยหอมบดลงไป ตะล่อมให้เข้ากัน'
    },
    { 
      number: 8, 
      text: 'ค่อยๆ ทยอยใส่ส่วนผสมของแห้ง (ที่ร่อนไว้) ลงไป ตะล่อมเบาๆ พอให้เข้ากัน (อย่าคนนาน)'
    },
    { 
      number: 9, 
      text: 'ใส่ลูกเกดที่คลุกแป้งไว้ (แบ่งส่วนหนึ่งไว้โรยหน้า) ตะล่อมให้เข้ากัน'
    },
    { 
      number: 10, 
      text: 'เทใส่พิมพ์ โรยหน้าด้วยลูกเกดที่เหลือ นำเข้าเตาอบ 20-25 นาที (สำหรับคัพเค้ก) หรือ 40-50 นาที (สำหรับพิมพ์ปอนด์) จนสุก'
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
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4xYtbKoAkeGyUHu2VbCJZuvWX4m2Ht_EijQ&s',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>เค้กกล้วยหอมใส่องุ่น (ลูกเกด)</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF3E0' }]}>
              {/* ไอคอนกล้วย */}
              <MaterialCommunityIcons 
                name="cake"  // <-- 🔴 จุดแก้ไขที่ 1: เพิ่ม as any
                size={16} 
                color="#E65100" 
              />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>หอมกล้วย หวานฉ่ำลูกเกด</Text>
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
            <Text style={styles.timeLabel}>เวลาอบ</Text>
            <Text style={styles.timeValue}>25 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>~12 ถ้วย</Text>
          </View>
        </View>

        {/* Wet Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="water" size={24} color="#2196F3" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมของเหลว (กล้วย/ไข่)</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {wetIngredients.map((item, index) => (
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
        
        {/* Dry Ingredients Section */}
        <View style={styles.sectionCard}>
          {/* 🔴 จุดแก้ไขที่ 2: ย้ายไอคอนเข้ามาใน sectionHeader และเพิ่ม as any */}
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons 
              name={"wheat" as any} 
              size={24} 
              color="#795548" 
            /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมของแห้ง (แป้ง/ลูกเกด)</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {dryIngredients.map((item, index) => (
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
                      <MaterialCommunityIcons name="lightbulb-on" size={16} color="#FF9800" />
                      <Text style={styles.tipText}>{step.tip}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// (Styles ทั้งหมดอยู่ด้านล่าง)
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

export default BananaGrapeCake;