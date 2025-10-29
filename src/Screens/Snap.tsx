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

const SnapScreen: React.FC = () => {
  const navigation = useNavigation<SnapScreenNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUsingGallery, setIsUsingGallery] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const CURRENT_USER_ID = 1;

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

  // ✅ Function ขอสิทธิ์การเข้าถึง Gallery
  const requestGalleryPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === 'granted';
    }
    return true; // Android ไม่ต้องขอ permission สำหรับ Gallery
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
        console.log("เลือกรูปจาก Gallery:", imageUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
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
      console.log("เริ่มวิเคราะห์รูปจาก Gallery...");

      // ✅ 1. อัพโหลดรูปไปยัง Supabase Storage
      const imageUrl = await uploadImageToSupabase(selectedImage);
      
      // ✅ 2. เรียกวิเคราะห์ภาพ
      const predictionResult = await analyzeImageWithSupabase(imageUrl);

      // ✅ 3. บันทึกประวัติการวิเคราะห์
      await saveAnalysisHistory(predictionResult, imageUrl);

      // ✅ 4. นำผลลัพธ์ไปแสดงในหน้าผลลัพธ์
      navigation.navigate("PredictionResult", {
        prediction: predictionResult,
        imageUri: imageUrl
      });

    } catch (error) {
      console.error("Error in handleAnalyzeFromGallery:", error);
      
      let errorMessage = "เกิดข้อผิดพลาดในการวิเคราะห์ภาพ";
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to upload')) {
          errorMessage = "อัพโหลดรูปภาพไม่สำเร็จ\n\nตรวจสอบการเชื่อมต่ออินเตอร์เน็ต";
        } else if (error.message.includes('Edge Function') || error.message.includes('REST API')) {
          errorMessage = "บริการวิเคราะห์ภาพไม่พร้อมใช้งานในขณะนี้\n\nกำลังใช้ข้อมูลตัวอย่าง";
          const mockResult = getMockPredictionData();
          navigation.navigate("PredictionResult", {
            prediction: mockResult,
            imageUri: "mock_image_uri"
          });
          return;
        }
      }
      
      Alert.alert("เกิดข้อผิดพลาด", errorMessage);
    } finally {
      setIsLoading(false);
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

  // ✅ Function อัพโหลดรูปไป Supabase Storage
  const uploadImageToSupabase = async (imageUri: string): Promise<string> => {
    try {
      console.log("เริ่มอัพโหลดรูปภาพ...");
      
      const base64Data = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileExt = imageUri.split('.').pop() || 'jpg';
      const fileName = `snap_${Date.now()}.${fileExt}`;
      const filePath = `snap-images/${fileName}`;

      console.log("กำลังอัพโหลดไปยัง:", filePath);

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, decodeBase64(base64Data), {
          contentType: `image/${fileExt}`,
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
      }

      console.log("อัพโหลดสำเร็จ:", data);

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log("Public URL:", publicUrl);
      return publicUrl;

    } catch (error) {
      console.error('Error in uploadImageToSupabase:', error);
      throw new Error('Failed to upload image to storage');
    }
  };

  // ✅ Function เรียก Edge Function สำหรับวิเคราะห์ภาพ
  const analyzeImageWithSupabase = async (imageUrl: string): Promise<any> => {
    try {
      console.log("เรียก Edge Function ด้วย imageUrl:", imageUrl);

      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: { 
          image_url: imageUrl,
          user_id: CURRENT_USER_ID 
        }
      });

      if (error) {
        console.error('Edge Function error:', error);
        throw new Error(`Edge Function failed: ${error.message}`);
      }

      console.log("ผลลัพธ์จาก Edge Function:", data);
      return data;

    } catch (error) {
      console.error('Error in analyzeImageWithSupabase:', error);
      return await analyzeImageWithREST(imageUrl);
    }
  };

  // ✅ Function Fallback ใช้ REST API
  const analyzeImageWithREST = async (imageUrl: string): Promise<any> => {
    try {
      console.log("ลองใช้ REST API แทน...");
      
      const response = await fetch('https://your-ai-service.vercel.app/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          user_id: CURRENT_USER_ID
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`REST API failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("ผลลัพธ์จาก REST API:", result);
      return result;

    } catch (error) {
      console.error('Error in analyzeImageWithREST:', error);
      
      if (__DEV__) {
        console.log("ใช้ mock data สำหรับ development");
        return getMockPredictionData();
      }
      
      throw new Error('All analysis methods failed');
    }
  };

  // ✅ Mock data สำหรับ development
  const getMockPredictionData = () => {
    const vegetables = [
      {
        name: "Bell Pepper",
        confidence: 0.95,
        description: "พริกหยวกมีรสชาติหวาน มีเผ็ดเล็กน้อย",
        recipes: ["ยำพริกหยวก", "พริกหยวกยัดไส้", "ผัดพริกหยวก"]
      },
      {
        name: "Tomato", 
        confidence: 0.87,
        description: "มะเขือเทศมีรสชาติเปรี้ยวอมหวาน",
        recipes: ["สลัดมะเขือเทศ", "ซุปมะเขือเทศ", "มะเขือเทศย่าง"]
      },
      {
        name: "Cucumber",
        confidence: 0.78,
        description: "แตงกวามีรสชาติสดชื่น กรอบ",
        recipes: ["ยำแตงกวา", "แตงกวาผัดไข่", "น้ำแตงกวาปั่น"]
      }
    ];

    const randomVeg = vegetables[Math.floor(Math.random() * vegetables.length)];
    
    return {
      predictions: [randomVeg],
      analyzed_at: new Date().toISOString(),
      model_version: "mock-1.0"
    };
  };

  // ✅ ฟังก์ชันกดถ่ายรูป (เวอร์ชันใช้ Supabase)
  const handleSnapPress = async () => {
    if (!cameraRef.current || !cameraReady) {
      Alert.alert("ข้อผิดพลาด", "กล้องไม่พร้อมใช้งาน");
      return;
    }

    try {
      setIsLoading(true);
      
      console.log("กำลังถ่ายรูป...");
      
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
        skipProcessing: true
      });

      if (!photo) {
        throw new Error("ไม่สามารถถ่ายรูปได้");
      }

      console.log("รูปถ่ายได้ที่:", photo.uri);

      const imageUrl = await uploadImageToSupabase(photo.uri);
      const predictionResult = await analyzeImageWithSupabase(imageUrl);
      await saveAnalysisHistory(predictionResult, imageUrl);

      navigation.navigate("PredictionResult", {
        prediction: predictionResult,
        imageUri: imageUrl
      });

    } catch (error) {
      console.error("Error in handleSnapPress:", error);
      
      let errorMessage = "เกิดข้อผิดพลาดในการวิเคราะห์ภาพ";
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to upload')) {
          errorMessage = "อัพโหลดรูปภาพไม่สำเร็จ\n\nตรวจสอบการเชื่อมต่ออินเตอร์เน็ต";
        } else if (error.message.includes('Edge Function') || error.message.includes('REST API')) {
          errorMessage = "บริการวิเคราะห์ภาพไม่พร้อมใช้งานในขณะนี้\n\nกำลังใช้ข้อมูลตัวอย่าง";
          const mockResult = getMockPredictionData();
          navigation.navigate("PredictionResult", {
            prediction: mockResult,
            imageUri: "mock_image_uri"
          });
          return;
        }
      }
      
      Alert.alert("เกิดข้อผิดพลาด", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Function บันทึกประวัติการวิเคราะห์
  const saveAnalysisHistory = async (prediction: any, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('analysis_history')
        .insert({
          user_id: CURRENT_USER_ID,
          image_url: imageUrl,
          prediction_result: prediction,
          analyzed_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving analysis history:', error);
      } else {
        console.log('Analysis history saved');
      }
    } catch (error) {
      console.error('Error in saveAnalysisHistory:', error);
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>กำลังตรวจสอบสิทธิ์กล้อง...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noPermissionContainer}>
          <MaterialIcons name="no-photography" size={80} color="#A4E4A0" />
          <Text style={styles.noPermissionTitle}>ต้องการสิทธิ์การเข้าถึงกล้อง</Text>
          <Text style={styles.noPermissionText}>
            แอปต้องการใช้กล้องเพื่อถ่ายรูปและวิเคราะห์ผักผลไม้
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <MaterialIcons name="photo-camera" size={20} color="#fff" />
            <Text style={styles.permissionButtonText}>อนุญาตการเข้าถึงกล้อง</Text>
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
            // ✅ แสดงรูปจาก Gallery
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
            // ✅ แสดง Camera Preview
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

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <MaterialCommunityIcons name="lightbulb" size={20} color="#FF9800" />
            <Text style={styles.infoTitle}>
              {isUsingGallery ? "วิเคราะห์จาก Gallery" : "เคล็ดลับการถ่ายรูป"}
            </Text>
          </View>
          <View style={styles.tipsContainer}>
            {isUsingGallery ? (
              <View style={styles.tipItem}>
                <MaterialCommunityIcons name="check-circle" size={16} color="#4CAF50" />
                <Text style={styles.tipText}>เลือกรูปภาพสำเร็จ</Text>
              </View>
            ) : (
              <>
                <View style={styles.tipItem}>
                  <MaterialCommunityIcons name="white-balance-sunny" size={16} color="#4CAF50" />
                  <Text style={styles.tipText}>แสงสว่างเพียงพอ</Text>
                </View>
                <View style={styles.tipItem}>
                  <MaterialCommunityIcons name="target" size={16} color="#4CAF50" />
                  <Text style={styles.tipText}>โฟกัสที่วัตถุ</Text>
                </View>
                <View style={styles.tipItem}>
                  <MaterialCommunityIcons name="image" size={16} color="#4CAF50" />
                  <Text style={styles.tipText}>รูปชัดเจน</Text>
                </View>
              </>
            )}
          </View>
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

          {/* Gallery Hint */}
          {!isUsingGallery && (
            <TouchableOpacity 
              style={styles.galleryHint}
              onPress={handleGalleryPress}
            >
              <MaterialIcons name="photo-library" size={16} color="#2E7D32" />
              <Text style={styles.galleryHintText}>หรือเลือกรูปจาก Gallery</Text>
            </TouchableOpacity>
          )}

          {/* Debug Info */}
          {__DEV__ && (
            <View style={styles.debugInfo}>
              <Text style={styles.debugText}>
                Mode: {isUsingGallery ? '📁 Gallery' : '📷 Camera'} | 
                Camera: {cameraReady ? '✅ Ready' : '❌ Not Ready'}
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
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
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
  galleryHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    padding: 8,
  },
  galleryHintText: {
    color: '#2E7D32',
    fontSize: 14,
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