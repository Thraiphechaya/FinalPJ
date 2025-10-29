import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type LemonScreenNav = NativeStackNavigationProp<RootStackParamList, 'Lemonade'>; 

const LemonTart = () => { 
  const navigation = useNavigation<LemonScreenNav>();

  const crustIngredients = [
    { name: 'แป้งสาลีอเนกประสงค์', amount: '1+1/4 ถ้วย' },
    { name: 'เนยจืด (เย็นจัด หั่นเต๋า)', amount: '1/2 ถ้วย' },
    { name: 'น้ำตาลไอซิ่ง', amount: '2 ช้อนโต๊ะ' },
    { name: 'น้ำเย็นจัด', amount: '3-4 ช้อนโต๊ะ' },
    { name: 'เกลือ', amount: '1/4 ช้อนชา' },
  ];

  const fillingIngredients = [
    { name: 'ไข่ไก่ (ทั้งฟอง)', amount: '2 ฟอง' },
    { name: 'ไข่แดง', amount: '2 ฟอง' },
    { name: 'น้ำตาลทราย', amount: '3/4 ถ้วย' },
    { name: 'น้ำเลมอนคั้นสด', amount: '1/2 ถ้วย' },
    { name: 'ผิวเลมอนขูด', amount: '1 ช้อนโต๊ะ' },
    { name: 'เนยจืดละลาย', amount: '1/4 ถ้วย' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ทำแป้งทาร์ต: ผสมแป้ง, น้ำตาลไอซิ่ง, เกลือ ในโถผสม ใช้ที่สับแป้งหรือปลายนิ้วบี้เนยเย็นจัดกับแป้งจนเป็นเม็ดร่วน'
    },
    { 
      number: 2, 
      text: 'ค่อยๆ พรมน้ำเย็นจัด ตะล่อมให้แป้งจับตัวเป็นก้อน ห่อพลาสติกแรป แช่เย็น 30 นาที'
    },
     { 
      number: 3, 
      text: 'วอร์มเตาอบที่ 180 องศาเซลเซียส'
    },
    { 
      number: 4, 
      text: 'นำแป้งออกมารีด กรุลงในพิมพ์ทาร์ตขนาด 9 นิ้ว ใช้ส้อมจิ้มก้นพิมพ์ ปูกระดาษไข ใส่ถั่วทับ (Blind Bake)'
    },
     { 
      number: 5, 
      text: 'อบแป้งทาร์ตประมาณ 15 นาที นำกระดาษไขและถั่วออก อบต่ออีก 5-7 นาทีจนขอบเริ่มเหลือง พักไว้'
    },
    { 
      number: 6, 
      text: 'ทำไส้เลมอนเคิร์ด: ในชามผสม ตีไข่ไก่ ไข่แดง และน้ำตาลทรายให้เข้ากัน'
    },
    { 
      number: 7, 
      text: 'ใส่น้ำเลมอน ผิวเลมอนขูด และเนยละลาย คนให้เข้ากัน'
    },
    { 
      number: 8, 
      text: 'เทส่วนผสมไส้ลงในแป้งทาร์ตที่อบเตรียมไว้'
    },
    { 
      number: 9, 
      text: 'นำเข้าเตาอบ ลดไฟเหลือ 170 องศา อบประมาณ 20-25 นาที หรือจนไส้เซ็ตตัว (ขอบสุก กลางๆ ยังหยุ่นๆ เล็กน้อย)'
    },
    { 
      number: 10, 
      text: 'นำออกจากเตา พักให้เย็นสนิทในพิมพ์ ก่อนนำไปแช่ตู้เย็นอย่างน้อย 2-3 ชั่วโมง'
    },
    { 
      number: 11, 
      text: 'ตัดเสิร์ฟเย็นๆ อาจตกแต่งด้วยวิปครีม หรือผลไม้สด'
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
              uri: 'https://api2.krua.co/wp-content/uploads/2020/06/SEOForm_RB0115_1200x630.jpg', 
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>เลมอนทาร์ต</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFFDE7' }]}>
              {/* ใช้ไอคอน 'chart-pie' */}
              <MaterialCommunityIcons name="chart-pie" size={16} color="#FBC02D" />
              <Text style={[styles.tasteText, { color: '#FBC02D' }]}>เปรี้ยวจี๊ดจ๊าด หอมเนย</Text>
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
            <Text style={styles.timeValue}>45 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 ชิ้น (9 นิ้ว)</Text>
          </View>
        </View>

        {/* Crust Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="layers-outline" size={24} color="#795548" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมแป้งทาร์ต</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {crustIngredients.map((item, index) => (
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

        {/* Filling Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {/* ใช้ไอคอน 'egg-easter' */}
            <MaterialCommunityIcons name="egg-easter" size={24} color="#FBC02D" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมไส้เลมอนเคิร์ด</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {fillingIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FBC02D' }]} />
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
            <Text style={styles.tipText}>การ Blind Bake แป้งทาร์ตก่อน จะช่วยให้ก้นทาร์ตกรอบ ไม่แฉะเมื่อใส่ไส้</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>อย่าอบไส้นานเกินไป เมื่อนำออกจากเตา ไส้จะยังเซ็ตตัวต่ออีกเล็กน้อย</Text>
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

export default LemonTart;