import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlackButton } from '../components/BlackButton';
import { PermissionsContext } from '../context/permissions/PermissionsContext';

export const PermissionsScreen = () => {
  const { requestLocationPermission, permissions } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
        <Text style={styles.textInfo} >Para usar esta aplicación es necesario tener los permisos del GPS.</Text>
        <BlackButton
          title="Permiso"
          onPress={requestLocationPermission}
        />
        <Text>{JSON.stringify(permissions)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    width: 250,
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
