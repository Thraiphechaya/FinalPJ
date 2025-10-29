import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RootStackParamList } from '../types';

type MenuCherryNav = NativeStackNavigationProp<RootStackParamList, 'MenuCherry'>;

const MenuCherry = () => {
  const navigation = useNavigation<MenuCherryNav>();

  const menus = [
    {
      id: 1,
      name: 'วุ้นเชอร์รี่',
      image: 'https://img.wongnai.com/p/1920x0/2020/01/31/a11aff52b86e4c60b5063f257970405d.jpg',
      detail: 'วุ้นเชอรี่นมสด วุ้นแฟนซี น่ารักๆ โดนใจ',
      icon: 'bowl',
      color: '#d91e1bff',
    },
    {
      id: 2,
      name: 'เชอร์รี่ไทรเฟิล',
      image: 'https://supervalue.imgix.net/assets/recipes/iStock-911808958.jpg?&ch=Width,DPR&fit=crop&auto=format%2C%20compress&q=70',
      detail: 'เชอร์รี่ไทรเฟิล ขนมหวานที่เป็นมิตรกับสุขภาพ เชอร์รี่หวานฉ่ำคู่กับมูสดาร์กช็อกโกแลตสูตรพิเศษ',
      icon: 'bowl-mix',
      color: '#e9a143ff',
    },
    {
      id: 3,
      name: 'สมูทตี้เชอร์รี่',
      image: 'https://static.trueplookpanya.com/tppy/member/m_557500_560000/559387/cms/images/%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%AA%E0%B8%A1%E0%B8%B9%E0%B8%97%E0%B8%95%E0%B8%B5%E0%B9%89%E0%B8%A7%E0%B8%B4%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B9%E0%B8%87_15.jpg',
      detail: 'ดื่มง่าย สดชื่นนนนนนนน !!',
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
          <Text style={styles.subtitle}>เมนูแนะนำจากเชอร์รี่</Text>
        </View>

        {/* Menu Cards */}
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.card}
            onPress={() => {
              if (menu.id === 1) {
                navigation.navigate('CherryJelly');
              } else if (menu.id === 2) {
                navigation.navigate('CherryTrifle');
              } else if (menu.id === 3) {
                navigation.navigate('CherrySmoothie');    
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

export default MenuCherry;