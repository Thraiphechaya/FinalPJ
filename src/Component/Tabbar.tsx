import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';

// Define your navigation stack types
type RootStackParamList = {
  Home: undefined;
  Snap: undefined;
  Favorite: undefined;
  Search: undefined;
};

interface TabbarProps {
  activeTab?: 'home' | 'snap' | 'favorite' | 'search'; // optional fallback
}

const Tabbar: React.FC<TabbarProps> = ({ activeTab }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  
  // ⚠️ ตรวจสอบหน้าปัจจุบันจาก route name
  const getCurrentTab = (): 'home' | 'snap' | 'favorite' | 'search' => {
    const routeName = route.name.toLowerCase();
    
    switch (routeName) {
      case 'home':
      case 'homescreen': // รองรับชื่อ component ที่อาจแตกต่าง
        return 'home';
      case 'snap':
      case 'snapscreen':
        return 'snap';
      case 'favorite':
      case 'favorites':
      case 'favoritescreen':
        return 'favorite';
      case 'search':
      case 'searchscreen':
        return 'search';
      default:
        return activeTab || 'home'; // fallback
    }
  };

  const currentActiveTab = getCurrentTab();

  const handleTabPress = (tab: string) => {
    // ไม่ navigate ถ้าอยู่หน้าเดิมแล้ว
    if (tab === currentActiveTab) return;
    
    switch (tab) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'snap':
        navigation.navigate('Snap');
        break;
      case 'favorite':
        navigation.navigate('Favorite');
        break;
      case 'search':
        navigation.navigate('Search');
        break;
    }
  };

  const renderTabIcon = (tab: string) => {
    const isActive = currentActiveTab === tab;
    
    // ⚠️ เปลี่ยนสีตามสถานะ active
    const iconColor = isActive ? '#4ADE80' : '#9CA3AF'; // สีเขียวเมื่อ active, สีเทาเมื่อไม่ active
    const backgroundColor = isActive ? 'rgba(74, 222, 128, 0.1)' : 'transparent'; // background สีเขียวอ่อน
    
    const iconContainerStyle = [
      styles.iconContainer,
      isActive && styles.activeIconContainer,
      { backgroundColor }
    ];
    
    switch (tab) {
      case 'home':
        return (
          <View style={iconContainerStyle}>
            <View style={styles.homeIconWrapper}>
              <View style={[styles.homeIcon, { backgroundColor: iconColor }]} />
              <View style={[styles.homeIconRoof, { borderBottomColor: iconColor }]} />
            </View>
            {isActive && <View style={styles.activeIndicator} />}
          </View>
        );
      case 'snap':
        return (
          <View style={iconContainerStyle}>
            <View style={[styles.cameraIcon, { borderColor: iconColor }]}>
              <View style={[styles.cameraLens, { backgroundColor: iconColor }]} />
              <View style={[styles.cameraFlash, { backgroundColor: iconColor }]} />
            </View>
            {isActive && <View style={styles.activeIndicator} />}
          </View>
        );
      case 'favorite':
        return (
          <View style={iconContainerStyle}>
            <View style={styles.heartIconWrapper}>
              {isActive ? (
                // ❤️ Filled heart เมื่อ active
                <View style={[styles.heartIconFilled, { backgroundColor: iconColor }]} />
              ) : (
                // 🤍 Outline heart เมื่อไม่ active
                <>
                  <View style={[styles.heartLeft, { backgroundColor: iconColor }]} />
                  <View style={[styles.heartRight, { backgroundColor: iconColor }]} />
                  <View style={[styles.heartBottom, { backgroundColor: iconColor }]} />
                </>
              )}
            </View>
            {isActive && <View style={styles.activeIndicator} />}
          </View>
        );
      case 'search':
        return (
          <View style={iconContainerStyle}>
            <View style={styles.searchIconWrapper}>
              <View style={[styles.searchIcon, { borderColor: iconColor }]} />
              <View style={[styles.searchHandle, { backgroundColor: iconColor }]} />
            </View>
            {isActive && <View style={styles.activeIndicator} />}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.tabBar}>
      {[
        { key: 'home', label: '🏠' },
        { key: 'snap', label: '📸' },
        { key: 'favorite', label: '❤️' },
        { key: 'search', label: '🔍' }
      ].map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.tabButton,
            currentActiveTab === key && styles.activeTabButton
          ]}
          onPress={() => handleTabPress(key)}
          activeOpacity={0.7}
        >
          {renderTabIcon(key)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    minHeight: 48,
    justifyContent: 'center',
  },
  activeTabButton: {
    // เพิ่มเอฟเฟ็กต์เมื่อ active
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 16,
    padding: 4,
  },
  activeIconContainer: {
    // เพิ่ม animation เมื่อ active
    transform: [{ scale: 1.1 }],
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ADE80',
  },
  
  // Home Icon Styles
  homeIconWrapper: {
    width: 20,
    height: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: 14,
    height: 10,
    position: 'absolute',
    bottom: 0,
    borderRadius: 2,
  },
  homeIconRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    top: 2,
  },
  
  // Camera Icon Styles
  cameraIcon: {
    width: 18,
    height: 14,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraLens: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cameraFlash: {
    width: 3,
    height: 2,
    position: 'absolute',
    top: -3,
    left: 2,
    borderRadius: 1,
  },
  
  // Heart Icon Styles
  heartIconWrapper: {
    width: 18,
    height: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIconFilled: {
    width: 16,
    height: 14,
    borderRadius: 8,
    transform: [{ rotate: '-45deg' }],
  },
  heartLeft: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    left: 1,
    top: 0,
  },
  heartRight: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    right: 1,
    top: 0,
  },
  heartBottom: {
    width: 2,
    height: 8,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -1,
    transform: [{ rotate: '45deg' }],
  },
  
  // Search Icon Styles  
  searchIconWrapper: {
    width: 18,
    height: 18,
    position: 'relative',
  },
  searchIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 6,
    height: 2,
    position: 'absolute',
    bottom: 2,
    right: 0,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
});

export default Tabbar;