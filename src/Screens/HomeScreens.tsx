import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
  RefreshControl,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Tabbar from '../Component/Tabbar';
import { RootStackParamList } from '../types';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

// ===== TYPE DEFINITIONS =====
interface Vegetable {
  id: number;
  name: string;
  picture: string;
  description?: string;
  createat: string;
}

interface Fruit {
  id: number;
  name: string;
  picture: string;
  description?: string;
  createat: string;
}

interface FavoriteItem {
  id: number;
  users_id: number;
  vegetable_id?: number;
  fruit_id?: number;
  createat: string;
}

interface DisplayItem {
  id: number;
  name: string;
  description?: string;
  picture: string;
  type: 'vegetable' | 'fruit';
  isFavorite: boolean;
  createat?: string;
}

// ===== NAVIGATION TYPE =====
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { width: screenWidth } = Dimensions.get('window');

// ===== COMPONENT =====
const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [fruit, setFruits] = useState<Fruit[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  
  const CURRENT_USER_ID = 1;

  useEffect(() => {
    fetchAllData();
    startAnimations();
  }, []);

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // ===== API FUNCTIONS =====
  const fetchAllData = async () => {
    try {
      setLoading(true);
      console.log('Fetching data from Supabase...');
      
      await Promise.all([
        fetchVegetables(),
        fetchFruits(), 
        fetchFavorites()
      ]);
      
      console.log('All data fetched successfully from Supabase');
    } catch (error) {
      console.error('Error fetching all data:', error);
      Alert.alert(
        'Connection Error',
        `Failed to load data from server. Please check your connection.`,
        [{ text: 'Retry', onPress: fetchAllData }]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
  };

  const fetchVegetables = async () => {
    try {
      const { data, error } = await supabase
        .from('vegetable')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      setVegetables(data || []);
      console.log('Vegetables loaded from Supabase:', data?.length || 0);
    } catch (error) {
      console.error('Error fetching vegetables:', error);
      throw error;
    }
  };

  const fetchFruits = async () => {
    try {
      const { data, error } = await supabase
        .from('fruit')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      setFruits(data || []);
      console.log('Fruits loaded from Supabase:', data?.length || 0);
    } catch (error) {
      console.error('Error fetching fruits:', error);
      throw error;
    }
  };

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorite')
        .select('*')
        .eq('users_id', CURRENT_USER_ID)
        .order('createat', { ascending: false });

      if (error) {
        console.log('Error fetching favorite:', error);
        setFavorites([]);
        return;
      }

      setFavorites(data || []);
      console.log('Favorites loaded from Supabase:', data?.length || 0);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    }
  };

  const toggleFavorite = async (itemId: number, itemType: 'vegetable' | 'fruit') => {
    try {
      // ✅ ใช้ vegetable_id/fruit_id ในการค้นหา
      const existingFavorite = favorites.find(fav => 
        itemType === 'vegetable' 
          ? fav.vegetable_id === itemId
          : fav.fruit_id === itemId
      );

      if (existingFavorite) {
        const { error } = await supabase
          .from('favorite')
          .delete()
          .eq('id', existingFavorite.id);

        if (error) throw error;

        setFavorites(prev => prev.filter(fav => fav.id !== existingFavorite.id));
        console.log('Favorite removed from Supabase');
      } else {
        // ✅ สร้าง object สำหรับ insert โดยไม่มี item_name และ item_image_url
        const insertData: any = {
          users_id: CURRENT_USER_ID,
          createat: new Date().toISOString(),
        };

        // ✅ กำหนด vegetable_id หรือ fruit_id ตามประเภท
        if (itemType === 'vegetable') {
          insertData.vegetable_id = itemId;
        } else {
          insertData.fruit_id = itemId;
        }

        const { data, error } = await supabase
          .from('favorite')
          .insert([insertData])
          .select();

        if (error) throw error;

        if (data && data.length > 0) {
          setFavorites(prev => [...prev, data[0]]);
        }
        console.log('Favorite added to Supabase');
      }

    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorite. Please try again.');
      await fetchFavorites();
    }
  };

  // ===== NAVIGATION =====
  const handleCardPress = (item: DisplayItem) => {
    navigation.navigate('Detail', {
      itemId: item.id,
      itemType: item.type,
      itemName: item.name,
      itemDescription: item.description || 'No description available',
      itemPicture: item.picture,
      isFavorite: item.isFavorite,
      userId: CURRENT_USER_ID,
    });
  };

  // ===== PROFILE FUNCTION =====
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  // ===== HELPER FUNCTIONS =====
  const getCombinedItems = (): DisplayItem[] => {
    const combinedItems: DisplayItem[] = [];

    vegetables.forEach(veg => {
      // ✅ ใช้ vegetable_id ในการตรวจสอบ
      const isFavorite = favorites.some(fav => fav.vegetable_id === veg.id);
      
      combinedItems.push({
        id: veg.id,
        name: veg.name,
        description: veg.description,
        picture: veg.picture,
        type: 'vegetable',
        isFavorite,
        createat: veg.createat
      });
    });

    fruit.forEach(fruit => {
      // ✅ ใช้ fruit_id ในการตรวจสอบ
      const isFavorite = favorites.some(fav => fav.fruit_id === fruit.id);
      
      combinedItems.push({
        id: fruit.id,
        name: fruit.name,
        description: fruit.description,
        picture: fruit.picture,
        type: 'fruit',
        isFavorite,
        createat: fruit.createat
      });
    });

    return combinedItems;
  };

  const getItemEmoji = (item: DisplayItem): string => {
    if (item.picture && !item.picture.startsWith('http')) {
      return item.picture;
    }
    
    if (item.picture && item.picture.startsWith('http')) {
      return '🖼️';
    }
    
    if (item.type === 'vegetable') {
      const vegEmojis = ['🥕', '🥦', '🌽', '🍅', '🥬', '🌶️', '🫑', '🥒', '🧄', '🧅'];
      return vegEmojis[item.id % vegEmojis.length];
    } else {
      const fruitEmojis = ['🍎', '🍊', '🍌', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍'];
      return fruitEmojis[item.id % fruitEmojis.length];
    }
  };

  // ===== RENDER FUNCTIONS =====
  const renderItemCard = (item: DisplayItem, index: number) => (
    <Animated.View
      key={`${item.type}-${item.id}`}
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -index * 10],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.cardTouchable}
        activeOpacity={0.7}
        onPress={() => handleCardPress(item)}
      >
        <View style={styles.cardContent}>
          <View style={[
            styles.imageContainer,
            item.type === 'vegetable' ? styles.vegetableImage : styles.fruitImage
          ]}>
            {item.picture && item.picture.startsWith('http') ? (
              <Image 
                source={{ uri: item.picture }} 
                style={styles.itemImage}
                resizeMode="cover"
                onError={() => console.log('Image load error for:', item.name)}
              />
            ) : (
              <Text style={styles.itemEmoji}>{getItemEmoji(item)}</Text>
            )}
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.description || 'No description available'}
            </Text>
            <View style={styles.typeContainer}>
              <View style={[
                styles.typeBadge,
                item.type === 'vegetable' ? styles.vegetableBadge : styles.fruitBadge
              ]}>
                <Text style={styles.typeText}>
                  {item.type === 'vegetable' ? '🥬 Vegetable' : '🍎 Fruit'}
                </Text>
              </View>
            </View>
            {item.createat && (
              <Text style={styles.dateText}>
                Added: {new Date(item.createat).toLocaleDateString()}
              </Text>
            )}
          </View>
          
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              item.isFavorite && styles.favoriteButtonActive
            ]}
            onPress={() => toggleFavorite(item.id, item.type)}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={item.isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={item.isFavorite ? "#EF4444" : "#9CA3AF"} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderStatsItem = (count: number, label: string, emoji: string, index: number) => (
    <Animated.View
      key={label}
      style={[
        styles.statItem,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, index * 5],
            }),
          }],
        },
      ]}
    >
      <View style={styles.statEmojiContainer}>
        <Text style={styles.statEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.statNumber}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );

  // ===== COMPUTED VALUES =====
  const combinedItems = getCombinedItems();
  const vegetableCount = vegetables.length;
  const fruitCount = fruit.length;
  const favoriteCount = favorites.length;

  // ===== LOADING STATE =====
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#10B981" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={styles.loadingText}>Loading from Supabase...</Text>
        </View>
        <Tabbar />
      </SafeAreaView>
    );
  }

  // ===== MAIN RENDER =====
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#10B981" />

      {/* ✅ Header ใหม่ที่สวยงาม */}
      <View style={styles.header}>
        <View style={styles.headerBackground}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.logoContainer}>
                <FontAwesome5 name="leaf" size={28} color="#fff" />
                <View style={styles.titleContainer}>
                  <Text style={styles.headerTitle}>Fresh Produce</Text>
                  <View style={styles.userInfo}>
                    <Ionicons name="person-circle-outline" size={16} color="#D1FAE5" />
                    <Text style={styles.headerSubtitle}>User ID: {CURRENT_USER_ID}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.iconButton} 
                onPress={fetchAllData}
              >
                <Ionicons name="refresh" size={22} color="#fff" />
              </TouchableOpacity>
              {/* ✅ เปลี่ยนเป็นปุ่ม Profile */}
              <TouchableOpacity 
                style={[styles.iconButton, styles.profileButton]} 
                onPress={handleProfilePress}
              >
                <Ionicons name="person" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* ✅ Content ใน ScrollView */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#10B981']}
            tintColor="#10B981"
          />
        }
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Animated.View 
            style={[
              styles.statsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {renderStatsItem(vegetableCount, 'Vegetable', '🥬', 0)}
            {renderStatsItem(fruitCount, 'Fruit', '🍎', 1)}
            {renderStatsItem(favoriteCount, 'Favorites', '❤️', 2)}
          </Animated.View>

          <Animated.Text 
            style={[
              styles.sectionTitle,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            All Items ({combinedItems.length})
          </Animated.Text>

          {combinedItems.length > 0 ? (
            combinedItems.map((item, index) => renderItemCard(item, index))
          ) : (
            <Animated.View 
              style={[
                styles.emptyContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Ionicons name="leaf-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No items found</Text>
              <Text style={styles.emptySubtitle}>Pull down to refresh or check your connection</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchAllData}>
                <Ionicons name="refresh" size={18} color="#fff" style={styles.retryIcon} />
                <Text style={styles.retryButtonText}>Refresh Data</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>

      <Tabbar />
    </SafeAreaView>
  );
};

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10B981',
  },
  // ✅ Header Styles ใหม่
  header: {
    backgroundColor: '#10B981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  headerBackground: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#D1FAE5',
    opacity: 0.9,
    marginLeft: 6,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // ✅ เปลี่ยนเป็นสีสำหรับปุ่ม Profile
  profileButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.25)', // สีฟ้า
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafcff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  content: {
    backgroundColor: '#fbfce6ff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    marginTop: 0,
    paddingTop: 10,
  },
  statsContainer: { //header 3 อันน
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#a4f629ff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statEmojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statEmoji: {
    fontSize: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'System',
  },
  card: {
    backgroundColor: '#7cf800c5',
    borderRadius: 20,
    marginBottom: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  cardTouchable: {
    borderRadius: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vegetableImage: {
    backgroundColor: '#ECFDF5',
  },
  fruitImage: {
    backgroundColor: '#FEF3C7',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemEmoji: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
    fontFamily: 'System',
  },
  itemDescription: {
    fontSize: 14,
    color: '#4c5058ff',
    marginBottom: 8,
    lineHeight: 18,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vegetableBadge: {
    backgroundColor: '#D1FAE5',
  },
  fruitBadge: {
    backgroundColor: '#FEF3C7',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
  dateText: {
    fontSize: 11,
    color: '#6a6d71ff',
    marginTop: 4,
    fontStyle: 'italic',
  },
  favoriteButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#7cf800c5',//พื้นหลัง icon fav
  },
  favoriteButtonActive: {
    backgroundColor: '#FEE2E2',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#10B981',
    fontWeight: '600',
    fontFamily: 'System',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
    marginHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'System',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  retryIcon: {
    marginRight: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'System',
  },
});

export default HomeScreen;