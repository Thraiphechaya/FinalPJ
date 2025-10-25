import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RootStackParamList } from '../types';

type MenuAppleNav = NativeStackNavigationProp<RootStackParamList, 'MenuApple'>;

const MenuApple = () => {
  const navigation = useNavigation<MenuAppleNav>();

  const menus = [
    {
      id: 1,
      name: 'สลัดแอปเปิ้ล',
      image: 'https://www.easycookingmenu.com/media/k2/items/cache/3aa0dd096e2d3a6fbc4c3a4c7dea6188_XL.jpg',
      detail: 'เมนูสลัดของโปรด สำหรับคนที่อยากลดน้ำหนัก',
      icon: 'bowl',
      color: '#d91e1bff',
    },
    {
      id: 2,
      name: 'ทาร์ตแอปเปิ้ล',
      image: 'https://img.wongnai.com/p/1600x0/2020/10/30/c507fc542e1947edb1013c15eb411648.jpg',
      detail: 'เมนูขนมหวานซ่อนเปรี้ยว ยิ่งกินยิ่งเพลินพร้อมเป็นมิตรต่อสุขภาพไม่ว่าใครก็อดใจไม่ไหว',
      icon: 'bowl-mix',
      color: '#e9a143ff',
    },
    {
      id: 3,
      name: 'พายแอปเปิ้ล',
      image: 'https://img-global.cpcdn.com/recipes/e97bef7397b7df70/600x852cq80/%E0%B8%A3%E0%B8%9B-%E0%B8%AB%E0%B8%A5%E0%B8%81-%E0%B8%82%E0%B8%AD%E0%B8%87-%E0%B8%AA%E0%B8%95%E0%B8%A3-%E0%B8%9E%E0%B8%B2%E0%B8%A2%E0%B9%81%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%9B%E0%B8%A5-apple-pie.webp',
      detail: 'พายแอปเปิ้ลนิยมรับประทานแบบอุ่น ๆ และมักเสิร์ฟพร้อมกับไอศกรีมวานิลลา หรือวิปครีมเพื่อเพิ่มรสชาติและความอร่อย',
      icon: 'leaf',
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
          <Text style={styles.subtitle}>เมนูแนะนำจากส้ม </Text>
        </View>

        {/* Menu Cards */}
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.card}
            onPress={() => {
              if (menu.id === 1) {
                navigation.navigate('AppleSalad');
              } else if (menu.id === 2) {
                navigation.navigate('AppleTart');
              } else if (menu.id === 3) {
                navigation.navigate('ApplePie');
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

export default MenuApple;