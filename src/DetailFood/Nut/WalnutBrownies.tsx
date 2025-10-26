import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type NutScreenNav = NativeStackNavigationProp<RootStackParamList, 'NutScreen'>;

const WalnutBrownies = () => {
  const navigation = useNavigation<NutScreenNav>();

  const mainIngredients = [
    { name: 'ดาร์กช็อกโกแลต (หั่น)', amount: '100 กรัม' },
    { name: 'เนยจืด', amount: '1/2 ถ้วย (113 กรัม)' },
    { name: 'น้ำตาลทราย', amount: '1 ถ้วย' },
    { name: 'ไข่ไก่', amount: '2 ฟอง' },
    { name: 'กลิ่นวานิลลา', amount: '1 ช้อนชา' },
    { name: 'แป้งสาลีอเนกประสงค์', amount: '1/2 ถ้วย' },
    { name: 'ผงโกโก้', amount: '1/4 ถ้วย' },
    { name: 'เกลือ', amount: '1/4 ช้อนชา' },
    { name: 'วอลนัท (สับหยาบ)', amount: '1/2 ถ้วย (อบก่อนเล็กน้อยจะหอมขึ้น)' },
  ];

  const steps = [
    {
      number: 1,
      text: 'วอร์มเตาอบที่ 175 องศาเซลเซียส เตรียมถาดอบสี่เหลี่ยม (8x8 นิ้ว) ปูกระดาษไข'
    },
    {
      number: 2,
      text: 'ละลายดาร์กช็อกโกแลตกับเนยจืด โดยใช้ไมโครเวฟ (ทีละ 30 วินาที คน) หรือตุ๋นบนหม้อน้ำร้อน คนให้เข้ากัน พักไว้'
    },
    {
      number: 3,
      text: 'ในชามผสม ตีไข่ไก่กับน้ำตาลทรายให้เข้ากัน (ไม่ต้องตีฟู)'
    },
    {
      number: 4,
      text: 'ใส่กลิ่นวานิลลา และส่วนผสมช็อกโกแลตที่ละลายไว้ (ต้องไม่ร้อนจัด) ลงไป ตะล่อมให้เข้ากัน'
    },
    {
      number: 5,
      text: 'ร่อนแป้ง, ผงโกโก้, เกลือ ใส่ลงไป'
    },
    {
      number: 6,
      text: 'ใช้พายยางตะล่อมส่วนผสมให้เข้ากันพอดี (อย่าคนนานเกินไป)'
    },
     {
      number: 7,
      text: 'ใส่วอลนัทสับลงไป ตะล่อมเบาๆ ให้กระจายตัว'
    },
     {
      number: 8,
      text: 'เทส่วนผสมลงในถาดอบที่เตรียมไว้ เกลี่ยหน้าให้เรียบ'
    },
    {
      number: 9,
      text: 'นำเข้าเตาอบ ประมาณ 25-30 นาที หรือจนขอบเริ่มร่อน ตรงกลางยังดูฉ่ำเล็กน้อย (เช็คสุกโดยใช้ไม้จิ้ม ควรมีเศษขนมติดเล็กน้อย ไม่แฉะ)'
    },
    {
      number: 10,
      text: 'นำออกจากเตา พักให้เย็นสนิทบนตะแกรง ก่อนตัดเป็นชิ้น'
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
              uri: 'https://recipe.sgethai.com/wp-content/uploads/2025/04/cover-chocolate-brownies.webp', // รูปบราวนี่
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>บราวนี่วอลนัท</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#D7CCC8' }]}>
               {/* ใช้ไอคอน 'cake-variant' */}
              <MaterialCommunityIcons name="cake-variant" size={16} color="#3E2723" />
              <Text style={[styles.tasteText, { color: '#3E2723' }]}>เข้มข้นช็อกโกแลต หนึบหนับวอลนัท</Text>
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
            <Text style={styles.timeValue}>30 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>9 ชิ้น</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food" size={24} color="#5D4037" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#5D4037' }]} />
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
            <Text style={styles.tipText}>การตะล่อมแป้งแค่พอเข้ากัน (Undermix) จะช่วยให้บราวนี่เนื้อฉ่ำ (Fudgy) ไม่แห้งเป็นเนื้อเค้ก</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>อย่าอบนานเกินไป บราวนี่ที่อร่อยตรงกลางควรจะยังฉ่ำๆ อยู่เล็กน้อย</Text>
          </View>
           <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>พักบราวนี่ให้เย็นสนิทก่อนตัด จะช่วยให้ตัดเป็นชิ้นสวยงาม ไม่เละ</Text>
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

export default WalnutBrownies;