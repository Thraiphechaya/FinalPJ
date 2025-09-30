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
import { MaterialIcons } from "@expo/vector-icons";
import Tabbar from "../Component/Tabbar";
// ⚠️ แก้ไข import - ตรวจสอบ expo-camera version
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const SnapScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions(); // ⚠️ ใช้ hook ใหม่
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null); // ⚠️ เปลี่ยนเป็น CameraView

  // ตรวจสอบ permission
  useEffect(() => {
    const checkPermissions = async () => {
      if (!permission) return;
      
      if (!permission.granted) {
        const response = await requestPermission();
        console.log("Camera permission:", response.granted);
      }
    };

    checkPermissions();
  }, [permission, requestPermission]);

  // ฟังก์ชันกดถ่ายรูป
  const handleSnapPress = async () => {
    if (!cameraRef.current) {
      Alert.alert("ข้อผิดพลาด", "กล้องไม่พร้อมใช้งาน");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Taking photo...");
      
      // ⚠️ แก้ไข takePictureAsync method
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        // skipProcessing: false, // ⚠️ อาจไม่รองรับใน version ใหม่
      });

      if (!photo) {
        throw new Error("ไม่สามารถถ่ายรูปได้");
      }

      console.log("Photo taken:", photo.uri);

      // สร้าง FormData
      const formData = new FormData();
      
      const filename = `snap_${Date.now()}.jpg`;
      
      // ⚠️ แก้ไข FormData structure
      formData.append('file', {
        uri: photo.uri,
        name: filename,
        type: 'image/jpeg',
      } as any);

      // ⚠️ Config API URL
      const getApiUrl = () => {
        if (Platform.OS === 'android') {
          return 'http://10.0.2.2:8000'; // Android Emulator
        } else if (Platform.OS === 'ios') {
          return 'http://localhost:8000'; // iOS Simulator  
        }
        return 'http://192.168.1.100:8000'; // Physical device - เปลี่ยนเป็น IP จริง
      };

      const API_URL = getApiUrl();
      console.log("Uploading to:", `${API_URL}/upload`);

      // ⚠️ แก้ไข fetch headers
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
        // ⚠️ ลบ Content-Type header ออก ให้ browser จัดการเอง
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });

      console.log("Upload response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error response:", errorText);
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      
      Alert.alert("สำเร็จ! 🎉", 
        `อัปโหลดรูปภาพเรียบร้อยแล้ว\n\nผลการวิเคราะห์: ${JSON.stringify(data)}`, 
        [
          {
            text: "OK",
            onPress: () => console.log("Upload confirmed")
          }
        ]
      );

    } catch (error) {
      console.error("Upload error:", error);
      
      let errorMessage = "เกิดข้อผิดพลาดในการอัปโหลด";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // ⚠️ เพิ่ม specific error handling
        if (error.message.includes('Network request failed')) {
          errorMessage = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้\nตรวจสอบ IP address และเซิร์ฟเวอร์";
        } else if (error.message.includes('404')) {
          errorMessage = "ไม่พบ endpoint /upload บนเซิร์ฟเวอร์";
        } else if (error.message.includes('500')) {
          errorMessage = "เซิร์ฟเวอร์เกิดข้อผิดพลาด";
        }
      }
      
      Alert.alert("เกิดข้อผิดพลาด 😞", errorMessage, [
        { text: "ลองใหม่", onPress: () => handleSnapPress() },
        { text: "ยกเลิก", style: "cancel" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ⚠️ แก้ไข permission checking
  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ADE80" />
          <Text style={styles.loadingText}>กำลังตรวจสอบสิทธิ์กล้อง...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noPermissionContainer}>
          <MaterialIcons name="camera-alt" size={64} color="#ccc" />
          <Text style={styles.noPermissionText}>ต้องการสิทธิ์เข้าถึงกล้อง 📷</Text>
          <Text style={styles.noPermissionSubtext}>
            แอพต้องการใช้กล้องเพื่อถ่ายรูปและวิเคราะห์ผักผลไม้
          </Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={requestPermission}
          >
            <Text style={styles.settingsButtonText}>อนุญาตการเข้าถึงกล้อง</Text>
          </TouchableOpacity>
        </View>
        <Tabbar activeTab="snap" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#4ADE80" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Snap & Identify 🔍</Text>
        <View style={styles.headerRight}>
          {/* ⚠️ เพิ่ม debug info */}
          <Text style={styles.debugText}>
            {Platform.OS === 'android' ? '🤖' : '🍎'}
          </Text>
        </View>
      </View>

      {/* Camera Preview */}
      <View style={styles.cameraContainer}>
        {/* ⚠️ เปลี่ยนเป็น CameraView */}
        <CameraView 
          style={styles.cameraPreview} 
          facing="back" // ⚠️ เปลี่ยนจาก type เป็น facing
          ref={cameraRef}
          // ratio="16:9" // ⚠️ อาจไม่รองรับใน version ใหม่
        />
        
        {/* Camera Overlay */}
        <View style={styles.cameraOverlay}>
          <View style={styles.focusFrame} />
          <Text style={styles.instructionText}>
            🥕 วางผักหรือผลไม้ในกรอบ แล้วกดถ่ายรูป 🍎
          </Text>
        </View>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        {/* Snap Button */}
        <TouchableOpacity 
          style={[styles.snapButton, isLoading && styles.snapButtonDisabled]} 
          onPress={handleSnapPress} 
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.snapButtonText}>กำลังประมวลผล... 🤔</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="camera-alt" size={24} color="#fff" />
              <Text style={styles.snapButtonText}>ถ่ายรูป & วิเคราะห์ ✨</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Helper Text */}
        <Text style={styles.helperText}>
          📸 ถ่ายรูปผักหรือผลไม้เพื่อให้ AI ช่วยระบุชื่อผักหรือผลไม้
        </Text>

        {/* ⚠️ เพิ่ม debug info */}
        <Text style={styles.debugInfo}>
          Platform: {Platform.OS} | 
          API: {Platform.OS === 'android' ? '10.0.2.2:8000' : 'localhost:8000'}
        </Text>
      </View>

      {/* Bottom Tab Bar */}
      <Tabbar activeTab="snap" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#4ADE80" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { 
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#000" 
  },
  headerRight: { 
    width: 40,
    alignItems: 'center',
  },
  debugText: {
    fontSize: 20,
  },
  cameraContainer: { 
    flex: 1, 
    marginHorizontal: 20, 
    marginTop: 20, 
    borderRadius: 12, 
    overflow: "hidden",
    backgroundColor: '#000',
    position: 'relative',
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
  },
  focusFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#4ADE80',
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  instructionText: {
    position: 'absolute',
    bottom: 40,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonContainer: { 
    paddingHorizontal: 20, 
    paddingVertical: 20,
  },
  snapButton: {
    backgroundColor: "#FB923C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  snapButtonDisabled: {
    backgroundColor: "#ccc",
  },
  snapButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  helperText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    marginTop: 12,
    opacity: 0.8,
  },
  debugInfo: {
    textAlign: 'center',
    color: '#000',
    fontSize: 10,
    marginTop: 8,
    opacity: 0.6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ADE80',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ADE80',
    paddingHorizontal: 40,
  },
  noPermissionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
  },
  noPermissionSubtext: {
    fontSize: 14,
    color: '#000',
    marginTop: 12,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 20,
  },
  settingsButton: {
    backgroundColor: '#FB923C',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SnapScreen;