import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Snap: undefined;
  Favorite: undefined;
  Search: undefined;
};

interface TabbarProps {
  activeTab?: 'home' | 'snap' | 'favorite' | 'search';
}

const Tabbar: React.FC<TabbarProps> = ({ activeTab }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  
  // ตรวจสอบหน้าปัจจุบันจาก route name
  const getCurrentTab = (): 'home' | 'snap' | 'favorite' | 'search' => {
    const routeName = route.name;
    
    switch (routeName) {
      case 'Home':
        return 'home';
      case 'Snap':
        return 'snap';
      case 'Favorite':
        return 'favorite';
      case 'Search':
        return 'search';
      default:
        return activeTab || 'home';
    }
  };

  const currentActiveTab = getCurrentTab();

  const handleTabPress = (tab: string) => {
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

  // Icon แบบมินิมอล - แก้ไข type error
  const renderTabIcon = (tab: string) => {
    const isActive = currentActiveTab === tab;
    const iconColor = isActive ? '#10B981' : '#9CA3AF';
    const iconSize = 22;

    // กำหนด icon name โดยตรงแทนการใช้ object
    let iconName: any = 'home-outline';
    
    switch (tab) {
      case 'home':
        iconName = isActive ? 'home' : 'home-outline';
        break;
      case 'snap':
        iconName = isActive ? 'camera' : 'camera-outline';
        break;
      case 'favorite':
        iconName = isActive ? 'heart' : 'heart-outline';
        break;
      case 'search':
        iconName = isActive ? 'search' : 'search-outline';
        break;
    }

    return (
      <View style={styles.iconContainer}>
        <Ionicons 
          name={iconName} 
          size={iconSize} 
          color={iconColor} 
        />
        {isActive && <View style={styles.activeDot} />}
      </View>
    );
  };

  return (
    <View style={styles.tabBar}>
      {['home', 'snap', 'favorite', 'search'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={styles.tabButton}
          onPress={() => handleTabPress(tab)}
          activeOpacity={0.7}
        >
          {renderTabIcon(tab)}
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
    borderTopWidth: 0.5,
    borderTopColor: '#E5E7EB',
    height: 56,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 4,
  },
  activeDot: {
    position: 'absolute',
    bottom: -2,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#10B981',
  },
});

export default Tabbar;