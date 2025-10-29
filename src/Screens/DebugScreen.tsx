import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  RefreshControl, // ✅ เพิ่ม RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

const DebugScreen: React.FC = () => {
  const [databaseInfo, setDatabaseInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const checkDatabase = async () => {
    try {
      setLoading(true);
      console.log('🔍 Starting database check...');
      
      const results: any = {};

      // 1. เช็คตารางทั้งหมด
      try {
        const { data: tables, error } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')
          .eq('table_type', 'BASE TABLE');

        if (error) {
          console.error('❌ Error checking tables:', error);
          results.tablesError = error.message;
        } else {
          results.tables = tables?.map(t => t.table_name) || [];
          console.log('📊 Tables found:', results.tables);
        }
      } catch (err) {
        console.error('Error in tables query:', err);
        results.tablesError = String(err);
      }

      // 2. เช็คโครงสร้างตาราง favorite
      try {
        const { data: favoriteColumns, error } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable')
          .eq('table_name', 'favorite')
          .eq('table_schema', 'public')
          .order('ordinal_position');

        if (error) {
          console.error('❌ Error checking favorite columns:', error);
          results.favoriteColumnsError = error.message;
        } else {
          results.favoriteColumns = favoriteColumns || [];
          console.log('🎯 Favorite columns:', results.favoriteColumns);
        }
      } catch (err) {
        console.error('Error in favorite columns query:', err);
        results.favoriteColumnsError = String(err);
      }

      // 3. เช็คข้อมูลใน favorite
      try {
        const { data: favoriteData, error } = await supabase
          .from('favorite')
          .select('*')
          .limit(5);

        if (error) {
          console.error('❌ Error checking favorite data:', error);
          results.favoriteDataError = error.message;
        } else {
          results.favoriteData = favoriteData || [];
          if (favoriteData && favoriteData.length > 0) {
            console.log('📝 Favorite sample data:', favoriteData[0]);
            console.log('🔑 Favorite field names:', Object.keys(favoriteData[0]));
          }
        }
      } catch (err) {
        console.error('Error in favorite data query:', err);
        results.favoriteDataError = String(err);
      }

      // 4. เช็คตาราง vegetable
      try {
        const { data: vegData, error } = await supabase
          .from('vegetable')
          .select('*')
          .limit(1);

        if (!error && vegData && vegData.length > 0) {
          results.vegetableFields = Object.keys(vegData[0]);
          console.log('🥬 Vegetable fields:', results.vegetableFields);
        }
      } catch (err) {
        console.error('Error checking vegetable:', err);
      }

      // 5. เช็คตาราง fruit
      try {
        const { data: fruitData, error } = await supabase
          .from('fruit')
          .select('*')
          .limit(1);

        if (!error && fruitData && fruitData.length > 0) {
          results.fruitFields = Object.keys(fruitData[0]);
          console.log('🍎 Fruit fields:', results.fruitFields);
        }
      } catch (err) {
        console.error('Error checking fruit:', err);
      }

      setDatabaseInfo(results);
      console.log('✅ Database check completed');

    } catch (error) {
      console.error('❌ Error in database check:', error);
      Alert.alert('Error', 'Failed to check database');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await checkDatabase();
  };

  useEffect(() => {
    checkDatabase();
  }, []);

  const renderSection = (title: string, content: any, isError = false) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={[styles.sectionContent, isError && styles.errorContent]}>
        {Array.isArray(content) ? (
          content.map((item, index) => (
            <View key={index} style={styles.item}>
              {typeof item === 'object' ? (
                <Text style={styles.itemText}>
                  {JSON.stringify(item, null, 2)}
                </Text>
              ) : (
                <Text style={styles.itemText}>• {item}</Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.itemText}>{String(content)}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#10B981" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Database Debug</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Ionicons 
            name="refresh" 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#10B981']}
            tintColor="#10B981"
          />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={styles.loadingText}>Checking database...</Text>
          </View>
        ) : databaseInfo ? (
          <View style={styles.content}>
            {renderSection('📊 Tables in Database', databaseInfo.tables || [])}
            {databaseInfo.tablesError && 
              renderSection('❌ Tables Error', databaseInfo.tablesError, true)
            }

            {renderSection('🎯 Favorite Table Structure', databaseInfo.favoriteColumns || [])}
            {databaseInfo.favoriteColumnsError && 
              renderSection('❌ Favorite Structure Error', databaseInfo.favoriteColumnsError, true)
            }

            {renderSection('📝 Favorite Data (First 5 rows)', databaseInfo.favoriteData || [])}
            {databaseInfo.favoriteDataError && 
              renderSection('❌ Favorite Data Error', databaseInfo.favoriteDataError, true)
            }

            {databaseInfo.vegetableFields && 
              renderSection('🥬 Vegetable Fields', databaseInfo.vegetableFields)
            }

            {databaseInfo.fruitFields && 
              renderSection('🍎 Fruit Fields', databaseInfo.fruitFields)
            }
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="warning-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No database information</Text>
            <TouchableOpacity style={styles.retryButton} onPress={checkDatabase}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  refreshButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  errorContent: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  item: {
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'monospace',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
  retryButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default DebugScreen;