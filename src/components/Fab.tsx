/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleProp, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const Fab = ({iconName, onPress, style}: Props) => {
  return (
    <View
        style={{...style as any}}
    >
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.blackButton}
        >
            <Icon
                name={iconName}
                color="white"
                size={35}
                style={{left: 1}}
            />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    blackButton: {
        zIndex: 9999,
        backgroundColor: 'black',
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            height: 4,
            width: 0,
        },
        shadowRadius: 5,
        elevation: 6,
        shadowOpacity: 0.24,
    },
});
