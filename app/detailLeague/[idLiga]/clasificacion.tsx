import { useDetailLeagueStore } from '@/presentation/store/detailAllLeague/useDetailLeagueStore';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';

export default function Clasificacion() {
  const { divisionActual } = useDetailLeagueStore();

  let validate = divisionActual?.partidos.filter(partidos => {
    if (!divisionActual.ultimaJornada.partidos.find(ultimoPartido => ultimoPartido.id == partidos.id)) {
      return partidos
    }
    return
  }) || [];

  const partidos = divisionActual?.partidos || []

  let noJornada = true

  if (validate.length == 0) {
    noJornada = false
  }


  // Inicializar un objeto para almacenar las estadísticas de cada equipo
  const estadisticasEquipos = {};

  partidos.forEach(partido => {
    const { equipoLocal, equipoVisitante, golesLocal, golesVisitante } = partido;

    // Inicializar estadísticas si no existen
    if (!estadisticasEquipos[equipoLocal.id]) {
      estadisticasEquipos[equipoLocal.id] = {
        nombre: equipoLocal.nombre,
        G: 0,
        E: 0,
        P: 0,
        GF: 0,
        GC: 0,
        PTS: 0,
      };
    }

    if (!estadisticasEquipos[equipoVisitante.id]) {
      estadisticasEquipos[equipoVisitante.id] = {
        nombre: equipoVisitante.nombre,
        G: 0,
        E: 0,
        P: 0,
        GF: 0,
        GC: 0,
        PTS: 0,
      };
    }

    // Actualizar goles a favor y en contra
    estadisticasEquipos[equipoLocal.id].GF += golesLocal;
    estadisticasEquipos[equipoLocal.id].GC += golesVisitante;

    estadisticasEquipos[equipoVisitante.id].GF += golesVisitante;
    estadisticasEquipos[equipoVisitante.id].GC += golesLocal;

    // Determinar el resultado del partido y actualizar estadísticas
    if (golesLocal > golesVisitante) {
      estadisticasEquipos[equipoLocal.id].G += 1;
      estadisticasEquipos[equipoLocal.id].PTS += 3;
      estadisticasEquipos[equipoVisitante.id].P += 1;
    } else if (golesLocal < golesVisitante) {
      estadisticasEquipos[equipoVisitante.id].G += 1;
      estadisticasEquipos[equipoVisitante.id].PTS += 3;
      estadisticasEquipos[equipoLocal.id].P += 1;
    } else {
      estadisticasEquipos[equipoLocal.id].E += 1;
      estadisticasEquipos[equipoLocal.id].PTS += 1;
      estadisticasEquipos[equipoVisitante.id].E += 1;
      estadisticasEquipos[equipoVisitante.id].PTS += 1;
    }
  });

  // Convertir el objeto a un array y ordenar por puntos
  const clasificacion = Object.values(estadisticasEquipos).sort((a, b) => b.PTS - a.PTS);
  

  return (
    <ScrollView className='flex-1 p-2'>
      <View className='flex flex-row justify-between py-3 '>
        <Text className='text-center w-[15%] text-gray-500'>#</Text>
        <Text className='w-[30%] text-gray-500'>Equipo</Text>
        <Text className='text-center w-[10%] text-gray-500'>G</Text>
        <Text className='text-center w-[10%] text-gray-500'>E</Text>
        <Text className='text-center w-[10%] text-gray-500'>P</Text>
        <Text className='text-center w-[15%] text-gray-500'>GF/GC</Text>
        <Text className='text-center w-[10%] text-gray-500'>PTS</Text>
      </View>
      {

        clasificacion.map((equipo, index) => (
          <View key={index} className='flex flex-row justify-between py-3 items-center'>
            <View className='w-[15%] justify-center items-center'>
             <Text className='text-center w-[50%] h-auto bg-light-primary text-white p-2 rounded-3xl'>{index + 1}</Text>
            </View>
            <Text className='w-[30%]'>{equipo.nombre}</Text>
            <Text className='text-center w-[10%]'>{equipo.G}</Text>
            <Text className='text-center w-[10%]'>{noJornada ? equipo.E : 0}</Text>
            <Text className='text-center w-[10%]'>{equipo.P}</Text>
            <Text className='text-center w-[15%]'>{`${equipo.GF}/${equipo.GC}`}</Text>
            <Text className='text-center w-[10%]'>0</Text>
          </View>
        ))
      }
      <View className='h-10' />
    </ScrollView>
  );
}