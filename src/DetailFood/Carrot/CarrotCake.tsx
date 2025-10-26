import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type CarrotScreenNav = NativeStackNavigationProp<RootStackParamList, 'CarrotScreen'>; 

const CarrotCake = () => { 
  const navigation = useNavigation<CarrotScreenNav>();

  const cakeIngredients = [
    { name: 'แป้งสาลีอเนกประสงค์', amount: '1+1/2 ถ้วย' },
    { name: 'ผงฟู', amount: '1 ช้อนชา' },
    { name: 'เบกกิ้งโซดา', amount: '1 ช้อนชา' },
    { name: 'ผงซินนามอน (อบเชย)', amount: '1 ช้อนชา' },
    { name: 'เกลือ', amount: '1/2 ช้อนชา' },
    { name: 'น้ำตาลทราย (หรือน้ำตาลทรายแดง)', amount: '1 ถ้วย' },
    { name: 'น้ำมันพืช', amount: '3/4 ถ้วย' },
    { name: 'ไข่ไก่', amount: '2 ฟอง' },
    { name: 'แครอทขูดฝอย', amount: '1+1/2 ถ้วย' },
    { name: 'ถั่ววอลนัท หรือ พีแคน (สับหยาบ)', amount: '1/2 ถ้วย (ไม่ใส่ก็ได้)' },
    { name: 'ลูกเกด (ถ้าชอบ)', amount: '1/4 ถ้วย' },
  ];

  const frostingIngredients = [
    { name: 'ครีมชีส (อุณหภูมิห้อง)', amount: '1 ก้อน (ประมาณ 225g)' },
    { name: 'เนยจืด (อุณหภูมิห้อง)', amount: '1/4 ถ้วย' },
    { name: 'น้ำตาลไอซิ่ง (ร่อน)', amount: '1-2 ถ้วย (ปรับหวาน)' },
    { name: 'กลิ่นวานิลลา', amount: '1 ช้อนชา' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'วอร์มเตาอบที่ 175 องศาเซลเซียส เตรียมพิมพ์เค้ก (ทาเนย, ปูกระดาษไข)'
    },
    { 
      number: 2, 
      text: 'ร่อนของแห้ง: แป้ง, ผงฟู, เบกกิ้งโซดา, ผงซินนามอน, เกลือ เข้าด้วยกันในชามผสม พักไว้'
    },
    { 
      number: 3, 
      text: 'ในชามอีกใบ ตีน้ำตาล กับน้ำมันพืช ให้เข้ากัน'
    },
    { 
      number: 4, 
      text: 'ใส่ไข่ไก่ลงไปทีละฟอง ตีให้เข้ากัน'
    },
    { 
      number: 5, 
      text: 'ค่อยๆ ใส่ส่วนผสมของแห้งลงไป สลับกับการใส่น้ำมัน (ถ้าส่วนผสมข้นไป) ตะล่อมพอเข้ากัน'
    },
    { 
      number: 6, 
      text: 'ใส่แครอทขูด, ถั่ว และลูกเกด (ถ้าใช้) ลงไป ใช้พายยางตะล่อมให้เข้ากัน'
    },
    { 
      number: 7, 
      text: 'เทใส่พิมพ์ อบประมาณ 30-40 นาที หรือจนกว่าจะสุก (ใช้ไม้จิ้มแล้วไม่มีเนื้อเค้กติด)'
    },
    { 
      number: 8, 
      text: 'นำออกจากเตา พักเค้กในพิมพ์ 10 นาที ก่อนนำออกมาพักบนตะแกรงให้เย็นสนิท'
    },
    { 
      number: 9, 
      text: 'ทำครีมชีสฟรอสติ้ง: ตีครีมชีสกับเนยให้นุ่มฟู ค่อยๆ ใส่น้ำตาลไอซิ่งลงไป ตีให้เข้ากัน ตามด้วยกลิ่นวานิลลา'
    },
    { 
      number: 10, 
      text: 'ปาดฟรอสติ้งลงบนเค้กที่เย็นสนิทแล้ว ตกแต่งตามชอบ'
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
              uri: 'https://bakery-lover.com/wp-content/uploads/2022/06/%E0%B9%80%E0%B8%84%E0%B9%89%E0%B8%81%E0%B9%81%E0%B8%84%E0%B8%A3%E0%B8%AD%E0%B8%97.jpg', // Wongnai Image
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>เค้กแครอท</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF3E0' }]}>
              {/* ใช้ไอคอน 'cake-variant' */}
              <MaterialCommunityIcons name="cake-variant" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>เนื้อฉ่ำ หอมซินนามอน ครีมชีสเปรี้ยวหวาน</Text>
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
            <Text style={styles.timeLabel}>เวลาอบ</Text>
            <Text style={styles.timeValue}>35 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 ก้อน (2 ปอนด์)</Text>
          </View>
        </View>

        {/* Cake Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {/* ใช้ไอคอน 'muffin' */}
            <MaterialCommunityIcons name="muffin" size={24} color="#795548" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมเนื้อเค้ก</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {cakeIngredients.map((item, index) => (
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

        {/* Frosting Ingredients Section */}
         <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="cheese" size={24} color="#FFC107" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมครีมชีสฟรอสติ้ง</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {frostingIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FFC107' }]} />
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
                {/* แก้ไขส่วนนี้ ลบการเช็ค tip ออก */}
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
            <Text style={styles.tipText}>อย่าตีส่วนผสมแป้งนานเกินไปหลังจากใส่ของแห้งแล้ว จะทำให้เค้กเหนียว</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ต้องรอให้เค้กเย็นสนิทจริงๆ ก่อนปาดครีมชีส ไม่งั้นครีมจะละลาย</Text>
          </View>
           <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ขูดแครอทให้เป็นฝอยละเอียด จะช่วยให้เนื้อเค้กฉ่ำ ไม่รู้สึกถึงเนื้อแครอท</Text>
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

export default CarrotCake;