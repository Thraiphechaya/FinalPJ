import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Tabbar from '../Component/Tabbar';
import { useNavigation } from '@react-navigation/native';

interface SearchItem {
  id: string;
  name: string;
  description: string;
  image: string | null;
  is_favorited: boolean;
  created_at: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // กำหนด BASE_URL ของ FastAPI
  const BASE_URL = 'http://localhost:8000'; // เปลี่ยนตาม server ของคุณ

  // ดึงข้อมูลทั้งหมดเมื่อเริ่มต้น
  const fetchAllItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${BASE_URL}/api/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<SearchItem[]> = await response.json();
      
      if (result.status === 'success') {
        setAllItems(result.data);
        // แสดงข้อมูลทั้งหมดตอนเริ่มต้น
        setSearchResults(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch items');
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ค้นหาจาก backend
  const searchFromBackend = useCallback(async (query: string) => {
    try {
      setIsSearching(true);
      setError(null);
      
      const response = await fetch(`${BASE_URL}/api/items/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<SearchItem[]> = await response.json();
      
      if (result.status === 'success') {
        setSearchResults(result.data);
      } else {
        throw new Error(result.message || 'Failed to search items');
      }
    } catch (err) {
      console.error('Error searching items:', err);
      // ถ้าไม่มี search endpoint ให้ใช้ local search
      performLocalSearch(query);
    } finally {
      setIsSearching(false);
    }
  }, [allItems]);

  // ค้นหาในข้อมูลที่โหลดมาแล้ว (fallback)
  const performLocalSearch = useCallback((query: string) => {
    if (query.trim() === '') {
      setSearchResults(allItems);
      return;
    }

    const filtered = allItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  }, [allItems]);

  // จัดการการค้นหา
  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
    
    if (text.trim() === '') {
      setSearchResults(allItems);
      return;
    }

    // Debounce search
    const searchTimeout = setTimeout(() => {
      // ลองค้นหาจาก backend ก่อน
      searchFromBackend(text);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [allItems, searchFromBackend]);

  // Toggle favorite
  const handleHeartPress = async (itemId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/items/${itemId}/toggle-favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<{is_favorited: boolean}> = await response.json();
      
      if (result.status === 'success') {
        // อัพเดต state
        const updateItems = (items: SearchItem[]) =>
          items.map(item =>
            item.id === itemId
              ? { ...item, is_favorited: result.data.is_favorited }
              : item
          );

        setSearchResults(updateItems);
        setAllItems(updateItems);

        Alert.alert(
          'Success',
          result.data.is_favorited ? 'Added to favorites!' : 'Removed from favorites!'
        );
      } else {
        throw new Error(result.message || 'Failed to update favorite');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      Alert.alert('Error', 'Failed to update favorite status');
    }
  };

  const handleBackPress = () => {
    console.log('Back pressed');
  };

  const handleItemPress = (item: SearchItem) => {
    console.log('Item pressed:', item.name);
    // Navigate to detail screen
  };

  // โหลดข้อมูลเมื่อ component mount
  useEffect(() => {
    fetchAllItems();
  }, [fetchAllItems]);

  const renderSearchItem = (item: SearchItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.searchItem}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.itemImageContainer}>
        {item.image ? (
          <Image 
            source={{ uri: `${BASE_URL}${item.image}` }} 
            style={styles.itemImage} 
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
      </View>
      
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => handleHeartPress(item.id)}
      >
        <MaterialIcons 
          name={item.is_favorited ? "favorite" : "favorite-border"} 
          size={24} 
          color={item.is_favorited ? "#EF4444" : "#22C55E"} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (searchText.trim() === '') {
      return (
        <View style={styles.emptyStateContainer}>
          <MaterialIcons name="search" size={64} color="#666" />
          <Text style={styles.emptyStateTitle}>Start Searching</Text>
          <Text style={styles.emptyStateDescription}>
            Type something to search for items
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyStateContainer}>
        <MaterialIcons name="search-off" size={64} color="#666" />
        <Text style={styles.emptyStateTitle}>No Results Found</Text>
        <Text style={styles.emptyStateDescription}>
          No items match your search "{searchText}"
        </Text>
      </View>
    );
  };

  const renderError = () => (
    <View style={styles.errorContainer}>
      <MaterialIcons name="error-outline" size={64} color="#EF4444" />
      <Text style={styles.errorTitle}>Error Loading Items</Text>
      <Text style={styles.errorDescription}>{error}</Text>
      <TouchableOpacity 
        style={styles.retryButton} 
        onPress={fetchAllItems}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ADE80" />
          <Text style={styles.loadingText}>Loading items...</Text>
        </View>
      );
    }

    if (error) {
      return renderError();
    }

    if (searchResults.length === 0) {
      return renderEmptyState();
    }

    return searchResults.map(renderSearchItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#4ADE80" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search🔍</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearch}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {isSearching && (
            <ActivityIndicator size="small" color="#4ADE80" style={styles.searchLoader} />
          )}
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchText('');
                setSearchResults(allItems);
              }}
              style={styles.clearButton}
            >
              <MaterialIcons name="clear" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Count */}
      {searchText.length > 0 && !isLoading && !error && (
        <View style={styles.resultsCount}>
          <Text style={styles.resultsCountText}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchText}"
          </Text>
        </View>
      )}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchResults}>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchLoader: {
    marginLeft: 8,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  resultsCount: {
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  resultsCountText: {
    fontSize: 14,
    color: '#000',
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  searchResults: {
    padding: 16,
    gap: 16,
  },
  searchItem: {
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

export default SearchScreen;