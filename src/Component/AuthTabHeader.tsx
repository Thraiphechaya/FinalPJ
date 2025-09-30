import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

interface AuthTabHeaderProps {
  activeTab: 'login' | 'signup';
}

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AuthTabHeader: React.FC<AuthTabHeaderProps> = ({ activeTab }) => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const handleLoginPress = () => {
    if (activeTab !== 'login') {
      navigation.navigate('Login');
    }
  };

  const handleSignupPress = () => {
    if (activeTab !== 'signup') {
      navigation.navigate('Register');
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={handleLoginPress}
        disabled={activeTab === 'login'}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'login' ? styles.activeTabText : styles.inactiveTabText
        ]}>
          Login
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={handleSignupPress}
        disabled={activeTab === 'signup'}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'signup' ? styles.activeTabText : styles.inactiveTabText
        ]}>
          Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: '600',
    color: '#000',
  },
  inactiveTabText: {
    fontWeight: '400',
    color: '#666',
  },
});

export default AuthTabHeader;