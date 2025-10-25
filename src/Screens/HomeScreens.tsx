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
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Tabbar from '../Component/Tabbar';
import LogoutModal from '../Component/LogoutModal';

// ===== TYPE DEFINITIONS =====
// Backend Response Types - ตรงกับ models ใน backend

/**
 * Vegetable interface - ตรงกับ Vegetable model ใน backend
 */
interface Vegetable {
  id: number;
  name: string;
  description: string;
  picture: string; // backend ใช้ picture ไม่ใช่ image
}

/**
 * Fruit interface - ตรงกับ Fruit model ใน backend
 */
interface Fruit {
  id: number;
  name: string;
  description: string;
  picture: string; // backend ใช้ picture ไม่ใช่ image
}

/**
 * FavoriteItem interface - ตรงกับ FavoriteItemResponse ใน backend
 */
interface FavoriteItem {
  id: number;
  user_id: number;
  type: string; // "vegetable" หรือ "fruit"
  item_id: number;
  item_name: string;
  item_description: string;
  item_image_url: string;
  createat: string;
}

/**
 * DisplayItem interface - สำหรับแสดงผลใน UI (รวม vegetables และ fruits)
 */
interface DisplayItem {
  id: number;
  name: string;
  description: string;
  picture: string;
  type: 'vegetable' | 'fruit';
  isFavorite: boolean;
}

// ===== COMPONENT =====
const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();
  
  // ===== STATE MANAGEMENT =====
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  
  // ===== CONFIGURATION =====
  const API_BASE_URL = 'http://10.5.50.45:8000'; // เปลี่ยนเป็น IP ของ backend
  const CURRENT_USER_ID = 1; // ในแอพจริงควรได้จาก authentication system

  // ===== LIFECYCLE =====
  /**
   * useEffect - เรียกข้อมูลทั้งหมดเมื่อ component mount
   */
  useEffect(() => {
    fetchAllData();
  }, []);

  // ===== LOGOUT FUNCTIONS =====
  
  /**
   * openLogoutModal - เปิด modal ยืนยัน logout
   */
  const openLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  /**
   * closeLogoutModal - ปิด modal ยืนยัน logout
   */
  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  /**
   * handleLogout - ทำการ logout จริง
   * ในแอพจริงควรจะ:
   * - Clear AsyncStorage/SecureStore
   * - Clear authentication token
   * - Reset navigation stack ไปหน้า Login
   */
  const handleLogout = () => {
    console.log('User logged out');
    setLogoutModalVisible(false);
    
    // TODO: ในแอพจริงควรทำดังนี้
    // await AsyncStorage.clear();
    // await AsyncStorage.removeItem('userToken');
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }],
    // });
    
    Alert.alert(
      'Logged Out',
      'You have been successfully logged out.',
      [
        {
          text: 'OK',
          onPress: () => console.log('Logout confirmed')
        }
      ]
    );
  };

  // ===== API FUNCTIONS =====
  
  /**
   * fetchAllData - ดึงข้อมูลทั้งหมด (vegetables, fruits, favorites) แบบ parallel
   * ใช้ Promise.all เพื่อเรียก API พร้อมกันทั้ง 3 endpoints
   */
  const fetchAllData = async () => {
    try {
      setLoading(true);
      console.log('Fetching data from:', API_BASE_URL);
      
      // เรียก API 3 ตัวพร้อมกัน เพื่อประหยัดเวลา
      await Promise.all([
        fetchVegetables(),
        fetchFruits(), 
        fetchFavorites()
      ]);
      
      console.log('All data fetched successfully');
    } catch (error) {
      console.error('Error fetching all data:', error);
      Alert.alert(
        'Connection Error',
        `Failed to load data from server.\n\nPlease check:\n1. Backend is running on ${API_BASE_URL}\n2. Network connection is stable\n3. CORS is configured\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`,
        [{ text: 'Retry', onPress: fetchAllData }]
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * fetchVegetables - ดึงข้อมูลผักทั้งหมดจาก backend
   * Endpoint: GET /vegetables
   */
  const fetchVegetables = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vegetables`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch vegetables: ${errorText}`);
      }
      
      const data: Vegetable[] = await response.json();
      setVegetables(data);
      console.log('Vegetables loaded:', data.length, data);
    } catch (error) {
      console.error('Error fetching vegetables:', error);
      throw error; // throw เพื่อให้ fetchAllData จัดการ error
    }
  };

  /**
   * fetchFruits - ดึงข้อมูลผลไม้ทั้งหมดจาก backend
   * Endpoint: GET /fruits
   */
  const fetchFruits = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fruits`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch fruits: ${errorText}`);
      }
      
      const data: Fruit[] = await response.json();
      setFruits(data);
      console.log('Fruits loaded:', data.length, data);
    } catch (error) {
      console.error('Error fetching fruits:', error);
      throw error; // throw เพื่อให้ fetchAllData จัดการ error
    }
  };

  /**
   * fetchFavorites - ดึงรายการโปรดของ user จาก backend
   * Endpoint: GET /favorites?user_id={id}
   * ไม่ throw error ถ้า fail เพราะ favorites ไม่จำเป็นต้องมี
   */
  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites?user_id=${CURRENT_USER_ID}`);
      if (!response.ok) {
        // ถ้า favorites ไม่มี หรือ error ก็ไม่เป็นไร ให้เป็น empty array
        setFavorites([]);
        return;
      }
      
      const data: FavoriteItem[] = await response.json();
      setFavorites(data);
      console.log('Favorites loaded:', data.length);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      // ไม่ throw error เพราะ favorites ไม่จำเป็นต้องมี
      setFavorites([]);
    }
  };

  /**
   * toggleFavorite - เพิ่มหรือลบรายการโปรด
   * Endpoint: POST /favorite/toggle
   * 
   * @param itemId - ID ของ vegetable หรือ fruit
   * @param itemType - ประเภท "vegetable" หรือ "fruit"
   * 
   * Backend จะตรวจสอบว่ามีรายการนี้ใน favorites แล้วหรือไม่
   * - ถ้ามีแล้ว จะลบออก (unfavorite) และ return { message: "Unfavorite Success" }
   * - ถ้ายังไม่มี จะเพิ่มเข้าไป (favorite) และ return FavoriteResponse object
   */
  const toggleFavorite = async (itemId: number, itemType: 'vegetable' | 'fruit') => {
    try {
      // สร้าง request body ตาม backend FavoriteCreate model
      const requestBody = {
        user_id: CURRENT_USER_ID,
        vegetable_id: itemType === 'vegetable' ? itemId : null,
        fruit_id: itemType === 'fruit' ? itemId : null,
      };

      console.log('Toggle favorite request:', requestBody);

      // เรียก API /favorite/toggle
      const response = await fetch(`${API_BASE_URL}/favorite/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }

      const responseData = await response.json();
      
      // ตรวจสอบ response type
      // - ถ้า unfavorite จะได้ { message: "Unfavorite Success" }
      // - ถ้า favorite จะได้ FavoriteResponse object
      if (response.status === 200 && responseData.message) {
        // Unfavorite case - ลบออกจาก state
        console.log('Item unfavorited');
        setFavorites(prev => prev.filter(fav => 
          !(fav.type === itemType && fav.item_id === itemId)
        ));
      } else {
        // Favorite case - refresh favorites เพื่อให้ได้ข้อมูลล่าสุด
        console.log('Item favorited');
        await fetchFavorites();
      }

    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorite. Please try again.');
    }
  };

  // ======================= NAVIGATION FUNCTIONS ===============================
  
  /**
   * handleCardPress - เปิดหน้า Detail เมื่อกด card
   * 
   * @param item - ข้อมูลของ item ที่จะแสดง
   * 
   * ส่งข้อมูลทั้งหมดไปหน้า Detail screen ผ่าน navigation params
   */
  const handleCardPress = (item: DisplayItem) => {
    console.log('Opening detail for:', item.name);
    
    // Navigate ไปหน้า DetailScreen และส่ง params
    navigation.navigate('Detail' as never, {
      itemId: item.id,
      itemType: item.type,
      itemName: item.name,
      itemDescription: item.description,
      itemPicture: item.picture,
      isFavorite: item.isFavorite,
      userId: CURRENT_USER_ID,
    } as never);
  };

  // ===== HELPER FUNCTIONS =====
  
  /**
   * getCombinedItems - รวมข้อมูล vegetables และ fruits เข้าด้วยกัน
   * และเพิ่ม property isFavorite เพื่อบอกว่า item นี้ favorite หรือไม่
   * 
   * @returns Array ของ DisplayItem ที่รวม vegetables และ fruits
   */
  const getCombinedItems = (): DisplayItem[] => {
    const combinedItems: DisplayItem[] = [];

    // เพิ่ม vegetables และเช็คว่าอยู่ใน favorites หรือไม่
    vegetables.forEach(veg => {
      const isFavorite = favorites.some(fav => 
        fav.type === 'vegetable' && fav.item_id === veg.id
      );
      
      combinedItems.push({
        id: veg.id,
        name: veg.name,
        description: veg.description,
        picture: veg.picture,
        type: 'vegetable',
        isFavorite
      });
    });

    // เพิ่ม fruits และเช็คว่าอยู่ใน favorites หรือไม่
    fruits.forEach(fruit => {
      const isFavorite = favorites.some(fav => 
        fav.type === 'fruit' && fav.item_id === fruit.id
      );
      
      combinedItems.push({
        id: fruit.id,
        name: fruit.name,
        description: fruit.description,
        picture: fruit.picture,
        type: 'fruit',
        isFavorite
      });
    });

    return combinedItems;
  };

  /**
   * getItemEmoji - แปลง picture เป็น emoji สำหรับแสดงผล
   * 
   * @param item - ข้อมูล item
   * @returns emoji string หรือ placeholder
   * 
   * Logic:
   * 1. ถ้า picture เป็น emoji (ไม่ใช่ URL) ให้ใช้เลย
   * 2. ถ้า picture เป็น URL ให้แสดง placeholder emoji
   * 3. ถ้าไม่มี picture ให้สุ่ม emoji ตาม type และ id
   */
  const getItemEmoji = (item: DisplayItem): string => {
    // ถ้า picture เป็น emoji ให้ใช้เลย
    if (item.picture && !item.picture.startsWith('http')) {
      return item.picture;
    }
    
    // ถ้ามี picture URL ให้แสดงเป็น placeholder emoji
    if (item.picture && item.picture.startsWith('http')) {
      return '🖼️';
    }
    
    // Default emoji based on type - ใช้ id เป็น seed สำหรับสุ่ม
    if (item.type === 'vegetable') {
      const vegEmojis = ['🥕', '🥦', '🌽', '🍅', '🥬', '🌶️', '🫑', '🥒', '🧄', '🧅'];
      return vegEmojis[item.id % vegEmojis.length];
    } else {
      const fruitEmojis = ['🍎', '🍊', '🍌', '🍇', '🍓', '🥝', '🍑', '🍒', '🥭', '🍍'];
      return fruitEmojis[item.id % fruitEmojis.length];
    }
  };

  // ===== RENDER FUNCTIONS =====
  
  /**
   * renderItemCard - แสดง card ของแต่ละ item
   * 
   * @param item - ข้อมูล item ที่จะแสดง
   * @returns JSX Element ของ card
   * 
   * Card ประกอบด้วย:
   * - Image/Emoji ด้านซ้าย
   * - ข้อมูล (name, description, type) ตรงกลาง
   * - Favorite button ด้านขวา
   * - กดที่ card จะเปิดหน้า Detail
   */
  const renderItemCard = (item: DisplayItem) => (
    <TouchableOpacity
      key={`${item.type}-${item.id}`}
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => handleCardPress(item)}
    >
      <View style={styles.cardContent}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Text style={styles.itemEmoji}>{getItemEmoji(item)}</Text>
        </View>
        
        {/* Text Container */}
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>
            {item.description || 'No description'}
          </Text>
          <View style={styles.typeContainer}>
            <Text style={styles.itemType}>
              {item.type === 'vegetable' ? '🥬 Vegetable' : '🍎 Fruit'}
            </Text>
            <Text style={styles.itemId}>ID: {item.id}</Text>
          </View>
        </View>
        
        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id, item.type)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.heartIcon,
            item.isFavorite && styles.heartIconFilled
          ]}>
            <Text style={styles.heartText}>
              {item.isFavorite ? '❤️' : '🤍'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // ===== COMPUTED VALUES =====
  const combinedItems = getCombinedItems();
  const vegetableCount = vegetables.length;
  const fruitCount = fruits.length;
  const favoriteCount = favorites.length;

  // ===== LOADING STATE =====
  /**
   * แสดง loading screen ขณะที่กำลังดึงข้อมูล
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#7ED321" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7ED321" />
          <Text style={styles.loadingText}>Loading Vegetable and Fruit...</Text>
          <Text style={styles.loadingSubtext}>Dowloading data from server...</Text>
        </View>
        <Tabbar />
      </SafeAreaView>
    );
  }

  // ===== MAIN RENDER =====
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7ED321" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>ผักและผลไม้</Text>
          <Text style={styles.headerSubtitle}>User ID: {CURRENT_USER_ID}</Text>
        </View>
        
        {/* Header Buttons - Refresh และ Logout */}
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.refreshButton} onPress={fetchAllData}>
            <Text style={styles.refreshText}>🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={openLogoutModal}>
            <Text style={styles.logoutText}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Stats Container - แสดงสถิติข้อมูล */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{vegetableCount}</Text>
            <Text style={styles.statLabel}>Vegetables</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{fruitCount}</Text>
            <Text style={styles.statLabel}>Fruits</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favoriteCount}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchAllData} />}
        >
          {combinedItems.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>All Items ({combinedItems.length})</Text>
              <Text style={styles.tapHint}>Tap any card to view details</Text>
              {combinedItems.map(renderItemCard)}
            </>
          ) : (
            // Empty State - แสดงเมื่อไม่มีข้อมูล
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>📦</Text>
              <Text style={styles.emptyText}>No items available</Text>
              <Text style={styles.emptySubtext}>
                No vegetables or fruits found in the database
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchAllData}>
                <Text style={styles.retryButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Logout Modal */}
      <LogoutModal
        visible={logoutModalVisible}
        onClose={closeLogoutModal}
        onLogout={handleLogout}
      />

      {/* Tab Bar */}
      <Tabbar />
    </SafeAreaView>
  );
};

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ED321',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  refreshButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 22,
  },
  logoutButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 22,
  },
  refreshText: {
    fontSize: 22,
  },
  logoutText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#E8F5E8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7ED321',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  tapHint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#7ED321',
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemEmoji: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 6,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemType: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  itemId: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.6,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  heartIconFilled: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  heartText: {
    fontSize: 24,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#7ED321',
    fontWeight: '600',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#7ED321',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;