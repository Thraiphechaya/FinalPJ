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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Tabbar from '../Component/Tabbar';

interface VegetableItem {
  id: number;
  name: string;
  description: string;
  image: string;
  isFavorite?: boolean;
}

interface FruitItem {
  id: number;
  name: string;
  description: string;
  image: string;
  isFavorite?: boolean;
}

type CombinedItem = (VegetableItem | FruitItem) & { type: 'vegetable' | 'fruit' };

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<CombinedItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual API base URL
  const API_BASE_URL = 'http://10.5.50.45:8000'; // เปลี่ยนเป็น URL ของ backend

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch vegetables and fruits in parallel
      const [vegetablesResponse, fruitsResponse, favoritesResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/vegetables/`),
        fetch(`${API_BASE_URL}/fruits/`),
        fetch(`${API_BASE_URL}/favorites/`)
      ]);

      if (!vegetablesResponse.ok || !fruitsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const vegetables: VegetableItem[] = await vegetablesResponse.json();
      const fruits: FruitItem[] = await fruitsResponse.json();
      
      // Combine vegetables and fruits with type information
      const combinedItems: CombinedItem[] = [
        ...vegetables.map(item => ({ ...item, type: 'vegetable' as const })),
        ...fruits.map(item => ({ ...item, type: 'fruit' as const }))
      ];

      setItems(combinedItems);

      // Handle favorites if the API call succeeds
      if (favoritesResponse.ok) {
        const favoritesData = await favoritesResponse.json();
        const favoriteIds = favoritesData.map((fav: any) => fav.item_id);
        setFavorites(favoriteIds);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert(
        'Error',
        'Failed to load data. Please check your connection and try again.',
        [{ text: 'Retry', onPress: fetchData }]
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: number, type: 'vegetable' | 'fruit') => {
    try {
      const isFavorited = favorites.includes(id);
      
      if (isFavorited) {
        // Remove from favorites
        const response = await fetch(`${API_BASE_URL}/favorites/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setFavorites(prev => prev.filter(fav => fav !== id));
        } else {
          throw new Error('Failed to remove favorite');
        }
      } else {
        // Add to favorites
        const response = await fetch(`${API_BASE_URL}/favorites/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item_id: id,
            item_type: type,
          }),
        });
        
        if (response.ok) {
          setFavorites(prev => [...prev, id]);
        } else {
          throw new Error('Failed to add favorite');
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorite. Please try again.');
    }
  };

  const renderItemCard = (item: CombinedItem) => (
    <View key={`${item.type}-${item.id}`} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Text style={styles.itemEmoji}>{item.image}</Text>
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemType}>
            {item.type === 'vegetable' ? '🥬 Vegetable' : '🍎 Fruit'}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id, item.type)}
        >
          <View style={[
            styles.heartIcon,
            favorites.includes(item.id) && styles.heartIconFilled
          ]}>
            <Text style={[
              styles.heartText,
              favorites.includes(item.id) && styles.heartTextFilled
            ]}>
              ♡
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#7ED321" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7ED321" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
        <Tabbar activeTab="home" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7ED321" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fresh Market</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchData}>
          <Text style={styles.refreshText}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshing={loading}
          onRefresh={fetchData}
        >
          {items.length > 0 ? (
            items.map(renderItemCard)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items found</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Tab Bar */}
      <Tabbar activeTab="home" />
    </SafeAreaView>
  );
};

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
  refreshButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  refreshText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#E8F5E8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#7ED321',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  itemEmoji: {
    fontSize: 32,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 2,
  },
  itemType: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIconFilled: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  heartText: {
    fontSize: 18,
    color: '#fff',
  },
  heartTextFilled: {
    color: '#FF6B6B',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7ED321',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#7ED321',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;