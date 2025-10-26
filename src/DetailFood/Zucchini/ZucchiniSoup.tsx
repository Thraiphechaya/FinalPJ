import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'; // สมมติว่า path นี้ถูกต้อง

type ZucchiniScreenNav = NativeStackNavigationProp<RootStackParamList, 'ZucchiniScreen'>;

const ZucchiniSoup = () => {
  const navigation = useNavigation<ZucchiniScreenNav>();

  const mainIngredients = [
    { name: 'ซูกินี (หั่นแว่น หรือ เต๋า)', amount: '2-3 ลูก' },
    { name: 'หอมใหญ่ (หั่นเต๋า)', amount: '1/2 หัว' },
    { name: 'มันฝรั่ง (หั่นเต๋า)', amount: '1/2 หัว (ช่วยให้ซุปข้น)' },
    { name: 'กระเทียม (สับ)', amount: '1-2 กลีบ' },
    { name: 'เนยจืด หรือ น้ำมันมะกอก', amount: '1 ช้อนโต๊ะ' },
    { name: 'น้ำสต็อก (ผัก หรือ ไก่)', amount: '3-4 ถ้วย' },
    { name: 'ครีมสด (Whipping Cream)', amount: '1/4 ถ้วย (ไม่ใส่ก็ได้)' },
    { name: 'เกลือ, พริกไทยขาว', amount: 'ตามชอบ' },
    { name: 'ใบโหระพา หรือ พาร์สลีย์ (สำหรับตกแต่ง)', amount: 'เล็กน้อย' },
  ];

  const steps = [
    {
      number: 1,
      text: 'ตั้งหม้อ ใส่เนยหรือน้ำมัน ใช้ไฟกลาง'
    },
    {
      number: 2,
      text: 'ใส่หอมใหญ่ลงไปผัดจนนิ่มและใส'
    },
    {
      number: 3,
      text: 'ใส่กระเทียมสับ ผัดต่อให้หอม'
    },
    {
      number: 4,
      text: 'ใส่ซูกินี และมันฝรั่ง ลงไปผัดประมาณ 2-3 นาที'
    },
    {
      number: 5,
      text: 'เทน้ำสต็อกลงไปให้พอท่วมผัก'
    },
    {
      number: 6,
      text: 'ต้มให้เดือด แล้วลดไฟลง เคี่ยวต่อประมาณ 15-20 นาที หรือจนผักทุกอย่างนิ่มเปื่อย'
    },
    {
      number: 7,
      text: 'ยกลงจากเตา ใช้เครื่องปั่นมือถือ (Immersion Blender) ปั่นซุปให้เนียนละเอียด',
      tip: 'เคล็ดลับ: ถ้าไม่มีเครื่องปั่นมือถือ พักซุปให้เย็นลงเล็กน้อย แล้วเทใส่โถปั่นปกติ ปั่นจนเนียน'
    },
     {
      number: 8,
      text: 'นำซุปกลับไปตั้งไฟอ่อน (ถ้าต้องการซุปครีม ให้ใส่ครีมสดตอนนี้) คนให้เข้ากัน อุ่นให้ร้อน แต่ไม่ต้องเดือด'
    },
    {
      number: 9,
      text: 'ปรุงรสด้วยเกลือและพริกไทยขาว ชิมรสตามชอบ'
    },
    {
      number: 10,
      text: 'ตักใส่ถ้วย ตกแต่งด้วยใบโหระพา หรือพาร์สลีย์'
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
              uri: 'https://preview.redd.it/vegan-zucchini-soup-v0-zdgi4ltem8ef1.jpeg?width=640&crop=smart&auto=webp&s=395105fe00ba5fa345fab9a9b5a956f56071c962'
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>ซุปซูกินี</Text>
            <View style={[styles.tasteTag, { backgroundColor: '#E8F5E9' }]}>
               {/* ใช้ไอคอน 'bowl-mix' */}
              <MaterialCommunityIcons name="bowl-mix" size={16} color="#4CAF50" />
              <Text style={[styles.tasteText, { color: '#4CAF50' }]}>เนื้อเนียนละมุน หวานธรรมชาติ</Text>
            </View>
          </View>
        </View>

        {/* Time Info */}
        <View style={styles.timeCard}>
          <View style={styles.timeItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4CAF50" />
            <Text style={styles.timeLabel}>เวลาเตรียม</Text>
            <Text style={styles.timeValue}>10 นาที</Text>
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
            <Text style={styles.timeValue}>2-3 ที่</Text>
          </View>
        </View>

        {/* Main Ingredients Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-variant" size={24} color="#388E3C" />
            <View>
              <Text style={styles.sectionTitle}>ส่วนผสม</Text>
            </View>
          </View>
          <View style={styles.ingredientsList}>
            {mainIngredients.map((item, index) => (
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
            <Text style={styles.tipText}>การใส่มันฝรั่ง จะช่วยเพิ่มความข้นเนียนให้กับซุปโดยไม่ต้องใส่ครีมเยอะ</Text>
          </View>
          <View style={styles.tipContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#E65100" />
            <Text style={styles.tipText}>เสิร์ฟคู่กับขนมปังปิ้ง หรือโรยหน้าด้วยเมล็ดฟักทองอบ ก็อร่อยเข้ากัน</Text>
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

export default ZucchiniSoup;