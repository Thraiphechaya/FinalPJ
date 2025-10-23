import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type StrawberryScreenNav = NativeStackNavigationProp<RootStackParamList, 'StrawberryScreen'>;

const StrawberryScreen = () => {
  const navigation = useNavigation<StrawberryScreenNav>();

  const nutritionData = [
    { label: 'พลังงาน', value: '33 กิโลแคลอรี่', icon: 'fire' },
    { label: 'ไขมันทั้งหมด', value: '0.30 กรัม', icon: 'water' },
    { label: 'ใยอาหาร', value: '3.0 กรัม', icon: 'food-apple' },
    { label: 'คาร์โบไฮเดรต', value: '5.45 กรัม', icon: 'wheat' },
    { label: 'แคลเซียม', value: '7 มิลลิกรัม', icon: 'bone' },
    { label: 'ฟอสฟอรัส', value: '23 มิลลิกรัม', icon: 'periodic-table' },
    { label: 'ธาตุเหล็ก', value: '0.31 มิลลิกรัม', icon: 'magnet' },
    { label: 'โพแทสเซียม', value: '145 มิลลิกรัม', icon: 'atom' },
    { label: 'ทองแดง', value: '0.06 มิลลิกรัม', icon: 'copper' },
    { label: 'สังกะสี', value: '0.14 มิลลิกรัม', icon: 'zinc' },
    { label: 'วิตามินเอ', value: '1 ไมโครกรัม', icon: 'eye' },
    { label: 'วิตามินซี', value: '66 มิลลิกรัม', icon: 'fruit-citrus' },
    { label: 'น้ำตาลรวม', value: '4.03 กรัม', icon: 'candy' },
    { label: 'แมกนีเซียม', value: '9 มิลลิกรัม', icon: 'magnet-on' },
    { label: 'โปรตีนรวม', value: '0.7 กรัม', icon: 'protein' },
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
              uri: 'https://image.makewebcdn.com/makeweb/m_1920x0/qeb9oj2Lg/Ingradian/shutterstock_227472010.jpg?v=202405291424',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>สตรอเบอร์รี่</Text>
            <View style={styles.tasteTag}>
              <MaterialCommunityIcons name="fruit-cherries" size={16} color="#FF6B6B" />
              <Text style={styles.tasteText}>รสเปรี้ยวอมหวาน กลิ่นหอมเฉพาะตัว</Text>
            </View>
          </View>
        </View>

        {/* Nutrition Section */}
        <View style={styles.nutritionCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="nutrition" size={24} color="#4CAF50" />
            <Text style={styles.sectionTitle}>คุณค่าทางโภชนาการ </Text>
          </View>
          <Text style={styles.sectionSubtitle}>ต่อ 100 กรัม</Text>
        
          <View style={styles.nutritionGrid}>
            {nutritionData.map((item, index) => (
              <View key={index} style={styles.nutritionItem}>
                <View style={styles.nutritionIcon}>
                  
                  <MaterialCommunityIcons name={item.icon as any} size={20} color="#4CAF50" />
                </View>
                <View style={styles.nutritionText}>
                  <Text style={styles.nutritionLabel}>{item.label}</Text>
                  <Text style={styles.nutritionValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Health Benefits */}
        <View style={styles.benefitsCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="heart-plus" size={24} color="#FF6B6B" />
            <Text style={styles.sectionTitle}>ประโยชน์ต่อสุขภาพ</Text>
          </View>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="shield-check" size={16} color="#4CAF50" />
              <Text style={styles.benefitText}>อุดมด้วยวิตามินซี เสริมภูมิคุ้มกัน</Text>
            </View>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="heart" size={16} color="#FF6B6B" />
              <Text style={styles.benefitText}>ดีต่อสุขภาพหัวใจ</Text>
            </View>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="eye" size={16} color="#2196F3" />
              <Text style={styles.benefitText}>บำรุงสายตา</Text>
            </View>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="food-apple" size={16} color="#FF9800" />
              <Text style={styles.benefitText}>ไฟเบอร์สูง ช่วยระบบย่อยอาหาร</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('MenuStrawberry')}
      >
        <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="#fff" />
        <Text style={styles.menuButtonText}>เมนูแนะนำ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4E4A0',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
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
    fontSize: 28,
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
  nutritionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  benefitsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  nutritionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  nutritionText: {
    flex: 1,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default StrawberryScreen;