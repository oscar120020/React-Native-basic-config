import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingScreen = () => {
  return (
    <View style={styles.container} >
        <ActivityIndicator size={30}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
