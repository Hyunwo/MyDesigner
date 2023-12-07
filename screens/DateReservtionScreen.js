// StudentReservationScreen -> DateReservtionScreen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateReservtionScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Ensure the times array has four time slots per each row
  const times = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    if (currentDate >= new Date()) {
      setDate(currentDate);
    }
  };

  const showMode = (currentMode) => {
    setShowDatePicker(true);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  // Render time slots in a grid layout with four slots per row
  const renderTimeSlots = () => {
    let rows = [];
    for (let i = 0; i < times.length; i += 4) {
      let timeRow = times.slice(i, i + 4);
      rows.push(
        <View key={i} style={styles.timeSlotRow}>
          {timeRow.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
              onPress={() => handleSelectTime(time)}
            >
              <Text style={styles.timeSlotText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => showMode('date')} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>날짜 선택: {date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display="calendar"
            onChange={onChange}
            minimumDate={new Date()} // Restrict past dates
          />
        )}
      </View>

      <View style={styles.timeSlotsContainer}>
        {renderTimeSlots()}
      </View>

      {selectedTime && (
        <Text style={styles.selectedDateTime}>
          선택한 날짜와 시간: {date.toLocaleDateString()} {selectedTime}
        </Text>
      )}


      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('')}>
        <Text style={styles.confirmButtonText}>다음</Text>
      </TouchableOpacity>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  datePickerText: {
    fontSize: 18,
  },
  timeSlot: {
    width: '22%',
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#00f',
  },
  timeSlotText: {
    fontSize: 16,
  },
  confirmButton: {
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
  },
  selectedDateTime: {
    margin: 16,
    fontSize: 16,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  timeSlotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
});

export default DateReservtionScreen;