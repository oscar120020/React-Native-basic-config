import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigation/StackNavigator';
import {PermissionsProvider} from './src/context/permissions/PermissionsProvider';

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
