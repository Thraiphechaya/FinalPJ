import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type PumpkinScreenNav = NativeStackNavigationProp<RootStackParamList, 'PumpkinCustard'>;

const PumpkinCustard = () => {
  const navigation = useNavigation<PumpkinScreenNav>();

  const mainIngredients = [
    { name: 'ฟักทองลูกเล็ก (น้ำหนักประมาณ 1 kg)', amount: '1 ลูก' },
    { name: 'ไข่เป็ด (หรือไข่ไก่)', amount: '4 ฟอง' },
    { name: 'หัวกะทิ', amount: '1 ถ้วย' },
    { name: 'น้ำตาลปี๊บ', amount: '3/4 - 1 ถ้วย (ปรับหวาน)' },
    { name: 'เกลือ', amount: '1/2 ช้อนชา' },
    { name: 'ใบเตย (ขยำ)', amount: '2-3 ใบ' },
  ];

  const steps = [
    {
      number: 1,
      text: 'เตรียมฟักทอง: ล้างฟักทองให้สะอาด ใช้มีดปลายแหลมคว้านด้านบนออกเป็นฝา ควักไส้และเมล็ดออกให้หมด ล้างข้างในให้สะอาด'
    },
    {
      number: 2,
      text: 'เตรียมสังขยา: ตอกไข่ใส่ชาม ใส่น้ำตาลปี๊บ เกลือ และใบเตย ใช้มือขยำส่วนผสมให้เข้ากันดี จนน้ำตาลละลายและไข่ไม่เป็นลิ่ม',
       tip: 'เคล็ดลับ: การขยำด้วยมือกับใบเตย จะช่วยดับกลิ่นคาวไข่ และทำให้ส่วนผสมเข้ากันดี'
    },
    {
      number: 3,
      text: 'ค่อยๆ ใส่หัวกะทิลงไป คนผสมให้เข้ากัน'
    },
    {
      number: 4,
      text: 'นำส่วนผสมสังขยาไปกรองผ่านผ้าขาวบาง หรือกระชอนตาถี่ๆ 1-2 ครั้ง เพื่อให้เนื้อเนียน'
    },
    {
      number: 5,
      text: 'เทสังขยาที่กรองแล้ว ใส่ลงในลูกฟักทองที่คว้านไว้ (ประมาณ 3/4 ของลูก)'
    },
    {
      number: 6,
      text: 'ปิดฝาฟักทอง (ถ้ามี) หรือใช้ฟอยล์ปิดปากฟักทอง'
    },
     {
      number: 7,
      text: 'เตรียมลังถึง ต้มน้ำให้เดือด ใช้ไฟกลาง'
    },
     {
      number: 8,
      text: 'นำฟักทองไปนึ่ง ประมาณ 30-45 นาที หรือจนสังขยาสุกเซ็ตตัว และเนื้อฟักทองสุกนิ่ม (เช็คโดยใช้ไม้จิ้ม)'
    },
    {
      number: 9,
      text: 'ยกลงจากเตา พักให้เย็นสนิท ก่อนนำไปแช่ตู้เย็น'
    },
    {
      number: 10,
      text: 'เวลาเสิร์ฟ ให้ผ่าฟักทองเป็นชิ้นๆ เหมือนเค้ก'
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
              uri: 'https://s359.kapook.com/pagebuilder/7bcb254b-9626-4ca3-a204-50824a5184a3.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>สังขยาฟักทอง</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#FFF9E6' }]}>
               {/* ใช้ไอคอน 'pumpkin' */}
              <MaterialCommunityIcons name="pumpkin" size={16} color="#E65100" />
              <Text style={[styles.tasteText, { color: '#E65100' }]}>หวานมัน หอมกะทิ เนื้อเนียน</Text>
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
            <Text style={styles.timeValue}>45 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>4-6 ที่</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="pumpkin" size={24} color="#E65100" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#E65100' }]} />
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
            <Text style={styles.tipText}>ใช้ไข่เป็ดจะทำให้สังขยาสีสวยและเข้มข้นกว่าไข่ไก่</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>การกรองสังขยาจะช่วยให้เนื้อเนียน ไม่มีเศษไข่ขาวหรือลิ่มไข่</Text>
          </View>
           <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>ต้องพักให้เย็นสนิทก่อนแช่เย็นและตัดเสิร์ฟ ไม่งั้นสังขยาอาจจะยังไม่เซ็ตตัวดี</Text>
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

export default PumpkinCustard;