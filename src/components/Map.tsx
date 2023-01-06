/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Fab} from './Fab';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const Map = ({}: Props) => {
  const [showPolyline, setShowPolyline] = useState(true);
  const {
    hasLocation,
    initialPosition,
    userLocation,
    userRoute,
    getCurrentLocation,
    followUserLocation,
    cancelFollowUserLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const isFollowing = useRef<boolean>();

  useEffect(() => {
    followUserLocation();
    return () => {
      cancelFollowUserLocation();
    };
  }, []);

  useEffect(() => {

    if (isFollowing.current) return;

    mapViewRef.current?.animateCamera({
      center: userLocation,
    });
  }, [userLocation]);

  const centerLocation = async () => {
    const location = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: location,
    });
    isFollowing.current = false;
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => isFollowing.current = true}
      >
        {
          showPolyline && (
            <Polyline
              coordinates={userRoute}
              strokeColor="black"
              strokeWidth={5}
            />
          )
        }
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerLocation}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(prev => !prev)}
        style={{
          position: 'absolute',
          bottom: 70,
          right: 10,
        }}
      />
    </>
  );
};
