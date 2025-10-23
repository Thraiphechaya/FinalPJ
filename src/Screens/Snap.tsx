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
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Tabbar from "../Component/Tabbar";
import { CameraView, useCameraPermissions } from "expo-camera";

// Define navigation types
type RootStackParamList = {
  PredictionResult: {
    prediction: any;
    imageUri: string;
  };
  // Add other screens as needed
};

type SnapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SnapScreen: React.FC = () => {
  const navigation = useNavigation<SnapScreenNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
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

  // ฟังก์ชันกดถ่ายรูป
  const handleSnapPress = async () => {
    if (!cameraRef.current || !cameraReady) {
      Alert.alert("ข้อผิดพลาด", "กล้องไม่พร้อมใช้งาน");
      return;
    }

    try {
      setIsLoading(true);
      
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (!photo) {
        throw new Error("ไม่สามารถถ่ายรูปได้");
      }

      // สร้าง FormData
      const formData = new FormData();
      const filename = `snap_${Date.now()}.jpg`;
      
      formData.append('file', {
        uri: photo.uri,
        name: filename,
        type: 'image/jpeg',
      } as any);

      // Config API URL
      const getApiUrl = () => {
        if (Platform.OS === 'android') {
          return 'http://10.0.2.2:8000';
        } else if (Platform.OS === 'ios') {
          return 'http://localhost:8000'; 
        }
        return 'http://192.168.1.100:8000';
      };

      const API_URL = getApiUrl();

      // ส่งไปที่ /predict
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status}`);
      }

      const predictionResult = await response.json();
      
      // นำผลลัพธ์ไปแสดงในหน้าผลลัพธ์
      navigation.navigate("PredictionResult", {
        prediction: predictionResult,
        imageUri: photo.uri
      });

    } catch (error) {
      console.error("Upload error:", error);
      
      let errorMessage = "เกิดข้อผิดพลาดในการวิเคราะห์ภาพ";
      
      if (error instanceof Error) {
        if (error.message.includes('Network request failed')) {
          errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้\n\nตรวจสอบว่า:\n• Backend กำลังรันอยู่\n• IP address ถูกต้อง";
        } else if (error.message.includes('404')) {
          errorMessage = "ไม่พบ endpoint บนเซิร์ฟเวอร์";
        }
      }
      
      Alert.alert("เกิดข้อผิดพลาด", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันเลือกรูปจาก gallery
  const handleGalleryPress = async () => {
    Alert.alert("Coming Soon", "ฟีเจอร์เลือกรูปจาก Gallery กำลังจะมาเร็วๆ นี้");
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
          style={styles.galleryButton}
          onPress={handleGalleryPress}
        >
          <MaterialIcons name="photo-library" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Camera Preview */}
        <View style={styles.cameraContainer}>
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
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <MaterialCommunityIcons name="lightbulb" size={20} color="#FF9800" />
            <Text style={styles.infoTitle}>เคล็ดลับการถ่ายรูป</Text>
          </View>
          <View style={styles.tipsContainer}>
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
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlContainer}>
          {/* Snap Button */}
          <TouchableOpacity 
            style={[
              styles.snapButton, 
              isLoading && styles.snapButtonDisabled,
              !cameraReady && styles.snapButtonDisabled
            ]} 
            onPress={handleSnapPress} 
            disabled={isLoading || !cameraReady}
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
                    name={cameraReady ? "camera" : "camera-off"} 
                    size={24} 
                    color="#fff" 
                  />
                  <Text style={styles.snapButtonText}>
                    {cameraReady ? "ถ่ายรูป & วิเคราะห์" : "กล้องไม่พร้อม"}
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>

          {/* Helper Text */}
          <Text style={styles.helperText}>
            AI จะช่วยระบุประเภทของผักและผลไม้ พร้อมแนะนำเมนูอาหาร
          </Text>
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