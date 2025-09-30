import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import AuthTabHeader from '../Component/AuthTabHeader';


type Login = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#7ED321" />
      
      {/* Header */}
      <AuthTabHeader activeTab="login" />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationText}>🥕🥬🍇🍊</Text>
          <Text style={styles.illustrationSubtext}>Fresh & Healthy</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ED321',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  illustrationText: {
    fontSize: 48,
    marginBottom: 10,
  },
  illustrationSubtext: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
    marginTop: 1,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#FF9500',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;