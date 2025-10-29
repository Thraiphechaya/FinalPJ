import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RootStackParamList } from '../types';

type MenuCabbageNav = NativeStackNavigationProp<RootStackParamList, 'MenuCabbage'>;

const MenuCabbage = () => {
  const navigation = useNavigation<MenuCabbageNav>();

  const menus = [
    {
      id: 1,
      name: 'ไข่ตุ๋นกะหล่ำปลี',
      image: 'https://s3-ap-southeast-1.amazonaws.com/photo.wongnai.com/photos/2017/03/29/9cdd33c0fdff4a0aa95c483f4e5d5928.jpg',
      detail: '"ไข่ตุ๋นมังกรหยก" เมนูไข่ชื่ออลังการแต่กรรมวิธีเรียบง่ายราวกับโกหกทำเอง ชิมเอง สักครั้งแล้วจะติดใจ!',
      icon: 'cup',
      color: '#d91e1bff',
    },
    {
      id: 2,
      name: 'กะหล่ำปลีฉ่าน้ำปลา',
      image: 'https://i.ytimg.com/vi/h3iwdEzqQWk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA-W6C7T_A21xenDlSzy1Szc2w1Bg',
      detail: 'กะหล่ำปลีผัดน้ำปลาที่ใช้วัตถุดิบเพียงไม่กี่อย่าง แต่ให้รสชาติที่กลมกล่อมลงตัวจุดเด่นอยู่ที่กะหล่ำปลีหวานกรอบผัดไฟแรง',
      icon: 'bowl',
      color: '#e9a143ff',
    },
    {
      id: 3,
      name: 'แกงจืดกะหล่ำปลีห่อหมู',
      image: 'https://s3-ap-southeast-1.amazonaws.com/photo.wongnai.com/photos/2017/03/31/3245529bc00142218dad71957aca66c2.jpg',
      detail: 'เมนูยอดฮิตสารอาหารครบถ้วน ซดน้ำร้อน ๆ',
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
          <Text style={styles.subtitle}>เมนูแนะนำจากกะหล่ำปลี </Text>
        </View>

        {/* Menu Cards */}
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.card}
            onPress={() => {
              if (menu.id === 1) {
                navigation.navigate('JadeDragonSteamedEgg');
              } else if (menu.id === 2) {
                navigation.navigate('MicrowaveCabbageFishSauce');
              } else if (menu.id === 3) {
                navigation.navigate('CabbagePorkSoup');
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

export default MenuCabbage;