import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useRef } from 'react'
import DetailMatchdayItem from '@/presentation/components/matchdays/detailMatchItem'
import { useMatchday } from '@/hooks/matchDay/useMatchday'
import { useLocalSearchParams } from 'expo-router'

export default function DetailMatchday() {

  const {idMatchday} = useLocalSearchParams()

  const {queryDetailMatchday} = useMatchday({idMatchday:Number(idMatchday)})

    // Verificar si hay datos
    if (!queryDetailMatchday.isFetched) {
      return (
        <View className='flex-1 justify-center items-center'>
          <Text>Cargando partidos...</Text>
        </View>
      );
    }

  // Función para agrupar partidos por fecha
  const partidosAgrupados = queryDetailMatchday.data?.data.partidos.reduce((acc, partido) => {
    const fecha = partido.fecha;
    if (!acc[fecha]) {
      acc[fecha] = [];
    }
    acc[fecha].push(partido);
    return acc;
  }, {});


  // Función para formatear la fecha y obtener el día de la semana
  const formatearFecha = (fecha) => {
    try {
      const fechaObj = new Date(fecha);
      if (isNaN(fechaObj.getTime())) {
        throw new Error('Fecha inválida');
      }
      const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return fechaObj.toLocaleDateString('es-ES', opciones); // 'es-ES' para español
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Fecha inválida';
    }
  };

  // Convertir el objeto agrupado en un array plano para el FlatList
  const datosParaFlatList = Object.keys(partidosAgrupados).flatMap((fecha) => [
    { tipo: 'fecha', contenido: formatearFecha(fecha) }, // Separador de fecha
    ...partidosAgrupados[fecha].map((partido) => ({ tipo: 'partido', contenido: partido })), // Partidos
  ]);

  const renderItem = ({ item }) => {
    if (item.tipo === 'fecha') {
      // Renderizar el separador de fecha
      return (
        <View className='w-full p-4'>
          <Text className='text-center text-xl '>{item.contenido}</Text>
        </View>
      );
    } else if (item.tipo === 'partido') {
      // Renderizar el partido
      return <DetailMatchdayItem match={item.contenido} />;
    }
    return null;
  };
  

  return (
    <View className='flex-1 w-[95%] mx-auto'>

      <FlatList
        data={datosParaFlatList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      
    </View>
  )
}