import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface UserData {
  email?: string;
  name?: string;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // 1. ดูทั้งหมดว่ามี key อะไรบ้างใน AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();
      console.log('📋 All AsyncStorage keys:', allKeys);
      
      // 2. ลองดึงค่าจาก key ที่น่าสนใจทั้งหมดมาดู
      const allItems = await AsyncStorage.multiGet(allKeys);
      console.log('📦 All AsyncStorage items:');
      allItems.forEach(([key, value]) => {
        console.log(`   ${key}:`, value);
      });

      let userEmail = '';
      let userName = '';

      // 3. ลองหาจาก key ต่างๆ ที่อาจเก็บชื่อผู้ใช้
      const nameKeys = [
        'user_name', 'username', 'name', 'displayName', 
        'user_display_name', 'userName', 'full_name'
      ];
      
      const emailKeys = [
        'user_email', 'email', 'userEmail', 'user_email_address'
      ];

      // 4. หาชื่อผู้ใช้
      for (const key of nameKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value && value.trim() !== '') {
          userName = value;
          console.log(`✅ Found name in ${key}:`, userName);
          break;
        }
      }

      // 5. หาอีเมล
      for (const key of emailKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value && value.trim() !== '') {
          userEmail = value;
          console.log(`✅ Found email in ${key}:`, userEmail);
          break;
        }
      }

      // 6. ลองหาใน JSON objects
      const jsonKeys = ['user_info', 'userData', 'auth_data', 'user', 'profile'];
      for (const key of jsonKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          try {
            const data = JSON.parse(value);
            console.log(`🔍 Checking ${key}:`, data);
            
            // หาชื่อจาก object ต่างๆ
            const possibleName = 
              data.name || 
              data.username || 
              data.displayName || 
              data.full_name ||
              data.user?.name ||
              data.user?.username ||
              data.profile?.name;
              
            const possibleEmail = 
              data.email ||
              data.userEmail ||
              data.user?.email;
            
            if (possibleName && !userName) {
              userName = possibleName;
              console.log(`✅ Found name in ${key} object:`, userName);
            }
            
            if (possibleEmail && !userEmail) {
              userEmail = possibleEmail;
              console.log(`✅ Found email in ${key} object:`, userEmail);
            }
          } catch (e) {
            console.log(`❌ Error parsing ${key}:`, e);
          }
        }
      }

      setUserData({
        email: userEmail || 'user@example.com',
        name: userName || 'ผู้ใช้'
      });
      
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserData({
        email: 'user@example.com',
        name: 'ผู้ใช้'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'ออกจากระบบ',
      'คุณแน่ใจว่าต้องการออกจากระบบหรือไม่?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel'
        },
        {
          text: 'ออกจากระบบ',
          style: 'destructive',
          onPress: async () => {
            try {
              // ลบข้อมูลทั้งหมดที่เกี่ยวข้อง
              const keysToRemove = [
                'user_name', 'username', 'name', 'user_email', 'email',
                'user_info', 'userData', 'auth_data', 'access_token',
                'refresh_token', 'user_session'
              ];
              
              await AsyncStorage.multiRemove(keysToRemove);
              navigation.replace('Login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถออกจากระบบได้');
            }
          }
        }
      ]
    );
  };

  // ฟังก์ชันสำหรับ Quick Actions
  const handleFavoritePress = () => {
    navigation.navigate('Favorite');
  };

  const handleHistoryPress = () => {
    navigation.navigate('Home');
  };

  const handleCameraPress = () => {
    navigation.navigate('Snap');
  };

  const handleMenuPress = () => {
    navigation.navigate('Search');
  };

  // ฟังก์ชันสำหรับเมนูตั้งค่า
  const handleProfileSettings = () => {
    Alert.alert('กำลังพัฒนา', 'การตั้งค่าข้อมูลส่วนตัวกำลังอยู่ในขั้นตอนการพัฒนา');
  };

  const handleNotificationSettings = () => {
    Alert.alert('กำลังพัฒนา', 'การตั้งค่าการแจ้งเตือนกำลังอยู่ในขั้นตอนการพัฒนา');
  };

  const handlePrivacySettings = () => {
    Alert.alert('กำลังพัฒนา', 'การตั้งค่าความเป็นส่วนตัวกำลังอยู่ในขั้นตอนการพัฒนา');
  };

  const handleHelpSupport = () => {
    Alert.alert('กำลังพัฒนา', 'ศูนย์ช่วยเหลือกำลังอยู่ในขั้นตอนการพัฒนา');
  };

  // ตั้งค่า header ที่มีปุ่ม logout ตรงขวาบน
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#A4E4A0" />
      
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Feather name="user" size={40} color="#4CAF50" />
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            </View>
          </View>
          
          <Text style={styles.userName}>
            {loading ? 'กำลังโหลด...' : userData.name}
          </Text>
          <Text style={styles.userEmail}>
            {loading ? 'กำลังโหลด...' : userData.email}
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>การดำเนินการด่วน</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={handleFavoritePress}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E8' }]}>
              <MaterialCommunityIcons name="heart" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>รายการโปรด</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionItem}
            onPress={handleHistoryPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3CD' }]}>
              <MaterialCommunityIcons name="history" size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>หน้าแรก</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionItem}
            onPress={handleCameraPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <MaterialCommunityIcons name="camera" size={24} color="#2196F3" />
            </View>
            <Text style={styles.actionText}>วิเคราะห์</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionItem}
            onPress={handleMenuPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
              <MaterialCommunityIcons name="chef-hat" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.actionText}>ค้นหา</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>การตั้งค่า</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleProfileSettings}
        >
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="account" size={22} color="#4CAF50" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>ข้อมูลส่วนตัว</Text>
            <Text style={styles.menuSubtext}>จัดการข้อมูลโปรไฟล์ของคุณ</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleNotificationSettings}
        >
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="bell" size={22} color="#FF9800" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>การแจ้งเตือน</Text>
            <Text style={styles.menuSubtext}>จัดการการแจ้งเตือน</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handlePrivacySettings}
        >
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="shield" size={22} color="#2196F3" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>ความเป็นส่วนตัว</Text>
            <Text style={styles.menuSubtext}>การตั้งค่าความเป็นส่วนตัว</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        {/* ✅ เพิ่มปุ่ม Debug Database ใหม่ */}
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Debug')}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: '#F0F9FF' }]}>
            <MaterialCommunityIcons name="database-search" size={22} color="#0EA5E9" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>Debug Database</Text>
            <Text style={styles.menuSubtext}>ตรวจสอบโครงสร้างฐานข้อมูล</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleHelpSupport}
        >
          <View style={styles.menuIconContainer}>
            <MaterialCommunityIcons name="help-circle" size={22} color="#9C27B0" />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuText}>ช่วยเหลือ & รองรับ</Text>
            <Text style={styles.menuSubtext}>ศูนย์ช่วยเหลือ</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color="#FF6B6B" />
        <Text style={styles.logoutText}>ออกจากระบบ</Text>
      </TouchableOpacity>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Fresh Produce v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

// Styles เดิมทั้งหมด (เหมือนเดิม)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEF5',
  },
  headerButton: {
    marginRight: 16,
    padding: 8,
  },
  headerSection: {
    backgroundColor: '#A4E4A0',
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  quickActions: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FDF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFE5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;