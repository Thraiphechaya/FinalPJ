import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Tabbar from '../Component/Tabbar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { supabase } from '../lib/supabase';

// ===== TYPE DEFINITIONS =====
interface FavoriteItem {
  id: number;
  users_id: number;
  vegetable_id?: number;
  fruit_id?: number;
  createat: string;
}

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

interface DisplayFavoriteItem {
  id: number;
  name: string;
  description?: string;
  picture?: string;
  type: 'vegetable' | 'fruit';
  created: string;
}

// ===== NAVIGATION TYPE =====
type FavoriteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Favorite'>;

const FavoriteScreen: React.FC = () => {
  const navigation = useNavigation<FavoriteScreenNavigationProp>();
  const [favoriteItems, setFavoriteItems] = useState<DisplayFavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const CURRENT_USER_ID = 1;

  const fetchFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching favorites from Supabase...');
      
      // ดึงข้อมูล favorites
      const { data: favorites, error } = await supabase
        .from('favorite')
        .select('*')
        .eq('users_id', CURRENT_USER_ID)
        .order('createat', { ascending: false });

      if (error) {
        throw error;
      }

      console.log('Raw favorites from Supabase:', favorites);

      // ถ้าไม่มี favorites
      if (!favorites || favorites.length === 0) {
        setFavoriteItems([]);
        return;
      }

      // ดึงข้อมูลผักและผลไม้จาก favorites
      const formattedFavorites: DisplayFavoriteItem[] = [];

      for (const fav of favorites) {
        if (fav.vegetable_id) {
          // ดึงข้อมูลผัก
          const { data: vegetable, error: vegError } = await supabase
            .from('vegetable')
            .select('*')
            .eq('id', fav.vegetable_id)
            .single();

          if (vegError) {
            console.error('Error fetching vegetable:', vegError);
            continue;
          }

          if (vegetable) {
            formattedFavorites.push({
              id: vegetable.id,
              name: vegetable.name || 'Unknown Vegetable',
              description: vegetable.description,
              picture: vegetable.picture,
              type: 'vegetable',
              created: fav.createat
            });
          }
        } 
        
        if (fav.fruit_id) {
          // ดึงข้อมูลผลไม้
          const { data: fruit, error: fruitError } = await supabase
            .from('fruit')
            .select('*')
            .eq('id', fav.fruit_id)
            .single();

          if (fruitError) {
            console.error('Error fetching fruit:', fruitError);
            continue;
          }

          if (fruit) {
            formattedFavorites.push({
              id: fruit.id,
              name: fruit.name || 'Unknown Fruit',
              description: fruit.description,
              picture: fruit.picture,
              type: 'fruit',
              created: fav.createat
            });
          }
        }
      }

      console.log('Formatted favorites:', formattedFavorites);
      setFavoriteItems(formattedFavorites);
      
    } catch (err) {
      console.error('Error fetching favorites from Supabase:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setFavoriteItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ลบรายการโปรด
  const removeFromFavorites = async (itemId: number, itemType: 'vegetable' | 'fruit') => {
    try {
      setError(null);
      
      console.log('Removing favorite from Supabase:', { itemId, itemType });

      // ค้นหา favorite ที่ต้องการลบ
      const { data: existingFavorites, error: findError } = await supabase
        .from('favorite')
        .select('id')
        .eq('users_id', CURRENT_USER_ID)
        .eq(itemType === 'vegetable' ? 'vegetable_id' : 'fruit_id', itemId);

      if (findError) {
        throw findError;
      }

      if (!existingFavorites || existingFavorites.length === 0) {
        throw new Error('Favorite item not found');
      }

      // ลบ favorite
      const { error: deleteError } = await supabase
        .from('favorite')
        .delete()
        .eq('id', existingFavorites[0].id);

      if (deleteError) {
        throw deleteError;
      }

      // ลบรายการออกจาก state
      setFavoriteItems(prev => prev.filter(item => item.id !== itemId));
      Alert.alert('Success', 'Item removed from favorites!');
      
    } catch (err) {
      console.error('Error removing favorite from Supabase:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to remove favorite');
    }
  };

  // โหลดข้อมูลเมื่อ component mount
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchFavorites();
    setIsRefreshing(false);
  }, [fetchFavorites]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHeartPress = (item: DisplayFavoriteItem) => {
    Alert.alert(
      'Remove from Favorites',
      `Are you sure you want to remove ${item.name} from your favorites?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromFavorites(item.id, item.type),
        },
      ]
    );
  };

  const handleItemPress = (item: DisplayFavoriteItem) => {
    console.log('Item pressed:', item.name);
    
    navigation.navigate('Detail', {
      itemId: item.id,
      itemType: item.type,
      itemName: item.name,
      itemDescription: item.description || 'No description available',
      itemPicture: item.picture || '',
      isFavorite: true,
      userId: CURRENT_USER_ID,
    });
  };

  const getItemEmoji = (item: DisplayFavoriteItem): string => {
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

  const renderFavoriteItem = (item: DisplayFavoriteItem) => (
    <TouchableOpacity
      key={`${item.type}-${item.id}`}
      style={styles.favoriteItem}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.itemImageContainer}>
        {item.picture && item.picture.startsWith('http') ? (
          <Image 
            source={{ uri: item.picture }} 
            style={styles.itemImage}
            resizeMode="cover"
            onError={() => console.log('Image load error for:', item.name)}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderEmoji}>{getItemEmoji(item)}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description || 'No description available'}
        </Text>
        <View style={styles.typeContainer}>
          <Text style={[
            styles.typeText,
            item.type === 'vegetable' ? styles.vegetableType : styles.fruitType
          ]}>
            {item.type === 'vegetable' ? '🥬 Vegetable' : '🍎 Fruit'}
          </Text>
        </View>
        {item.created && (
          <Text style={styles.dateText}>
            Added: {new Date(item.created).toLocaleDateString()}
          </Text>
        )}
      </View>
      
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => handleHeartPress(item)}
      >
        <Ionicons name="heart" size={24} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Ionicons name="heart-outline" size={64} color="#666" />
      <Text style={styles.emptyStateTitle}>ยังไม่มีรายการที่ชื่นชอบ😑</Text>
      <Text style={styles.emptyStateDescription}>
        สามารถเพิ่มรายการที่ชอบ ด้วยการกดหัวใจในผักหรือผลไม้ที่ชอบได้เลย🍀
      </Text>
      <TouchableOpacity 
        style={styles.refreshButton} 
        onPress={fetchFavorites}
      >
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Ionicons name="warning-outline" size={64} color="#EF4444" />
      <Text style={styles.errorTitle}>Error Loading Favorites</Text>
      <Text style={styles.errorDescription}>{error}</Text>
      <TouchableOpacity 
        style={styles.retryButton} 
        onPress={fetchFavorites}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (isLoading && favoriteItems.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={styles.loadingText}>Loading favorites...</Text>
        </View>
      );
    }

    if (error && favoriteItems.length === 0) {
      return renderError();
    }

    if (favoriteItems.length === 0) {
      return renderEmptyState();
    }

    return favoriteItems.map(renderFavoriteItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#10B981" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Favorites ({favoriteItems.length})
        </Text>
        <TouchableOpacity 
          style={styles.refreshHeaderButton} 
          onPress={fetchFavorites}
        >
          <Ionicons name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing} 
            onRefresh={onRefresh}
            colors={['#10B981']}
            tintColor="#10B981"
          />
        }
      >
        <View style={styles.favoriteList}>
          {renderContent()}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <Tabbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10B981',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#10B981',
  },
  backButton: {
    padding: 8,
  },
  refreshHeaderButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#f9faddff',
  },
  favoriteList: {
    padding: 16,
    gap: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: '#ECFDF5',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 24,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 18,
  },
  typeContainer: {
    marginBottom: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  vegetableType: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  fruitType: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  dateText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  heartButton: {
    padding: 8,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#EF4444',
    marginTop: 16,
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
});

export default FavoriteScreen;