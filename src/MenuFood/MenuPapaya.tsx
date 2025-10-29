import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RootStackParamList } from '../types';

type MenuPapayaNav = NativeStackNavigationProp<RootStackParamList, 'MenuPapaya'>;

const MenuPapaya = () => {
  const navigation = useNavigation<MenuPapayaNav>();

  const menus = [
    {
      id: 1,
      name: 'มะละกอปั่น',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUpJuoHlgNX7J8elgcrUcE80EtLeFEaS4pFWWKJdvSV6s_PjPyk8uEBSQ0xYUKBDDcEc8H',
      detail: 'น้ำผลไม้ที่นำเนื้อมะละกอมาปั่นรวมกับส่วนผสมอื่นๆ เช่น น้ำแข็ง น้ำหวาน และอาจมีการเพิ่มนมสด น้ำมะนาว หรือโยเกิร์ตเพื่อเพิ่มรสชาติและเนื้อสัมผัส',
      icon: 'cup',
      color: '#d91e1bff',
    },
    {
      id: 2,
      name: 'ส้มตำทอดเจ',
      image: 'https://img.wongnai.com/p/1600x0/2021/09/25/41655398f84b472f881c80fbd8bf0e85.jpg',
      detail: 'เมนูขนมหวานซ่อนเปรี้ยว ยิ่งกินยิ่งเพลินพร้อมเป็นมิตรต่อสุขภาพไม่ว่าใครก็อดใจไม่ไหว',
      icon: 'bowl',
      color: '#e9a143ff',
    },
    {
      id: 3,
      name: 'มะละกอผัดไข่',
      image: 'https://img.wongnai.com/p/1968x0/2020/09/01/74bed0b3e21541358121a09cb90e9a0e.jpg',
      detail: 'เมนูมะละกอผัดไข่ เส้นกรุบกรอบบวกกับไข่นุ่มลิ้นปรุงรสตามสไตล์ กินกับข้าวสวยอิ่มไปอีกมื้อ',
      icon: 'bowl',
      color: '#FF9800',
    },
  ];

  
  return (
    <View style={styles.container}>
      {/* Header 
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
      </View>
      */}

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <MaterialCommunityIcons name='fruit-citrus' size={32} color="#2E7D32" />
          <Text style={styles.title}>Recommended Menu</Text>
          <Text style={styles.subtitle}>เมนูแนะนำจากมะละกอ </Text>
        </View>

        {/* Menu Cards */}
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.card}
            onPress={() => {
              if (menu.id === 1) {
                navigation.navigate('PapayaSmootie');
              } else if (menu.id === 2) {
                navigation.navigate('FriedPapaya');
              } else if (menu.id === 3) {
                navigation.navigate('StirFriedPapayaWithEgg');
              }
            }}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: `${menu.color}20` }]}>
                <MaterialCommunityIcons name={menu.icon as any} size={24} color={menu.color} />
              </View>
              <Text style={styles.name}>{menu.name}</Text>
            </View>
            
            <Image source={{ uri: menu.image }} style={styles.image} />
            
            <View style={styles.textContainer}>
              <Text style={styles.detail}>{menu.detail}</Text>
              
              <View style={styles.actionButton}>
                <Text style={styles.actionText}>ดูสูตรการทำ</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#4CAF50" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Bottom Space */}
        <View style={styles.bottomSpace} />
      </ScrollView>
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
    paddingTop: 10,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 180,
    marginTop: 12,
  },
  textContainer: {
    padding: 20,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F9F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8F5E8',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  bottomSpace: {
    height: 30,
  },
});

export default MenuPapaya;