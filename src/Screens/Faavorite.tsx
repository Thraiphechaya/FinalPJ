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
import { MaterialIcons } from '@expo/vector-icons';
import Tabbar from '../Component/Tabbar';
import { NavigationContainer } from '@react-navigation/native';

interface FavoriteItem {
  id: string;
  name: string;
  description: string;
  image: string | null;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

const FavoriteScreen: React.FC = () => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // กำหนด BASE_URL ของ FastAPI
  const BASE_URL = 'http://localhost:8000'; // เปลี่ยนตาม server ของคุณ
  // สำหรับ iOS Simulator: 'http://localhost:8000'
  // สำหรับ Android Emulator: 'http://10.0.2.2:8000'
  // สำหรับ Expo: 'http://192.168.1.xxx:8000' (IP ของเครื่อง)

  // ดึงข้อมูล favorites จาก backend
  const fetchFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${BASE_URL}/api/favorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // ถ้ามี authentication
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<FavoriteItem[]> = await response.json();
      
      if (result.status === 'success') {
        setFavoriteItems(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch favorites');
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // เพิ่มรายการไปยัง favorites
  const addToFavorites = async (itemId: string) => {
    try {
      setError(null);
      
      const response = await fetch(`${BASE_URL}/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ item_id: itemId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<FavoriteItem> = await response.json();
      
      if (result.status === 'success') {
        // เพิ่มรายการใหม่เข้าไปใน state
        setFavoriteItems(prev => [...prev, result.data]);
        Alert.alert('Success', 'Item added to favorites!');
      } else {
        throw new Error(result.message || 'Failed to add favorite');
      }
    } catch (err) {
      console.error('Error adding favorite:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to add favorite');
    }
  };

  // ลบรายการจาก favorites
  const removeFromFavorites = async (itemId: string) => {
    try {
      setError(null);
      
      const response = await fetch(`${BASE_URL}/api/favorites/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<null> = await response.json();
      
      if (result.status === 'success') {
        // ลบรายการออกจาก state
        setFavoriteItems(prev => prev.filter(item => item.id !== itemId));
        Alert.alert('Success', 'Item removed from favorites!');
      } else {
        throw new Error(result.message || 'Failed to remove favorite');
      }
    } catch (err) {
      console.error('Error removing favorite:', err);
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
    console.log('Back pressed');
  };

  const handleHeartPress = (itemId: string) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this item from your favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromFavorites(itemId),
        },
      ]
    );
  };

  const handleItemPress = (item: FavoriteItem) => {
    console.log('Item pressed:', item.name);
    // Navigate to detail screen
  };

  const renderFavoriteItem = (item: FavoriteItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.favoriteItem}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.itemImageContainer}>
        {item.image ? (
          <Image 
            source={{ uri: `${BASE_URL}${item.image}` }} 
            style={styles.itemImage} 
            onError={(error) => console.log('Image load error:', error)}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialIcons name="image" size={24} color="#ccc" />
          </View>
        )}
      </View>
      
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        {item.created_at && (
          <Text style={styles.dateText}>
            Added: {new Date(item.created_at).toLocaleDateString()}
          </Text>
        )}
      </View>
      
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => handleHeartPress(item.id)}
      >
        <MaterialIcons name="favorite" size={24} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <MaterialIcons name="favorite-border" size={64} color="#666" />
      <Text style={styles.emptyStateTitle}>No favorites yet</Text>
      <Text style={styles.emptyStateDescription}>
        Tap the heart icon on items to add them to your favorites
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
      <MaterialIcons name="error-outline" size={64} color="#EF4444" />
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
          <ActivityIndicator size="large" color="#4ADE80" />
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
      <StatusBar barStyle="dark-content" backgroundColor="#4ADE80" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Favorites ({favoriteItems.length})
        </Text>
        <TouchableOpacity 
          style={styles.refreshHeaderButton} 
          onPress={fetchFavorites}
        >
          <MaterialIcons name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
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
    backgroundColor: '#4ADE80',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    color: '#000',
  },
  content: {
    flex: 1,
  },
  favoriteList: {
    padding: 16,
    gap: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#86EFAC',
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
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  heartButton: {
    padding: 8,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#4ADE80',
    fontWeight: '600',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
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
    color: '#666',
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
    paddingVertical: 64,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});

export default FavoriteScreen;