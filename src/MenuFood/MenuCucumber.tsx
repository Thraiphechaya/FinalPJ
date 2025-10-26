import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RootStackParamList } from '../types';

type MenuCucumberNav = NativeStackNavigationProp<RootStackParamList, 'MenuCucumber'>;

const MenuCucumber = () => {
  const navigation = useNavigation<MenuCucumberNav>();

  const menus = [
    {
      id: 1,
      name: 'ยำแตงกวาหมูยอ',
      image: 'https://f.ptcdn.info/640/074/000/qyjpj018zr3CSN0J2mDa-o.jpg',
      detail: 'ยำหมูแบบอร่อยง่าย ๆ กลมกล่อมแซ่บ ๆ',
      icon: 'bowl',
      color: '#d91e1bff',
    },
    {
      id: 2,
      name: 'แตงกวาผัดไข่',
      image: 'https://howtocookhub.com/wp-content/uploads/2023/09/4.png',
      detail: 'อาหารดีต่อสุขภาพ เหมาะสำหรับคนลดน้ำหนักด้วย !!!',
      icon: 'bowl-mix',
      color: '#e9a143ff',
    },
    {
      id: 3,
      name: 'น้ำแตงกวาปั่น',
      image: 'https://health.campus-star.com/app/uploads/2016/09/cucumber-juice.jpg',
      detail: 'น้ำปั่นอะไรดื่มแล้วไม่รู้สึกผิดด !!!',
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
          <Text style={styles.subtitle}>เมนูแนะนำจากแตงกวา </Text>
        </View>

        {/* Menu Cards */}
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.card}
            onPress={() => {
              if (menu.id === 1) {
                navigation.navigate('SpicyCucumberSalad');
              } else if (menu.id === 2) {
                navigation.navigate('StirFriedCucumberEgg');
              } else if (menu.id === 3) {
                navigation.navigate('CucumberSmoothie');
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

export default MenuCucumber;