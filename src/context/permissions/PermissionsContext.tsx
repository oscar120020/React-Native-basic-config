import { createContext } from 'react';
import { PermissionsState } from './PermissionsProvider';

interface ContextProps {
    permissions: PermissionsState;
    checkLocationPermission: () => void;
    requestLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as ContextProps);
