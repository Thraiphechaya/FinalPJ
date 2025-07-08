import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // ปรับ path ตามจริง

import RegisterScreen from './RegisterScreen';

type Login = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

type Register = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>
};

const LoginScreen: React.FC<Login> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('กรุณากรอกข้อมูลให้ครบ');
    } else {
      navigation.navigate('Home');
    }
  };

  const gotoRegister = () => {
    navigation.navigate('Register');
  }

 return (
    <View style={styles.container}>
      <Text style={styles.title}>เข้าสู่ระบบ</Text>
      <TextInput
        style={styles.input}
        placeholder="อีเมล"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={gotoRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#faebd9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#68874e',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#68874e',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2c3e50',
    marginBottom: 14,
  },
  loginButton: {
    backgroundColor: '#68874e',
    borderRadius: 19,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 15,
    width: '50%',
  
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
