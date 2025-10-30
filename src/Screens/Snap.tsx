import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
  Image,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Tabbar from "../Component/Tabbar";
import { CameraView, useCameraPermissions } from "expo-camera";
import { supabase } from "../lib/supabase";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

// Define navigation types
type RootStackParamList = {
  PredictionResult: {
    prediction: any;
    imageUri: string;
  };
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Snap: undefined;
};

type SnapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FASTAPI_URL = "http://10.0.0.48:8000"; // เปลี่ยนเป็น URL ของ FastAPI backend
const CURRENT_USER_ID = 1;

const SnapScreen: React.FC = () => {
  const navigation = useNavigation<SnapScreenNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUsingGallery, setIsUsingGallery] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // ตรวจสอบ permission
  useEffect(() => {
    const checkPermissions = async () => {
      if (!permission) return;
      
      if (!permission.granted) {
        await requestPermission();
      }
    };

    checkPermissions();
  }, [permission, requestPermission]);

  // ✅ Function อัพโหลดรูปไป Supabase Storage (เก็บประวัติ)
  const uploadImageToSupabase = async (imageUri: string): Promise<string> => {
    try {
      console.log("📤 อัพโหลดรูปภาพไป Supabase Storage...");

      // ตรวจสอบว่า bucket มีอยู่หรือไม่
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.log("⚠️ ไม่สามารถตรวจสอบ bucket:", listError.message);
        return imageUri; // ใช้ local URI แทน
      }

      const bucketExists = buckets?.some(bucket => bucket.id === 'images');
      
      if (!bucketExists) {
        console.log("🚨 Bucket 'images' ไม่พบ - ใช้ local URI แทน");
        console.log("💡 สร้าง bucket ใน Supabase Dashboard: Storage > Create bucket > name: 'images'");
        return imageUri;
      }

      const base64Data = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileExt = imageUri.split('.').pop() || 'jpg';
      const fileName = `snap_${Date.now()}.${fileExt}`;
      const filePath = `snap-images/${fileName}`;

      // อัพโหลดไปยัง Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, decodeBase64(base64Data), {
          contentType: `image/${fileExt}`,
          upsert: false
        });

      if (error) {
        console.log('⚠️ Upload error:', error.message);
        return imageUri; // ใช้ local URI แทน
      }

      // ได้ public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log("✅ Upload สำเร็จ:", publicUrl);
      return publicUrl;

    } catch (error) {
      console.log('⚠️ Error in uploadImageToSupabase:', error);
      return imageUri; // fallback ใช้ local URI
    }
  };

  // Helper function สำหรับ decode base64
  const decodeBase64 = (base64: string) => {
    try {
      const base64Code = base64.split(',')[1] || base64;
      const chars = atob(base64Code);
      const bytes = new Uint8Array(chars.length);
      for (let i = 0; i < chars.length; i++) {
        bytes[i] = chars.charCodeAt(i);
      }
      return bytes;
    } catch (error) {
      console.error('Error decoding base64:', error);
      throw new Error('Failed to decode image');
    }
  };

  // ✅ Function ขอสิทธิ์การเข้าถึง Gallery
  const requestGalleryPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === 'granted';
    }
    return true;
  };

  // ✅ Function เลือกรูปจาก Gallery
  const handleGalleryPress = async () => {
    try {
      const hasPermission = await requestGalleryPermission();
      
      if (!hasPermission) {
        Alert.alert(
          "ต้องการสิทธิ์การเข้าถึง",
          "แอปต้องการเข้าถึง Gallery เพื่อเลือกรูปภาพ",
          [{ text: "ตกลง" }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        setIsUsingGallery(true);
        console.log("✅ เลือกรูปจาก Gallery:", imageUri);
      }
    } catch (error) {
      console.error("❌ Error picking image:", error);
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถเลือกรูปจาก Gallery ได้");
    }
  };

  // ✅ Function ล้างรูปที่เลือก
  const handleClearSelectedImage = () => {
    setSelectedImage(null);
    setIsUsingGallery(false);
  };

  // ✅ Function ใช้รูปจาก Gallery ในการวิเคราะห์
  const handleAnalyzeFromGallery = async () => {
    if (!selectedImage) {
      Alert.alert("ข้อผิดพลาด", "กรุณาเลือกรูปภาพก่อน");
      return;
    }

    try {
      setIsLoading(true);
      console.log("🔍 เริ่มวิเคราะห์รูปจาก Gallery...");

      // ส่งภาพไปยัง FastAPI
      const predictionResult = await analyzeImageWithFastAPI(selectedImage);

      // Navigate ไปหน้าผลลัพธ์ (ใช้ local URI)
      navigation.navigate("PredictionResult", {
        prediction: predictionResult,
        imageUri: selectedImage
      });

    } catch (error) {
      console.error("❌ Error in handleAnalyzeFromGallery:", error);
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถวิเคราะห์ภาพได้");
    } finally {
      setIsLoading(false);
    }
  };

  // 🚀 Function ส่งภาพไปยัง FastAPI Backend
  const analyzeImageWithFastAPI = async (imageUri: string): Promise<any> => {
    try {
      console.log("📡 ส่งรูปไปยัง FastAPI backend...");

      // สร้าง FormData สำหรับ React Native
      const formData = new FormData();
      
      // สำหรับ React Native ต้องใช้รูปแบบนี้
      const fileInfo = {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      };
      
      // เพิ่มไฟล์เข้า FormData
      formData.append('file', fileInfo as any);
      formData.append('user_id', CURRENT_USER_ID.toString());

      console.log("🔄 Sending request to FastAPI...");

      // ส่ง request ไปยัง FastAPI
      const response = await fetch(`${FASTAPI_URL}/api/predict`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`FastAPI Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ ผลลัพธ์จาก FastAPI:", result);
      
      return result;

    } catch (error) {
      console.error('❌ Error in analyzeImageWithFastAPI:', error);
      
      // Development mode: ใช้ mock data
      if (__DEV__) {
        console.log("⚠️ ใช้ mock data สำหรับ development");
        return getMockPredictionData();
      }
      
      throw error;
    }
  };

  // ✅ Mock data สำหรับ development
  const getMockPredictionData = () => {
    const vegetables = [
      {
        name: "Bell Pepper",
        confidence: 0.95,
        description: "พริกหยวกมีรสชาติหวาน มีเผ็ดเล็กน้อย",
        thai_name: "พริกหยวก",
        recipes: ["ยำพริกหยวก", "พริกหยวกยัดไส้", "ผัดพริกหยวก"]
      },
      {
        name: "Tomato", 
        confidence: 0.87,
        description: "มะเขือเทศมีรสชาติเปรี้ยวอมหวาน",
        thai_name: "มะเขือเทศ",
        recipes: ["สลัดมะเขือเทศ", "ซุปมะเขือเทศ", "มะเขือเทศย่าง"]
      },
      {
        name: "Cucumber",
        confidence: 0.78,
        description: "แตงกวามีรสชาติสดชื่น กรอบ",
        thai_name: "แตงกวา",
        recipes: ["ยำแตงกวา", "แตงกวาผัดไข่", "น้ำแตงกวาปั่น"]
      }
    ];

    const randomVeg = vegetables[Math.floor(Math.random() * vegetables.length)];
    
    return {
      success: true,
      predictions: [randomVeg],
      top_prediction: randomVeg,
      analyzed_at: new Date().toISOString(),
      model_version: "v1.0.0"
    };
  };

  // ✅ ฟังก์ชันกดถ่ายรูป
  const handleSnapPress = async () => {
    if (!cameraRef.current || !cameraReady) {
      Alert.alert("ข้อผิดพลาด", "กล้องไม่พร้อมใช้งาน");
      return;
    }

    try {
      setIsLoading(true);
      
      console.log("📸 กำลังถ่ายรูป...");
      
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
        skipProcessing: true
      });

      if (!photo) {
        throw new Error("ไม่สามารถถ่ายรูปได้");
      }

      console.log("✅ รูปถ่ายได้ที่:", photo.uri);

      // ส่งภาพไปยัง FastAPI
      const predictionResult = await analyzeImageWithFastAPI(photo.uri);
      
      // อัพโหลดไป Supabase เพื่อเก็บประวัติ (ทำแบบ background)
      const imageUrl = await uploadImageToSupabase(photo.uri);
      
      // บันทึกประวัติ
      await saveAnalysisHistory(predictionResult, imageUrl);

      // Navigate ไปหน้าผลลัพธ์
      navigation.navigate("PredictionResult", {
        prediction: predictionResult,
        imageUri: imageUrl
      });

    } catch (error) {
      console.error("❌ Error in handleSnapPress:", error);
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถวิเคราะห์ภาพได้");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Function บันทึกประวัติการวิเคราะห์ลง Supabase
  const saveAnalysisHistory = async (prediction: any, imageUrl: string) => {
    try {
      // ตรวจสอบว่าตาราง analysis_history มีอยู่หรือไม่
      const { error: checkError } = await supabase
        .from('analysis_history')
        .select('id')
        .limit(1);

      if (checkError && checkError.code === 'PGRST116') {
        console.log("🚨 ตาราง 'analysis_history' ไม่พบ");
        console.log("💡 สร้างตารางใน Supabase SQL Editor:");
        console.log(`
CREATE TABLE public.analysis_history (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  prediction_result JSONB NOT NULL,
  analyzed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.analysis_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed)
CREATE POLICY "Allow all operations" ON public.analysis_history
  FOR ALL USING (true);
        `);
        return; // ไม่บันทึกถ้าไม่มีตาราง
      }

      const { error } = await supabase
        .from('analysis_history')
        .insert({
          user_id: CURRENT_USER_ID,
          image_url: imageUrl,
          prediction_result: prediction,
          analyzed_at: new Date().toISOString()
        });

      if (error) {
        console.log('⚠️ Error saving analysis history:', error.message);
      } else {
        console.log('✅ Analysis history saved');
      }
    } catch (error) {
      console.log('⚠️ Error in saveAnalysisHistory:', error);
    }
  };

  // Loading State
  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>กำลังโหลด...</Text>
      </View>
    );
  }

  // No Permission State
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <MaterialCommunityIcons name="camera" size={24} color="#fff" />
            <Text style={styles.headerTitle}>Snap & Identify</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.noPermissionContainer}>
          <MaterialCommunityIcons name="camera-off" size={80} color="#2E7D32" />
          <Text style={styles.noPermissionTitle}>
            ต้องการการอนุญาตใช้กล้อง
          </Text>
          <Text style={styles.noPermissionText}>
            แอปต้องการเข้าถึงกล้องเพื่อถ่ายภาพผักและผลไม้{'\n'}
            สำหรับการวิเคราะห์และระบุประเภท
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <MaterialIcons name="camera" size={20} color="#fff" />
            <Text style={styles.permissionButtonText}>อนุญาต</Text>
          </TouchableOpacity>
        </View>

        <Tabbar activeTab="snap" />
      </SafeAreaView>
    );
  }

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
          <MaterialCommunityIcons name="camera" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Snap & Identify</Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.galleryButton,
            isUsingGallery && styles.galleryButtonActive
          ]}
          onPress={handleGalleryPress}
        >
          <MaterialIcons 
            name="photo-library" 
            size={24} 
            color={isUsingGallery ? "#4CAF50" : "#fff"} 
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Camera Preview หรือ Gallery Image */}
        <View style={styles.cameraContainer}>
          {isUsingGallery && selectedImage ? (
            // แสดงรูปจาก Gallery
            <View style={styles.galleryPreview}>
              <Image 
                source={{ uri: selectedImage }} 
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.clearImageButton}
                onPress={handleClearSelectedImage}
              >
                <MaterialIcons name="close" size={20} color="#fff" />
              </TouchableOpacity>
              
              {/* Overlay สำหรับ Gallery Image */}
              <View style={styles.cameraOverlay}>
                <View style={styles.focusFrame}>
                  <View style={styles.cornerTL} />
                  <View style={styles.cornerTR} />
                  <View style={styles.cornerBL} />
                  <View style={styles.cornerBR} />
                </View>
                
                <View style={styles.instructionContainer}>
                  <MaterialCommunityIcons name="image" size={20} color="#fff" />
                  <Text style={styles.instructionText}>
                    รูปภาพที่เลือกจาก Gallery
                  </Text>
                  <MaterialCommunityIcons name="image" size={20} color="#fff" />
                </View>
              </View>
            </View>
          ) : (
            // แสดง Camera Preview
            <>
              <CameraView 
                style={styles.cameraPreview} 
                facing="back"
                ref={cameraRef}
                onCameraReady={() => setCameraReady(true)}
              />
              
              {/* Camera Overlay */}
              <View style={styles.cameraOverlay}>
                <View style={styles.focusFrame}>
                  <View style={styles.cornerTL} />
                  <View style={styles.cornerTR} />
                  <View style={styles.cornerBL} />
                  <View style={styles.cornerBR} />
                </View>
                
                <View style={styles.instructionContainer}>
                  <MaterialCommunityIcons name="food-apple" size={20} color="#fff" />
                  <Text style={styles.instructionText}>
                    วางผักหรือผลไม้ในกรอบ
                  </Text>
                  <MaterialCommunityIcons name="food-apple" size={20} color="#fff" />
                </View>
              </View>
            </>
          )}
        </View>

        {/* Control Buttons */}
        <View style={styles.controlContainer}>
          {/* Snap/Analyze Button */}
          <TouchableOpacity 
            style={[
              styles.snapButton, 
              isLoading && styles.snapButtonDisabled,
              (!cameraReady && !isUsingGallery) && styles.snapButtonDisabled
            ]} 
            onPress={isUsingGallery ? handleAnalyzeFromGallery : handleSnapPress} 
            disabled={isLoading || (!cameraReady && !isUsingGallery)}
            activeOpacity={0.8}
          >
            <View style={styles.snapButtonContent}>
              {isLoading ? (
                <>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={styles.snapButtonText}>กำลังวิเคราะห์...</Text>
                </>
              ) : (
                <>
                  <MaterialCommunityIcons 
                    name={isUsingGallery ? "image-search" : (cameraReady ? "camera" : "camera-off")} 
                    size={24} 
                    color="#fff" 
                  />
                  <Text style={styles.snapButtonText}>
                    {isUsingGallery 
                      ? "วิเคราะห์รูปภาพ" 
                      : cameraReady 
                        ? "ถ่ายรูป & วิเคราะห์" 
                        : "กล้องไม่พร้อม"
                    }
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>

          {/* Helper Text */}
          <Text style={styles.helperText}>
            {isUsingGallery 
              ? "AI จะช่วยระบุประเภทของผักและผลไม้จากรูปภาพที่เลือก"
              : "AI จะช่วยระบุประเภทของผักและผลไม้ พร้อมแนะนำเมนูอาหาร"
            }
          </Text>

          {/* Debug Info */}
          {__DEV__ && (
            <View style={styles.debugInfo}>
              <Text style={styles.debugText}>
                📸 กล้อง: {cameraReady ? 'พร้อม' : 'ไม่พร้อม'} | 
                📁 โหมด: {isUsingGallery ? 'Gallery' : 'Camera'} |
                🚀 Backend: FastAPI
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Bottom Tab Bar */}
      <Tabbar activeTab="snap" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#2E7D32" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#2E7D32",
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
    fontWeight: "600", 
    color: "#fff",
  },
  galleryButton: { 
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  galleryButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  content: {
    flex: 1,
    backgroundColor: '#A4E4A0',
  },
  cameraContainer: { 
    flex: 1, 
    margin: 20,
    borderRadius: 20, 
    overflow: "hidden",
    backgroundColor: '#000',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cameraPreview: { 
    flex: 1,
  },
  galleryPreview: {
    flex: 1,
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  clearImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  focusFrame: {
    width: 280,
    height: 280,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 2,
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 2,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 2,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 2,
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  controlContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 20,
  },
  snapButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  snapButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  snapButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  snapButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600",
  },
  helperText: {
    textAlign: 'center',
    color: '#2E7D32',
    fontSize: 12,
    marginTop: 12,
    fontWeight: '500',
  },
  debugInfo: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
  },
  debugText: {
    fontSize: 10,
    color: '#2E7D32',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A4E4A0',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A4E4A0',
    paddingHorizontal: 40,
  },
  noPermissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 20,
    textAlign: 'center',
  },
  noPermissionText: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 20,
  },
  permissionButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SnapScreen;