import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type BitterGourdScreenNav = NativeStackNavigationProp<RootStackParamList, 'BraisedBitterGourdPorkRibs'>;

const StuffedBitterGourdSoup = () => {
  const navigation = useNavigation<BitterGourdScreenNav>();

  const stuffingIngredients = [
    { name: 'หมูสับ', amount: '200 กรัม' },
    { name: 'วุ้นเส้น (แช่น้ำ ตัดสั้น)', amount: '50 กรัม' },
    { name: 'สามเกลอ (รากผักชี,กระเทียม,พริกไทย โขลก)', amount: '1 ช้อนโต๊ะ' },
    { name: 'ซีอิ๊วขาว', amount: '1.5 ช้อนโต๊ะ' },
    { name: 'น้ำตาลทราย', amount: '1/2 ช้อนชา' },
  ];

  const soupIngredients = [
    { name: 'มะระจีน', amount: '1 ลูก' },
    { name: 'เห็ดหอมแห้ง (แช่น้ำ)', amount: '3-4 ดอก' },
    { name: 'น้ำซุปกระดูกหมู หรือ น้ำเปล่า', amount: '4-5 ถ้วย' },
    { name: 'เกลือ', amount: 'สำหรับล้างมะระ และ ปรุงรส' },
    { name: 'ซีอิ๊วขาว (ปรุงรสซุป)', amount: '1-2 ช้อนโต๊ะ' },
    { name: 'พริกไทยป่น', amount: 'เล็กน้อย' },
    { name: 'ต้นหอม, ผักชี (สำหรับโรย)', amount: 'เล็กน้อย' },
    { name: 'กระเทียมเจียว', amount: 'เล็กน้อย' },
  ];

  const steps = [
    {
      number: 1,
      text: 'เตรียมมะระ: หั่นมะระเป็นท่อนหนาประมาณ 1.5 นิ้ว คว้านไส้และเมล็ดออกให้หมด คลุกเกลือทิ้งไว้ 15-20 นาที แล้วล้างออกด้วยน้ำสะอาด บีบเบาๆ',
      tip: 'เคล็ดลับ: การคลุกเกลือแล้วล้างออก ช่วยลดความขมของมะระได้'
    },
    {
      number: 2,
      text: 'เตรียมไส้: ผสมหมูสับ, วุ้นเส้น, สามเกลอ, ซีอิ๊วขาว, น้ำตาล นวดให้เข้ากันจนเหนียว'
    },
    {
      number: 3,
      text: 'นำไส้หมูที่เตรียมไว้ ยัดใส่ในท่อนมะระให้แน่นพอดี'
    },
    {
      number: 4,
      text: 'ต้มน้ำซุปในหม้อ ใส่เห็ดหอม รอให้เดือด'
    },
    {
      number: 5,
      text: 'ค่อยๆ ใส่มะระยัดไส้ลงไป (ถ้าน้ำซุปไม่ท่วม ให้เติมน้ำเปล่า)'
    },
    {
      number: 6,
      text: 'พอเดือดอีกครั้ง ลดไฟลงอ่อนๆ เคี่ยวต่อไปประมาณ 45-60 นาที หรือจนมะระสุกนิ่มเปื่อย',
      tip: 'เคล็ดลับ: เคี่ยวด้วยไฟอ่อนๆ จะทำให้น้ำซุปใส และมะระเปื่อยนุ่ม'
    },
     {
      number: 7,
      text: 'ปรุงรสด้วยซีอิ๊วขาว และเกลือเล็กน้อย ชิมรสตามชอบ (ระวังเค็มจากไส้หมู)'
    },
     {
      number: 8,
      text: 'ตักใส่ชาม โรยหน้าด้วยต้นหอม ผักชี พริกไทยป่น และกระเทียมเจียว'
    },
    {
      number: 9,
      text: 'เสิร์ฟร้อนๆ'
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
              uri: 'https://i.ytimg.com/vi/Xq0JsgKHJOI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCWvOjMFOA8lHK_yjMUqaGDlO9Wvg', 
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>แกงจืดมะระยัดไส้</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#E8F5E9' }]}>
              {/* ใช้ไอคอน 'bowl-mix' */}
              <MaterialCommunityIcons name="bowl-mix" size={16} color="#4CAF50" />
              <Text style={[styles.tasteText, { color: '#4CAF50' }]}>ซุปใส กลมกล่อม ไม่ขมปี๋</Text>
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
            <Text style={styles.timeValue}>~60 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>3-4 ที่</Text>
          </View>
        </View>

        {/* Stuffing Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
             {/* ใช้ไอคอน 'pig' */}
            <MaterialCommunityIcons name="pig" size={24} color="#E91E63" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมไส้</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {stuffingIngredients.map((item, index) => (
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
            <MaterialCommunityIcons name="food-variant" size={24} color="#388E3C" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมซุป</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {soupIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#4CAF50' }]} />
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
            <Text style={styles.tipText}>นอกจากการคลุกเกลือ บางคนอาจนำมะระไปต้มในน้ำเกลือก่อน เพื่อช่วยลดความขมได้อีกขั้น</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ยิ่งเคี่ยวนาน มะระจะยิ่งเปื่อยนุ่ม และความขมจะยิ่งลดลง</Text>
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

export default StuffedBitterGourdSoup;