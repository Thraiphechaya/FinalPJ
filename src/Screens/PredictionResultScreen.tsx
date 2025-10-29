import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type PredictionResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PredictionResult'>;
type PredictionResultScreenRouteProp = RouteProp<RootStackParamList, 'PredictionResult'>;

// ตาม structure จริงจาก AI Model
interface AIPrediction {
  class: string;
  confidence: number;
}

interface PredictionResponse {
  predictions?: AIPrediction[]; // อาจมีหรือไม่มี predictions array
  class?: string;               // หรืออาจส่งมาแบบนี้
  confidence?: number;          // หรืออาจส่งมาแบบนี้
}

// ข้อมูลที่ใช้แสดงใน UI
interface DisplayItem {
  id: number;
  name: string;
  type: 'fruit' | 'vegetable';
  confidence: number;
  description: string;
  picture: string;
}

const PredictionResultScreen: React.FC = () => {
  const navigation = useNavigation<PredictionResultScreenNavigationProp>();
  const route = useRoute<PredictionResultScreenRouteProp>();
  
  const { prediction, imageUri } = route.params;

  // ฟังก์ชันแปลงข้อมูลจาก AI → Display Item
  const transformAIPredictionToDisplayItem = (aiPrediction: AIPrediction): DisplayItem => {
    //  mapping จากชื่อ class → ข้อมูลแสดงผล
    const itemMapping: { [key: string]: Omit<DisplayItem, 'id' | 'confidence'> } = {
      'apple': {
        name: 'แอปเปิ้ล',
        type: 'fruit',
        description: 'ผลไม้รสหวานกรอบ อุดมด้วยวิตามินซี',
        picture: 'https://example.com/apple.jpg',
      },
      'banana': {
        name: 'กล้วย',
        type: 'fruit', 
        description: 'ผลไม้ให้พลังงานสูง อุดมด้วยโพแทสเซียม',
        picture: 'https://example.com/banana.jpg',
      },
      'orange': {
        name: 'ส้ม',
        type: 'fruit',
        description: 'ผลไม้รสเปรี้ยวหวาน อุดมด้วยวิตามินซี',
        picture: 'https://example.com/orange.jpg',
      },
      'carrot': {
        name: 'แครอท',
        type: 'vegetable',
        description: 'ผักสีส้ม อุดมด้วยวิตามินเอ',
        picture: 'https://example.com/carrot.jpg',
      },
      'broccoli': {
        name: 'บรอกโคลี',
        type: 'vegetable',
        description: 'ผักสีเขียว อุดมด้วยไฟเบอร์และวิตามิน',
        picture: 'https://example.com/broccoli.jpg',
      },
      'tomato': {
        name: 'มะเขือเทศ',
        type: 'vegetable',
        description: 'ผลไม้รสเปรี้ยวอมหวาน ใช้ทำอาหารได้หลายเมนู',
        picture: 'https://example.com/tomato.jpg',
      },
      // เพิ่ม mapping อื่นๆ ตามที่ model รองรับ
    };

    const mappedItem = itemMapping[aiPrediction.class.toLowerCase()] || {
      name: aiPrediction.class,
      type: 'fruit', // default เป็นผลไม้
      description: 'กำลังพัฒนาข้อมูล...',
      picture: '',
    };

    return {
      id: Math.random(), // หรือใช้ hash ของชื่อ
      confidence: aiPrediction.confidence,
      ...mappedItem
    };
  };

  const handleSelectItem = (item: DisplayItem) => {
    navigation.navigate('Detail', {
      itemId: item.id,
      itemType: item.type,
      itemName: item.name,
      itemDescription: item.description,
      itemPicture: item.picture,
      isFavorite: false,
      userId: 1,
    });
  };

  const handleRetakePhoto = () => {
    navigation.goBack();
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.8) return '#4CAF50';
    if (confidence >= 0.6) return '#FF9800';
    if (confidence >= 0.4) return '#FFC107';
    return '#F44336';
  };

  const getConfidenceText = (confidence: number): string => {
    if (confidence >= 0.8) return 'ความมั่นใจสูงมาก';
    if (confidence >= 0.6) return 'ความมั่นใจสูง';
    if (confidence >= 0.4) return 'ความมั่นใจปานกลาง';
    return 'ความมั่นใจต่ำ';
  };

  // แปลงและเรียงลำดับ predictions
  const getDisplayItems = (): DisplayItem[] => {
    if (!prediction) return [];

    // กรณี 1: มี predictions array
    if (prediction.predictions && Array.isArray(prediction.predictions)) {
      return prediction.predictions
        .map(transformAIPredictionToDisplayItem)
        .sort((a: DisplayItem, b: DisplayItem) => b.confidence - a.confidence);
    }

    // กรณี 2: มี class และ confidence โดยตรง
    if (prediction.class && prediction.confidence !== undefined) {
      const singleItem = transformAIPredictionToDisplayItem({
        class: prediction.class,
        confidence: prediction.confidence
      });
      return [singleItem];
    }

    // กรณี 3: ไม่มีข้อมูล
    return [];
  };

  const displayItems = getDisplayItems();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <MaterialCommunityIcons name="robot" size={24} color="#fff" />
          <Text style={styles.headerTitle}>ผลการวิเคราะห์</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Preview */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: imageUri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <MaterialCommunityIcons name="camera" size={20} color="#fff" />
            <Text style={styles.imageOverlayText}>รูปที่ถ่าย</Text>
          </View>
        </View>

        {/* Results Section */}
        <View style={styles.resultsCard}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="chart-bar" size={24} color="#4CAF50" />
            <Text style={styles.sectionTitle}>ผลการวิเคราะห์ AI</Text>
          </View>
          
          <Text style={styles.sectionDescription}>
            ระบบ AI วิเคราะห์ว่านี่อาจจะเป็น:
          </Text>

          {displayItems.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <MaterialCommunityIcons name="robot-confused" size={64} color="#CCCCCC" />
              <Text style={styles.noResultsTitle}>ไม่พบผลการวิเคราะห์</Text>
              <Text style={styles.noResultsText}>
                ไม่สามารถระบุประเภทของผักหรือผลไม้ได้
              </Text>
            </View>
          ) : (
            <View style={styles.predictionsList}>
              {displayItems.map((item: DisplayItem, index: number) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.predictionItem}
                  onPress={() => handleSelectItem(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemImageContainer}>
                    {item.picture ? (
                      <Image
                        source={{ uri: item.picture }}
                        style={styles.itemImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <MaterialCommunityIcons 
                        name={item.type === 'fruit' ? "fruit-cherries" : "sprout"} 
                        size={32} 
                        color="#4CAF50" 
                      />
                    )}
                  </View>

                  <View style={styles.itemContent}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <View style={[
                        styles.typeTag,
                        item.type === 'fruit' ? styles.fruitType : styles.vegetableType
                      ]}>
                        <Text style={styles.typeText}>
                          {item.type === 'fruit' ? 'ผลไม้' : 'ผัก'}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.itemDescription} numberOfLines={2}>
                      {item.description}
                    </Text>

                    {/* Confidence Meter */}
                    <View style={styles.confidenceContainer}>
                      <View style={styles.confidenceHeader}>
                        <Text style={styles.confidenceLabel}>
                          {getConfidenceText(item.confidence)}
                        </Text>
                        <Text style={styles.confidenceValue}>
                          {(item.confidence * 100).toFixed(1)}%
                        </Text>
                      </View>
                      <View style={styles.confidenceBar}>
                        <View 
                          style={[
                            styles.confidenceFill,
                            { 
                              width: `${item.confidence * 100}%`,
                              backgroundColor: getConfidenceColor(item.confidence)
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  </View>

                  <MaterialIcons 
                    name="chevron-right" 
                    size={24} 
                    color="#CCCCCC" 
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Help Text */}
        <View style={styles.helpCard}>
          <MaterialCommunityIcons name="lightbulb-on" size={20} color="#FF9800" />
          <Text style={styles.helpText}>
            💡 เลือกรายการที่ตรงกับสิ่งที่คุณถ่ายมากที่สุด{'\n'}
            📷 ถ้าไม่ตรงเลย ให้กด "ถ่ายรูปใหม่"
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.retakeButton}
          onPress={handleRetakePhoto}
        >
          <MaterialCommunityIcons name="camera-retake" size={20} color="#666" />
          <Text style={styles.retakeButtonText}>ถ่ายรูปใหม่</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles เหมือนเดิม (copy จากข้างบน)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#2E7D32',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#A4E4A0',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  imageCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageOverlayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  resultsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  predictionsList: {
    gap: 12,
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  fruitType: {
    backgroundColor: '#FF9800',
  },
  vegetableType: {
    backgroundColor: '#4CAF50',
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  confidenceContainer: {
    marginTop: 4,
  },
  confidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  confidenceLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  confidenceValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  confidenceBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  helpText: {
    flex: 1,
    fontSize: 14,
    color: '#E65100',
    lineHeight: 20,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});

export default PredictionResultScreen;