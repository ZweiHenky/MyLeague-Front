import React, { useEffect, useRef } from 'react';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const key = process.env.EXPO_PUBLIC_GOOGLE_API;

interface Props {
    onPlaceSelected: (data:GooglePlaceData, details: GooglePlaceDetail  | null)=>void,
    value?:string
}


export const GooglePlacesInput = ({ onPlaceSelected,value }:Props) => {

    const ref = useRef(null);

    // Efecto para actualizar el valor del campo de entrada cuando cambia la prop `value`
    useEffect(() => {
      if (ref.current && value) {
        ref.current.setAddressText(value); // Actualiza el valor del campo de entrada
      }
    }, [value]);
  
    return (
      <GooglePlacesAutocomplete
        ref={ref} // Asigna la referencia al componente
        placeholder="Buscar"
        onPress={(data, details = null) => {
          if (onPlaceSelected) {
            onPlaceSelected(data, details);
          }
        }}
        query={{
          key: "AIzaSyAiAX2cRtiBDPvKIPo3v9QOHsbEepnoFac", // Reemplaza con tu clave de API
          language: 'es',
        }}
        fetchDetails={true}
        listViewDisplayed="auto"
        enablePoweredByContainer={false}
        disableScroll={true}
        textInputProps={{
          defaultValue: value, // Asigna el valor por defecto (aunque esto no siempre funciona)
        }}
      />
  );
};