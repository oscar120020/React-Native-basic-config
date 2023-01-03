import React from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const BlackButton = ({ title, onPress, style }: Props) => {
  return (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{
            ...styles.blackButton,
            ...style as any,
        }}
    >
        <Text style={styles.buttonText} >{ title }</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    elevation: 6,
    shadowOpacity: 0.2,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
