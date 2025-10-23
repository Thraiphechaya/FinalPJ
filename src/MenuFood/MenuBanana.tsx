import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type MenuBananaNav = NativeStackNavigationProp<RootStackParamList, 'MenuBanana'>;

const MenuBanana = () => {
  const navigation = useNavigation<MenuBananaNav>();

  const menus = [
    {
      id: 1,
      name: 'ขนมเค้กกล้วย',
      image: 'https://img.wongnai.com/p/1968x0/2018/11/09/cef2735066204e19aa7dae9af56c7081.jpg',
      detail: 'ขนมกล้วย ขนมไทย ลองทำแล้วติดใจ ปรับเลยหน้าตาให้ฟรุงฟริงสักหน่อยคะ แต่งหน้าด้วยกะทิข้นๆ ทานง่าย อ่านต่อได้ที',
      icon: 'cup',
      color: '#FF6B6B',
    },
    {
      id: 2,
      name: 'คาราเมลบานอฟฟีโทสต์',
      image: 'https://img.wongnai.com/p/800x0/2024/03/19/4948f9d9d0c24ff6a6a0c0f279c9e0aa.jpg',
      detail: 'บานอฟฟีโทสต์” ขนมหวานง่าย ๆ ได้ฟีลคาเฟ่ ขนมปังเนื้อนุ่มหอมเนย พร้อมคาราเมล',
      icon: 'bowl-mix',
      color: '#4CAF50',
    },
    {
      id: 3,
      name: 'กล้วยอบเนย',
      image: 'https://img.wongnai.com/p/800x0/2019/02/02/a272beb75658451e8bc16928751f30f9.jpg',
      detail: 'สลัดผักสดกรอบกับสตรอเบอร์รี่ ดีต่อสุขภาพและควบคุมน้ำหนัก',
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
          <MaterialCommunityIcons name="chef-hat"  size={32} color="#2E7D32" />
          <Text style={styles.title}>Recommended Menu</Text>
          <Text style={styles.subtitle}>เมนูแนะนำจากสตรอเบอร์รี่</Text>
        </View>

        {/* Menu Cards */}
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.card}
            onPress={() => {
              if (menu.id === 1) {
                navigation.navigate('BananaCake');
              } else if (menu.id === 2) {
                navigation.navigate('CaramelBananaToast');
              } else if (menu.id === 3) {
                navigation.navigate('ButteredBanana');
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

export default MenuBanana;