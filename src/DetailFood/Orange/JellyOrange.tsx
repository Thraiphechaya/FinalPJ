import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type OrangeScreenNav = NativeStackNavigationProp<RootStackParamList, 'JellyOrange'>; 

// เปลี่ยนชื่อ Component ให้ตรงกับสูตร
const JellyOrange = () => { 
  const navigation = useNavigation<OrangeScreenNav>();

  // แบ่งส่วนผสมตามสูตร Wongnai (ส่วนส้ม และ ส่วนวุ้น)
  const mainIngredients = [
    { name: 'ส้ม (เช่น ส้มเอฮิเมะ หรือ ส้มแมนดาริน)', amount: '4-5 ลูก' },
  ];

  const jellyIngredients = [
    { name: 'ผงวุ้น', amount: '1 ช้อนโต๊ะ' },
    { name: 'น้ำสะอาด', amount: '250 ml (สำหรับแช่วุ้น)' },
    { name: 'นมเปรี้ยว (เช่น ยาคูลท์)', amount: '300-400 ml' },
    { name: 'น้ำตาลทราย', amount: '50 กรัม (ปรับตามชอบ)' },
  ];

  const steps = [
    { 
      number: 1, 
      text: 'ล้างส้ม ซับให้แห้ง แล้วปอกเปลือกส้ม (รวมถึงเยื่อสีขาว)',
      tip: 'เคล็ดลับ: นำส้มไปต้มในน้ำเดือดจัด 1.30 นาที แล้วแช่น้ำเย็นทันที จะช่วยให้ลอกเยื่อสีขาวออกได้ง่ายขึ้น'
    },
    { 
      number: 2, 
      text: 'จัดเรียงส้มที่ปอกแล้วลงในภาชนะหรือแม่พิมพ์ที่ต้องการ (อาจใช้ไม้เสียบช่วยยึด)'
    },
    { 
      number: 3, 
      text: 'แช่ผงวุ้นในน้ำสะอาด 250 ml พักไว้ประมาณ 10 นาที ให้ผงวุ้นอิ่มตัว'
    },
    { 
      number: 4, 
      text: 'นำหม้อวุ้นที่แช่ไว้ไปตั้งไฟกลาง เติมน้ำตาลทราย'
    },
    { 
      number: 5, 
      text: 'คนไปเรื่อยๆ จนผงวุ้นและน้ำตาลละลายจนหมด (น้ำจะเริ่มใสและข้นเล็กน้อย) ปิดไฟ'
    },
    { 
      number: 6, 
      text: 'ยกลงจากเตา ค่อยๆ เทนมเปรี้ยว (ที่อุณหภูมิห้อง) ลงในหม้อวุ้น คนให้เข้ากันอย่างรวดเร็ว'
    },
    { 
      number: 7, 
      text: 'เทส่วนผสมวุ้นนมเปรี้ยว ลงในแม่พิมพ์ที่มีส้มรออยู่ (เทตอนที่วุ้นยังอุ่นๆ)'
    },
    { 
      number: 8, 
      text: 'นำไปแช่ตู้เย็น 1-2 ชั่วโมง หรือจนกว่าวุ้นจะเซ็ตตัวดี'
    },
    { 
      number: 9, 
      text: 'เมื่อเซ็ตตัวแล้ว นำออกจากพิมพ์ ตัดเป็นชิ้นๆ พร้อมเสิร์ฟ'
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
              // รูปจากสูตร Wongnai
              uri: 'https://img.wongnai.com/p/1600x0/2024/12/09/1d99a3a263bb49edb234b902e7c45401.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>วุ้นส้มนมเปรี้ยว</Text>
            <View style={styles.tasteTag}>
              <MaterialCommunityIcons name="food-variant" size={16} color="#FF6B6B" />
              <Text style={styles.tasteText}>เปรี้ยวอมหวาน หอมนมเปรี้ยว</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม (ปอกส้ม)</Text>
            <Text style={styles.timeValue}>20 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF9800" />
            <Text style={styles.timeLabel}>เวลาทำ (ไม่รวมแช่)</Text>
            <Text style={styles.timeValue}>15 นาที</Text>
          </View>
          <View style={styles.timeSeparator} />
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#2196F3" />
            <Text style={styles.timeLabel}>สำหรับ</Text>
            <Text style={styles.timeValue}>1 พิมพ์</Text>
          </View>
        </View>

        {/* Main Ingredients Section (ส้ม) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={("fruit-citrus" as any)} size={24} color="#FF9800" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมส้ม</Text>
              <Text style={styles.sectionSubtitle}>ส่วนเนื้อผลไม้</Text>
            </View>
          </View>
          
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: '#FF9800' }]} />
                <View style={styles.ingredientText}>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                  <Text style={styles.ingredientAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Topping Ingredients Section (วุ้นนมเปรี้ยว) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {/* เปลี่ยนไอคอนและชื่อส่วน */}
            <MaterialCommunityIcons name="cup" size={24} color="#2196F3" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสมวุ้นนมเปรี้ยว</Text>
              <Text style={styles.sectionSubtitle}>ส่วนของวุ้น</Text>
            </View>
          </View>
          
          <View style={styles.ingredientsList}>
            {jellyIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                {/* เปลี่ยนสี Dot */}
                <View style={[styles.ingredientDot, { backgroundColor: '#2196F3' }]} />
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

        {/* Tips Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>เคล็ดลับสำคัญ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name={("fruit-citrus" as any)} size={16} color="#FF9800" />
            <Text style={styles.tipText}>การต้มส้มก่อนปอก จะช่วยให้ลอกเยื่อขาวๆ ที่ขม ออกได้ง่ายขึ้นมาก</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name={("water-check" as any)} size={16} color="#2196F3" />
            <Text style={styles.tipText}>ต้องแช่ผงวุ้นในน้ำก่อน 10 นาที เพื่อให้วุ้นอิ่มน้ำและเซ็ตตัวได้ดี</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="fire" size={16} color="#FF6B6B" />
            <Text style={styles.tipText}>อย่าเทนมเปรี้ยวเย็นๆ ลงในวุ้นที่ร้อนจัด (วุ้นอาจเป็นลิ่ม) ควรอุ่นวุ้นเล็กน้อย และใช้นมเปรี้ยวอุณหภูมิห้อง</Text>
          </View>
        </View>

        {/* Serving Suggestion */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food" size={24} color="#9C27B0" />
            <Text style={styles.sectionTitle}>คำแนะนำในการเสิร์ฟ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>เสิร์ฟแบบเย็นๆ จะสดชื่นมาก</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.tipText}>ตัดเป็นชิ้นสี่เหลี่ยมพอดีคำ ให้เห็นไส้ส้มด้านใน</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// ส่วนของ Styles (ใช้ของเดิมทั้งหมด)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4E4A0', // สีพื้นหลัง (จากโค้ดเดิม)
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

export default JellyOrange;