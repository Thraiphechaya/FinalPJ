import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Tabbar from '../Component/Tabbar';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> TEST_HOMESCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
  },
});

export default HomeScreen;