import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Storage } from '../storage';
import { supabase } from '../lib/supabase'; // ✅ เพิ่ม import

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // ตรวจสอบว่า login อยู่แล้วหรือไม่
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Checking authentication status...');
      
      // ✅ ใหม่: ใช้ Supabase session แทน
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session && !error) {
        console.log('✅ User is already logged in with Supabase');
        const user = session.user;
        
        Alert.alert(
          'ยินดีต้อนรับกลับ',
          `สวัสดี ${user.email || 'User'}!`,
          [{ text: 'ตกลง', onPress: () => navigation.replace('Home') }]
        );
      } else {
        console.log('❌ User is not logged in');
      }
    } catch (error) {
      console.error('❌ Error checking auth status:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // ✅ ใหม่: ใช้ Supabase Authentication
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    setIsLoading(true);

    try {
      console.log('🚀 Attempting Supabase login...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.log('❌ Supabase login failed:', error.message);
        Alert.alert('เข้าสู่ระบบล้มเหลว', error.message);
        return;
      }

      if (data.user && data.session) {
        console.log('✅ Supabase login successful');
        
        // ✅ เก็บ session ใน AsyncStorage (ถ้าต้องการ)
        await Storage.saveAuthData({
          access_token: data.session.access_token,
          token_type: 'bearer',
          user: data.user
        });

        Alert.alert(
          'เข้าสู่ระบบสำเร็จ',
          `ยินดีต้อนรับ ${data.user.email}!`,
          [{ text: 'ตกลง', onPress: () => navigation.replace('Home') }]
        );
      }
      
    } catch (error) {
      console.error('❌ Login error:', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('กรุณากรอกอีเมล', 'กรุณากรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        Alert.alert('เกิดข้อผิดพลาด', error.message);
      } else {
        Alert.alert('ส่งอีเมลแล้ว', 'กรุณาตรวจสอบอีเมลเพื่อรีเซ็ตรหัสผ่าน');
      }
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้');
    }
  };

  // แสดง loading ขณะตรวจสอบ authentication
  if (isCheckingAuth) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#c28c35ff" />
          <Text style={styles.loadingText}>กำลังตรวจสอบ...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with Logo */}
          <View style={styles.header}>
            <Image
              source={require('../Picture/LogoPJ.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tab, styles.activeTab]}
                onPress={() => {}}
              >
                <Text style={[styles.tabText, styles.activeTabText]}>Login</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.tab}
                onPress={handleSignUp}
              >
                <Text style={styles.tabText}>Sign up</Text>
              </TouchableOpacity>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!isLoading}
                />
                <View style={styles.inputUnderline} />
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  editable={!isLoading}
                />
                <View style={styles.inputUnderline} />
                <Text style={styles.demoText}>
                  💡 ใช้บัญชี Supabase ของคุณ
                </Text>
              </View>

              {/* Login Button */}
              <TouchableOpacity 
                style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity 
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
                disabled={isLoading}
              >
                <Text style={styles.forgotPasswordText}>Forgot your password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles เหมือนเดิม
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b9f39bff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 1,
    paddingBottom: 20,
  },
  logo: {
    width: 300,
    height: 250,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    minHeight: 500,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#68874e',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#68874e',
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 0,
  },
  inputUnderline: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 4,
  },
  demoText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  loginButton: {
    backgroundColor: '#c28c35ff',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#e98f53ff',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b9f39bff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
});

export default LoginScreen;