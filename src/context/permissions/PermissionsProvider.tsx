import React, { useState, useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request, check, openSettings } from 'react-native-permissions';
import { PermissionsContext } from './PermissionsContext';

export interface PermissionsState {
    locationStatus: PermissionStatus
}

const INITIAL_STATE: PermissionsState = {
    locationStatus: 'unavailable',
};

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PermissionsProvider = ({ children }: Props) => {
    const [permissions, setPermissions] = useState(INITIAL_STATE);

    useEffect(() => {
        AppState.addEventListener('change', (value) => {
            if (value !== 'active') return;

            checkLocationPermission();
        });
    }, []);

    const checkLocationPermission = async() => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios'){
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        setPermissions(prev => ({...prev, locationStatus: permissionStatus}));
    };

    const requestLocationPermission = async() => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios'){
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if (permissionStatus === 'blocked'){
            openSettings();
        }

        setPermissions(prev => ({...prev, locationStatus: permissionStatus}));
    };

    return (
        <PermissionsContext.Provider
          value={{
            permissions,
            checkLocationPermission,
            requestLocationPermission,
          }}
        >
            {children}
        </PermissionsContext.Provider>
    )
}