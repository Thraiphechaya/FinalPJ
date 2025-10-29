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
  TextInput,
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
type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

const { width: screenWidth } = Dimensions.get('window');

// ===== COMPONENT =====
const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<DisplayItem[]>([]);
  
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  
  const CURRENT_USER_ID = 1;

  useEffect(() => {
    fetchAllData();
    startAnimations();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, vegetables, fruits, favorites]);

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
    }
  };

  const fetchVegetables = async () => {
    try {
      const { data, error } = await supabase
        .from('vegetable')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setVegetables(data || []);
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

      if (error) throw error;
      setFruits(data || []);
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

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    }
  };

  const toggleFavorite = async (itemId: number, itemType: 'vegetable' | 'fruit') => {
    try {
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
      } else {
        const insertData: any = {
          users_id: CURRENT_USER_ID,
          createat: new Date().toISOString(),
        };

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
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorite. Please try again.');
      await fetchFavorites();
    }
  };

  // ===== SEARCH FUNCTIONS =====
  const filterItems = () => {
    if (!searchQuery.trim()) {
      setFilteredItems([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    const allItems: DisplayItem[] = [];

    // Add vegetables
    vegetables.forEach(veg => {
      const isFavorite = favorites.some(fav => fav.vegetable_id === veg.id);
      allItems.push({
        id: veg.id,
        name: veg.name,
        description: veg.description,
        picture: veg.picture,
        type: 'vegetable',
        isFavorite,
        createat: veg.createat
      });
    });

    // Add fruits
    fruits.forEach(fruit => {
      const isFavorite = favorites.some(fav => fav.fruit_id === fruit.id);
      allItems.push({
        id: fruit.id,
        name: fruit.name,
        description: fruit.description,
        picture: fruit.picture,
        type: 'fruit',
        isFavorite,
        createat: fruit.createat
      });
    });

    // Filter items based on search query
    const filtered = allItems.filter(item => 
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      item.type.toLowerCase().includes(query)
    );

    setFilteredItems(filtered);
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

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  // ===== HELPER FUNCTIONS =====
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

  const clearSearch = () => {
    setSearchQuery('');
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
          
          {/* ✅ ปุ่มหัวใจเหมือนหน้า Home */}
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

  const renderSearchHeader = () => (
    <Animated.View 
      style={[
        styles.searchHeader,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vegetables, fruits..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.filterButton} onPress={fetchAllData}>
          <Ionicons name="refresh" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {searchQuery.length > 0 && (
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {filteredItems.length} results for "{searchQuery}"
          </Text>
        </View>
      )}
    </Animated.View>
  );

  // ===== LOADING STATE =====
  if (loading) {
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

      

      {/* ✅ Search Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {renderSearchHeader()}

        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {searchQuery.length === 0 ? (
            <Animated.View 
              style={[
                styles.emptyState,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Ionicons name="search-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>Search Vegetables & Fruits</Text>
              <Text style={styles.emptySubtitle}>
                Find items by name, description, or type
              </Text>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>Try searching for:</Text>
                <View style={styles.tipItem}>
                  <Ionicons name="leaf-outline" size={16} color="#10B981" />
                  <Text style={styles.tipText}>"Bell pepper"</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="nutrition-outline" size={16} color="#10B981" />
                  <Text style={styles.tipText}>"Apple"</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="heart-outline" size={16} color="#10B981" />
                  <Text style={styles.tipText}>"Vegetable" or "Fruit"</Text>
                </View>
              </View>
            </Animated.View>
          ) : filteredItems.length > 0 ? (
            <View style={styles.resultsContainer}>
              <Text style={styles.sectionTitle}>
                Search Results ({filteredItems.length})
              </Text>
              {filteredItems.map((item, index) => renderItemCard(item, index))}
            </View>
          ) : (
            <Animated.View 
              style={[
                styles.emptyState,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Ionicons name="search-circle-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptySubtitle}>
                No items found for "{searchQuery}". Try different keywords.
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={clearSearch}>
                <Ionicons name="backspace-outline" size={18} color="#fff" />
                <Text style={styles.retryButtonText}>Clear Search</Text>
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
  profileButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
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
    minHeight: 500,
  },
  // Search Header Styles
  searchHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fbfce6ff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsInfo: {
    marginTop: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  // Card Styles (เหมือนหน้า Home)
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
    backgroundColor: '#7cf800c5',
  },
  favoriteButtonActive: {
    backgroundColor: '#FEE2E2',
  },
  // Results Container
  resultsContainer: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'System',
  },
  // Empty States
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'System',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  tipsContainer: {
    marginTop: 24,
    alignItems: 'flex-start',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
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
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'System',
    marginLeft: 8,
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
});

export default SearchScreen;