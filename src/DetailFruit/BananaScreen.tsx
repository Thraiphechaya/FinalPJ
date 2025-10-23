import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type BananaScreenNav = NativeStackNavigationProp<RootStackParamList, 'BananaScreen'>;

const BananaScreen = () => {
  const navigation = useNavigation<BananaScreenNav>();

  const nutritionData = [
    { label: 'พลังงาน', value: '118 กิโลแคลอรี่', icon: 'fire' },
    { label: 'ไขมันทั้งหมด', value: '0.15 กรัม', icon: 'water' },
    { label: 'ใยอาหาร', value: '2,4 กรัม', icon: 'food-apple' },
    { label: 'คาร์โบไฮเดรต', value: '27.18 กรัม', icon: 'wheat' },
    { label: 'แคลเซียม', value: '7 มิลลิกรัม', icon: 'bone' },
    { label: 'ฟอสฟอรัส', value: '26 มิลลิกรัม', icon: 'periodic-table' },
    { label: 'ธาตุเหล็ก', value: '0.52 มิลลิกรัม', icon: 'magnet' },
    { label: 'โพแทสเซียม', value: '241 มิลลิกรัม', icon: 'atom' },
    { label: 'ทองแดง', value: '0.08 มิลลิกรัม', icon: 'copper' },
    { label: 'สังกะสี', value: '0.13 มิลลิกรัม', icon: 'zinc' },
    { label: 'วิตามินเอ', value: '3 ไมโครกรัม', icon: 'eye' },
    { label: 'วิตามินซี', value: '13 มิลลิกรัม', icon: 'fruit-citrus' },
    { label: 'น้ำตาลรวม', value: '18.47 กรัม', icon: 'candy' },
    { label: 'แมกนีเซียม', value: '25 มิลลิกรัม', icon: 'magnet-on' },
    { label: 'โปรตีนรวม', value: '0.78 กรัม', icon: 'protein' },
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
              uri: 'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/30/20/2000007266230/2000007266230_1-20250314103554-.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>กล้วยน้ำว้า</Text>
            <View style={styles.tasteTag}>
              <MaterialCommunityIcons name="fruit-cherries" size={16} color="#FF6B6B" />
              <Text style={styles.tasteText}>รสหวาน กลิ่นหอมเฉพาะตัว</Text>
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
              <MaterialCommunityIcons name="stomach" size={16} color="#4CAF50" />
              <Text style={styles.benefitText}>บรรเทาอาหารท้องผูก ท้องเสีย</Text>
            </View>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="spa" size={16} color="#FF6B6B" />
              <Text style={styles.benefitText}>บำรุงผิวพรรณ</Text>
            </View>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="medical-bag" size={16} color="#2196F3" />
              <Text style={styles.benefitText}>อดโอกาสการเป็นโรคเบาหวาน</Text>
            </View>
            
          </View>
        </View>
      </ScrollView>

      {/* Floating Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('MenuBanana')}
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

export default BananaScreen;