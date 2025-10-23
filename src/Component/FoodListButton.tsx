import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export const FoodListButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => navigation.navigate('FoodList')}
    >
      <Text style={styles.buttonText}>🍽️</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    fontSize: 28,
  },
});

export default FoodListButton