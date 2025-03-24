import React, { useState } from 'react';
import { SafeAreaView, Text, Pressable, StyleSheet, Modal, View, ScrollView, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import ThemeInput from '@/presentation/shared/ThemedInput';
import { object } from 'yup';
import { useMatchDayMutation } from '@/hooks/matchDay/useMatchDayMutation';
import { useLocalSearchParams } from 'expo-router';

export default function GenerateMatchDay() {
  const [selectedDates, setSelectedDates] = useState({}); // Fechas seleccionadas
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // Visibilidad del calendario
  const [selectedOption, setSelectedOption] = useState('option1'); // Opción seleccionada (1 o 2)
  const [commonStartTime, setCommonStartTime] = useState(new Date()); // Hora inicial común
  const [commonEndTime, setCommonEndTime] = useState(new Date()); // Hora final común
  const [individualTimes, setIndividualTimes] = useState({}); // Horas individuales por fecha
  const [showTimePicker, setShowTimePicker] = useState({}); // Controla la visibilidad del TimePicker
  const [numero, setNumero] = useState<string>()
  const [intervalo, setIntervalo] = useState<string>()

  const {idDivision} = useLocalSearchParams()

  const {queryMatchdayMutation} = useMatchDayMutation()

  // Función para manejar la selección de fechas
  const handleDayPress = (day) => {
    const dateString = day.dateString; // Fecha en formato 'YYYY-MM-DD'

    // Copia el estado actual de las fechas seleccionadas
    const updatedSelectedDates = { ...selectedDates };

    // Si la fecha ya está seleccionada, la eliminamos; de lo contrario, la agregamos
    if (updatedSelectedDates[dateString]) {
      delete updatedSelectedDates[dateString];
      // Si la opción 2 está seleccionada, eliminamos también las horas individuales
      if (selectedOption === 'option2') {
        const updatedIndividualTimes = { ...individualTimes };
        delete updatedIndividualTimes[dateString];
        setIndividualTimes(updatedIndividualTimes);
      }
    } else {
      updatedSelectedDates[dateString] = { selected: true, selectedColor: 'blue' };
    }

    // Actualiza el estado con las nuevas fechas seleccionadas
    setSelectedDates(updatedSelectedDates);
  };

  // Función para manejar el cambio de horas comunes
  const handleCommonTimeChange = (type, event, selectedTime) => {
    if (selectedTime) {
      if (type === 'start') {
        setCommonStartTime(selectedTime);
      } else if (type === 'end') {
        setCommonEndTime(selectedTime);
      }
    }
    setShowTimePicker({ ...showTimePicker, [type]: false }); // Oculta el TimePicker
  };

  // Función para manejar el cambio de horas individuales
  const handleIndividualTimeChange = (date, type, event, selectedTime) => {
    if (selectedTime) {
      const updatedIndividualTimes = { ...individualTimes };
      if (!updatedIndividualTimes[date]) {
        updatedIndividualTimes[date] = { startTime: new Date(), endTime: new Date() };
      }
      if (type === 'start') {
        updatedIndividualTimes[date].startTime = selectedTime;
      } else if (type === 'end') {
        updatedIndividualTimes[date].endTime = selectedTime;
      }
      setIndividualTimes(updatedIndividualTimes);
    }
    setShowTimePicker({ ...showTimePicker, [date + type]: false }); // Oculta el TimePicker
  };

  // Función para formatear la fecha con el día de la semana
  const formatDateWithWeekday = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // Convertir las fechas seleccionadas a un formato legible
  const selectedDatesList = Object.keys(selectedDates).map((date) => (
    <View key={date} style={styles.dateItem}>
      <Text style={styles.dateText}>
        {formatDateWithWeekday(date)} {/* Muestra el día de la semana y la fecha */}
      </Text>
      {selectedOption === 'option2' && (
        <View style={styles.timeInputContainer}>
          <Pressable
            style={styles.timeButton}
            onPress={() => setShowTimePicker({ ...showTimePicker, [date + 'start']: true })}
          >
            <Text style={styles.timeButtonText}>
              {individualTimes[date]?.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Pressable>
          <Text style={styles.timeSeparator}>-</Text>
          <Pressable
            style={styles.timeButton}
            onPress={() => setShowTimePicker({ ...showTimePicker, [date + 'end']: true })}
          >
            <Text style={styles.timeButtonText}>
              {individualTimes[date]?.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </Pressable>
        </View>
      )}
      {(showTimePicker[date + 'start'] || showTimePicker[date + 'end']) && (
        <DateTimePicker
          value={individualTimes[date]?.[showTimePicker[date + 'start'] ? 'startTime' : 'endTime'] || new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => handleIndividualTimeChange(date, showTimePicker[date + 'start'] ? 'start' : 'end', event, selectedTime)}
        />
      )}
    </View>
  ));

  const onSubmit = async() =>{

    const dias = Object.keys(selectedDates).map(fecha => ({
      dias:fecha,
      horaInicio:commonStartTime.toLocaleString("en-US", { hour12: false }).split(",")[1].split(" ")[1],
      horaFinal:commonEndTime.toLocaleString("en-US", { hour12: false }).split(",")[1].split(" ")[1]
    }))

    const data = {
      dias,
      numero:Number(numero),
      lapsoTiempo:Number(intervalo),
      divisionId: Number(idDivision)
    }

    queryMatchdayMutation.mutate(data)

  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>

        <Text className='py-2 text-lg'>Numero de la jornada</Text>
        <ThemeInput keyboardType="numeric" placeholder='Ingresar el numero' onChangeText={setNumero} />
        <Text className='py-2 text-lg'>Duracion por partido</Text>
        <ThemeInput keyboardType="numeric" placeholder='Intervalo de tiempo para cada partido' onChangeText={setIntervalo} />

        {/* Botón para desplegar el calendario */}
        <Pressable
          style={styles.button}
          onPress={() => setIsCalendarVisible(!isCalendarVisible)}
        >
          <Text style={styles.buttonText}>
            {isCalendarVisible ? 'Ocultar Calendario' : 'Seleccionar Fechas'}
          </Text>
        </Pressable>

        {/* Modal para mostrar el calendario */}
        <Modal
          visible={isCalendarVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsCalendarVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleDayPress} // Maneja la selección de fechas
                markedDates={selectedDates} // Resalta las fechas seleccionadas
                markingType="multi-dot" // Estilo de marcado
                theme={{
                  calendarBackground: '#ffffff',
                  selectedDayBackgroundColor: 'blue',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: 'blue',
                  dayTextColor: '#2d4150',
                }}
              />
              <Pressable
                style={styles.closeButton}
                onPress={() => setIsCalendarVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Mostrar las fechas seleccionadas */}
        {selectedDatesList.length > 0 && (
          <View style={styles.selectedDatesContainer}>
            <Text style={styles.title}>Fechas seleccionadas:</Text>
            <ScrollView>
              {selectedDatesList}
            </ScrollView>
          </View>
        )}

        {/* Mostrar opciones de selección si hay fechas seleccionadas */}
        {selectedDatesList.length > 0 && (
          <View style={styles.radioButtonContainer}>
            <Text style={styles.radioButtonTitle}>Selecciona una opción:</Text>
            <RadioButton.Group
              onValueChange={(value) => setSelectedOption(value)}
              value={selectedOption}
            >
              <View style={styles.radioButtonOption}>
                <RadioButton value="option1" />
                <Text style={styles.radioButtonText}>Asignar horas comunes a todos los días</Text>
              </View>
              <View style={styles.radioButtonOption}>
                <RadioButton value="option2" />
                <Text style={styles.radioButtonText}>Asignar horas individuales por día</Text>
              </View>
            </RadioButton.Group>

            {/* Mostrar TimePicker para horas comunes si la opción 1 está seleccionada */}
            {selectedOption === 'option1' && (
              <View style={styles.commonTimeContainer}>
                <Text style={styles.timeLabel}>Hora inicial común:</Text>
                <Pressable
                  style={styles.timeButton}
                  onPress={() => setShowTimePicker({ ...showTimePicker, start: true })}
                >
                  <Text style={styles.timeButtonText}>
                    {commonStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </Pressable>
                {showTimePicker.start && (
                  <DateTimePicker
                    value={commonStartTime}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedTime) => handleCommonTimeChange('start', event, selectedTime)}
                  />
                )}

                <Text style={styles.timeLabel}>Hora final común:</Text>
                <Pressable
                  style={styles.timeButton}
                  onPress={() => setShowTimePicker({ ...showTimePicker, end: true })}
                >
                  <Text style={styles.timeButtonText}>
                    {commonEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </Pressable>
                {showTimePicker.end && (
                  <DateTimePicker
                    value={commonEndTime}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedTime) => handleCommonTimeChange('end', event, selectedTime)}
                  />
                )}
              </View>
            )}

          </View>
          
        )}
        <Pressable className='w-full p-4 bg-light-primary rounded-xl mt-5' onPress={onSubmit}>
          <Text className='text-white text-xl text-center'>Agregar Jornada</Text>
        </Pressable>
        <View className='h-20'/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333333',
  },
  button: {
    width: '100%',
    backgroundColor: '#0E7C7B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    width: '90%',
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDatesContainer: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dateItem: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  timeSeparator: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#333333',
  },
  radioButtonContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  radioButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  radioButtonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333333',
  },
  commonTimeContainer: {
    marginTop: 16,
  },
  timeLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
});