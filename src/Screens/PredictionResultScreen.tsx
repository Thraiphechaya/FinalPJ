import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

// กำหนด CURRENT_USER_ID (ควรดึงจาก Supabase Auth จริงๆ)
const CURRENT_USER_ID = 1;

type PredictionResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PredictionResult'>;
type PredictionResultScreenRouteProp = RouteProp<RootStackParamList, 'PredictionResult'>;

const PredictionResultScreen: React.FC = () => {
  const navigation = useNavigation<PredictionResultScreenNavigationProp>();
  const route = useRoute<PredictionResultScreenRouteProp>();
  
  const { prediction, imageUri } = route.params;

  // ✅ ตรวจสอบและเตรียมข้อมูลให้ปลอดภัย
  const safePrediction = prediction || {
    predictions: [
      {
        name: "Unknown Vegetable",
        confidence: 0.5,
        description: "No description available",
        recipes: ["กำลังพัฒนาสูตร"],
        type: "vegetable"
      }
    ],
    analyzed_at: new Date().toISOString(),
    model_version: "safe-1.0"
  };

  const safeImageUri = imageUri || "mock_image_uri";

  // ✅ ตรวจสอบ predictions array
  const predictions = safePrediction.predictions || [safePrediction];
  
  // ✅ ตรวจสอบ prediction ตัวแรก
  const mainPrediction = predictions[0] || {
    name: "Unknown",
    confidence: 0.5,
    description: "No description available",
    type: "vegetable"
  };

  // ✅ ตรวจสอบชื่ออาหารก่อนใช้ toLowerCase()
  const foodName = mainPrediction.name || "Unknown Food";
  const foodNameSafe = typeof foodName === 'string' ? foodName : "Unknown Food";
  
  const handleViewDetails = () => {
    // ✅ สร้าง DisplayItem object จาก mainPrediction
    const displayItem = {
      id: mainPrediction.id || Math.floor(Math.random() * 1000) + 1,
      type: (mainPrediction.type || "vegetable") as 'vegetable' | 'fruit',
      name: foodNameSafe,
      description: mainPrediction.description || "No description available",
      picture: safeImageUri,
      isFavorite: mainPrediction.isFavorite || false,
      // ✅ เพิ่ม properties อื่นๆ ตามที่ DisplayItem ต้องการ
      createat: mainPrediction.createat,
      taste: mainPrediction.taste,
      nutrition: mainPrediction.nutrition,
      benefits: mainPrediction.benefits
    };

    console.log('Display item for detail:', displayItem);
    
    // ✅ ใช้ parameter เหมือนกับ handleCardPress พอดี
    navigation.navigate('Detail', {
      itemId: displayItem.id,
      itemType: displayItem.type,
      itemName: displayItem.name,
      itemDescription: displayItem.description,
      itemPicture: displayItem.picture,
      isFavorite: displayItem.isFavorite,
      userId: CURRENT_USER_ID,
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ผลการวิเคราะห์</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Image */}
        <Image 
          source={{ uri: safeImageUri }} 
          style={styles.image}
          resizeMode="cover"
        />

        {/* Results */}
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>ผลลัพธ์การวิเคราะห์</Text>
          
          {predictions.map((pred: any, index: number) => {
            // ✅ ตรวจสอบแต่ละ prediction
            const safePred = pred || {};
            const name = safePred.name || "Unknown";
            const confidence = safePred.confidence || 0;
            const description = safePred.description || "No description available";
            
            return (
              <View key={index} style={styles.predictionCard}>
                <View style={styles.predictionHeader}>
                  <Text style={styles.predictionName}>
                    {name}
                  </Text>
                  <Text style={styles.confidence}>
                    {(confidence * 100).toFixed(1)}%
                  </Text>
                </View>
                <Text style={styles.predictionDescription}>
                  {description}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.detailButton}
            onPress={handleViewDetails}
          >
            <MaterialCommunityIcons name="information" size={20} color="#fff" />
            <Text style={styles.detailButtonText}>ดูรายละเอียด</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleBackPress}
          >
            <MaterialCommunityIcons name="camera" size={20} color="#4CAF50" />
            <Text style={styles.retryButtonText}>ลองอีกครั้ง</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4E4A0',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2E7D32',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  image: {
    width: '100%',
    height: 300,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  predictionCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  predictionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  confidence: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  predictionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  detailButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  retryButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  retryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default PredictionResultScreen;