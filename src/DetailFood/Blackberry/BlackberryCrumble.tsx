import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type BlackberryScreenNav = NativeStackNavigationProp<RootStackParamList, 'BlackberryScreen'>; 

const BlackberryCrumble = () => { 
  const navigation = useNavigation<BlackberryScreenNav>();

  const fillingIngredients = [
    { name: 'แบล็กเบอร์รีสด หรือ แช่แข็ง', amount: '3-4 ถ้วย' },
    { name: 'น้ำตาลทราย', amount: '1/4 - 1/2 ถ้วย (ตามความหวานของผลไม้)' },
    { name: 'แป้งข้าวโพด', amount: '1-2 ช้อนโต๊ะ' },
    { name: 'น้ำมะนาว', amount: '1 ช้อนโต๊ะ' },
  ];
  
  const crumbleIngredients = [
    { name: 'แป้งสาลีอเนกประสงค์', amount: '1 ถ้วย' },
    { name: 'ข้าวโอ๊ต (Rolled Oats)', amount: '1/2 ถ้วย (ไม่ใส่ก็ได้)' },
    { name: 'น้ำตาลทรายแดง', amount: '1/2 ถ้วย' },
    { name: 'เนยจืด (เย็นจัด หั่นเต๋า)', amount: '1/2 ถ้วย' },
    { name: 'ผงซินนามอน (ถ้าชอบ)', amount: '1/2 ช้อนชา' },
    { name: 'เกลือ', amount: 'หยิบมือ' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'วอร์มเตาอบที่ 180-190 องศาเซลเซียส'
    },
    { 
      number: 2, 
      text: 'ทำไส้: ในชามผสม คลุกเคล้าแบล็กเบอร์รี, น้ำตาล, แป้งข้าวโพด, และน้ำมะนาว ให้เข้ากัน'
    },
    { 
      number: 3, 
      text: 'เทส่วนผสมไส้ลงในภาชนะสำหรับอบ (เช่น ถาดพาย หรือ ชามทนความร้อน)'
    },
    { 
      number: 4, 
      text: 'ทำครัมเบิล: ในชามอีกใบ ผสมแป้ง, ข้าวโอ๊ต(ถ้าใช้), น้ำตาลทรายแดง, ซินนามอน, เกลือ'
    },
    { 
      number: 5, 
      text: 'ใส่เนยเย็นจัดลงไป ใช้ปลายนิ้ว หรือที่สับแป้ง บี้เนยกับส่วนผสมแห้งจนมีลักษณะเป็นเม็ดร่วนๆ หยาบๆ',
      tip: 'เคล็ดลับ: อย่าบี้จนเนยละลายหมด ให้ยังเหลือเนยเป็นก้อนเล็กๆ จะทำให้ครัมเบิลกรอบ'
    },
    { 
      number: 6, 
      text: 'โรยส่วนผสมครัมเบิลให้ทั่วหน้าไส้แบล็กเบอร์รี'
    },
    { 
      number: 7, 
      text: 'นำเข้าเตาอบ ประมาณ 30-40 นาที หรือจนครัมเบิลด้านบนเป็นสีเหลืองทอง และไส้เดือดปุดๆ'
    },
    { 
      number: 8, 
      text: 'นำออกจากเตา พักให้เย็นลงเล็กน้อยก่อนเสิร์ฟ'
    },
    { 
      number: 9, 
      text: 'เสิร์ฟอุ่นๆ คู่กับไอศกรีมวานิลลา หรือวิปครีม'
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
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySo3jcX_RbX30ju2kXIviv1NbHuZ2bFUNKZLmwkMxiAQhunKlTPau85jYEjb8xlZbhoo&usqp=CAU', 
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>แบล็กเบอร์รีครัมเบิล</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#EDE7F6' }]}>
              {/* ใช้ไอคอน 'food' */}
              <MaterialCommunityIcons name="food" size={16} color="#512DA8" />
              <Text style={[styles.tasteText, { color: '#512DA8' }]}>เปรี้ยวหวาน ไส้ฉ่ำ ครัมเบิลกรอบ</Text>
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
            <Text style={styles.timeValue}>35 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>4-6 ที่</Text>
          </View>
        </View>

        {/* Filling Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
             {/* ใช้ไอคอน 'bowl-mix' */}
            <MaterialCommunityIcons name="bowl-mix" size={24} color="#673AB7" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมไส้</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {fillingIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#673AB7' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Crumble Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="chef-hat" size={24} color="#795548" /> 
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมครัมเบิล</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {crumbleIngredients.map((item, index) => (
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

        {/* Tips Section (อัปเดตไอคอนตามคำขอ) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ถ้าใช้แบล็กเบอร์รีแช่แข็ง ไม่ต้องละลายน้ำแข็งก่อน คลุกส่วนผสมแล้วอบได้เลย (อาจใช้เวลาอบนานขึ้นเล็กน้อย)</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>เสิร์ฟตอนอุ่นๆ คู่กับไอศกรีมวานิลลาคือที่สุด!</Text>
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

export default BlackberryCrumble;