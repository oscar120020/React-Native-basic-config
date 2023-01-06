/* eslint-disable react-hooks/exhaustive-deps */
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState, useRef } from 'react';
import { Location } from '../interfaces/appInterfaces';


export const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setinitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });
    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });
    const [userRoute, setUserRoute] = useState<Location[]>([]);
    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        getCurrentLocation()
            .then(location => {

                if (!isMounted.current) return;

                setinitialPosition(location);
                setUserLocation(location);
                setUserRoute((route) => [...route, location]);
                setHasLocation(true);
            });
        return () => {
            isMounted.current = false;
        };
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    });
                },
                (err) => reject(err),
                {enableHighAccuracy: true, timeout: 5000}
            );
        });
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({coords}) => {

                if (!isMounted.current) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                };

                setUserLocation(location);
                setUserRoute((route) => [...route, location]);
            },
            (err) => console.log({err}),
            {enableHighAccuracy: true, distanceFilter: 10}
        );
    };

    const cancelFollowUserLocation = () => {
        if (watchId.current)
            Geolocation.clearWatch(watchId.current);
    };

    return {
        hasLocation,
        initialPosition,
        userLocation,
        userRoute,
        getCurrentLocation,
        followUserLocation,
        cancelFollowUserLocation,
    };
};
