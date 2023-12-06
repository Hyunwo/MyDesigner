import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const StudentcutReservationScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // 예제를 위한 시간 슬롯 배열
  const times = ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>날짜 선택</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <ScrollView horizontal style={styles.timeSlots}>
        {times.map((time, index) => (
          <TouchableOpacity key={index} style={styles.timeSlot}>
            <Text style={styles.timeSlotText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 예약 확인 버튼 */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>예약하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  datePickerButton: {
    margin: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  datePickerText: {
    textAlign: 'center',
    fontSize: 18,
  },
  timeSlots: {
    flexDirection: 'row',
    padding: 20,
  },
  timeSlot: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  timeSlotText: {
    fontSize: 16,
  },
  confirmButton: {
    margin: 20,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  confirmButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});

export default StudentcutReservationScreen;