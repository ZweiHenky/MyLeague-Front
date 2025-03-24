import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';

export const MyLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

        // Obtener la dirección a partir de las coordenadas
        let addressResponse = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            });

            // La respuesta es un array, tomamos el primer resultado
            setAddress(addressResponse[0]);
    }

    getCurrentLocation();
  }, []);

  let text = 'Cargando...';
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = `${address.street}, ${address.streetNumber} ${address.city}`;
  }

  return (
    <Text className='text-white w-80' numberOfLines={2} lineBreakMode="tail">{text}</Text>
  );
}

