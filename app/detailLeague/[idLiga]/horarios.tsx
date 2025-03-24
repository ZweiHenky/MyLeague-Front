import Loading from '@/presentation/components/auth/loading';
import HorarioItem from '@/presentation/components/detailLeagues/horarioItem';
import ResultItem from '@/presentation/components/detailLeagues/resultItem';
import { useDetailLeagueStore } from '@/presentation/store/detailAllLeague/useDetailLeagueStore';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

const Horarios = () => {
  
  const {divisionActual} = useDetailLeagueStore()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(divisionActual?.ultimaJornada.partidos[0].fecha); // Fecha seleccionada por defecto (TODAY)

  useEffect(() => {

    if (divisionActual && divisionActual.ultimaJornada.partidos.length > 0) {
      setSelectedDate(divisionActual.ultimaJornada.partidos[0].fecha)
    }

  }, [divisionActual])
  
  
  const fechas = new Set(divisionActual?.ultimaJornada.partidos.map(el=>(el.fecha)))  

  const arrayFechasFromSet = [...fechas]

  const arrayFechas = arrayFechasFromSet.filter(el => el != null)

  const itemWidth = screenWidth / 3.5; // Para que se vean al menos 3 elementos

  const partidoActuales = divisionActual?.ultimaJornada.partidos.filter(el => el.fecha === selectedDate) 

  
  // Renderizar cada item del carrusel
  const renderDateItem = ({ item }:any) => (
    <View style={[styles.dateItem, { width: itemWidth }]}>
      <Text >{item?.toLocaleString()}</Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      {/* Carrusel de fechas */}
      <Carousel
        data={arrayFechas}
        renderItem={renderDateItem}
        defaultIndex={0}
        width={itemWidth}
        height={60}
        onSnapToItem={(index) => {

          const fechaActual = arrayFechas[index]

          setSelectedDate(fechaActual)
        }}
        loop={false}
        pagingEnabled={true} // Permitir deslizamiento libre
        snapEnabled={true} // Desactivar snapping
        style={{ 
          width: screenWidth,     
          alignItems: 'center',
          justifyContent: 'center'
         }} // Hacer que el carrusel ocupe todo el ancho
      />

      {/* Lista de partidos de la fecha seleccionada */}
      <FlatList
        data={partidoActuales}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <HorarioItem match={item} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={()=><View className='h-10'/>}
      />

      <View className='h-4' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:4,
    // backgroundColor: '#fff',
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
});

export default Horarios;
