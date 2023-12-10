// StudentReservationScreen -> DateReservtionScreen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore } from '../../config/firebaseConfig';
import { doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { auth } from '../../config/firebaseConfig';

const DateReservtionScreen = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userName, setUserName] = useState('Unknown User');
  const [unavailableTimes, setUnavailableTimes] = useState([]);

  const fetchDesignerReservations = async (designerId, selectedDate) => {
    const designerDocRef = doc(firestore, `designers/${designerId}`);
    const docSnap = await getDoc(designerDocRef);

    if (docSnap.exists()) {
      const reservations = docSnap.data().reservations || [];
      const today = new Date();
      const selectedDateTime = new Date(selectedDate);

      // 콘솔 로그로 예약 데이터 및 현재 날짜와 시간을 확인합니다.
      console.log("예약 데이터:", reservations);
      console.log("선택된 날짜:", selectedDate, "오늘 날짜:", today.toLocaleDateString(), "현재 시간:", today);

      let timesForDate = reservations
        .filter(reservation => reservation.date === selectedDate)
        .map(reservation => reservation.time);

      // 선택된 날짜가 오늘 날짜 이전인 경우, 모든 시간을 사용할 수 없도록 설정합니다.
      if (selectedDateTime < today) {
        timesForDate = times;
      } else if (selectedDate === today.toLocaleDateString()) {
        // 선택된 날짜가 오늘 날짜와 동일하면, 현재 시간 이전의 시간대를 예약할 수 없도록 추가
        const pastTimes = times.filter(time => {
          const reservationTime = new Date(`${selectedDate} ${time}`);
          return reservationTime < today;
        });

        // 콘솔 로그로 필터링된 과거 시간대를 확인합니다.
        console.log("현재 시간 이전의 시간대:", pastTimes);

        timesForDate = [...timesForDate, ...pastTimes];
      }

        // 최종 사용할 수 없는 시간대를 콘솔 로그로 확인합니다.
        console.log("사용할 수 없는 시간대:", timesForDate);
        setUnavailableTimes(timesForDate);
      } else {
        console.log("해당 디자이너의 예약 데이터가 없습니다.");
      }
  };

  const fetchUserName = async () => {
    if (auth.currentUser) {
      const firestoreRef = doc(firestore, `users/${auth.currentUser.uid}`);
      const docSnap = await getDoc(firestoreRef);
  
      if (docSnap.exists()) {
        return docSnap.data().name; // 사용자의 이름을 반환
      }
    }
    return 'Unknown User'; // 문서가 없거나, 사용자 이름이 설정되지 않은 경우
  };


  // Ensure the times array has four time slots per each row
  const times = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

  useEffect(() => {
    // 날짜와 디자이너 ID가 설정되어 있을 때, 예약된 시간을 가져옴
    if (date && route.params.designerId) {
      fetchDesignerReservations(route.params.designerId, date.toLocaleDateString());
    }
  
    // Firestore에서 현재 사용자의 이름을 가져오는 함수
    const getUserName = async () => {
      const name = await fetchUserName();
      setUserName(name);
      console.log("Firestore에서 가져온 사용자 이름:", name);
    };
  
    // 사용자 이름 가져오기
    getUserName();
  }, [date, route.params.designerId]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    if (currentDate >= new Date()) {
      setDate(currentDate);
      fetchDesignerReservations(route.params.designerId, currentDate.toLocaleDateString());
    }
  };

  const showMode = () => {
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
          {timeRow.map((time, index) => {
            const isUnavailable = unavailableTimes.includes(time);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot, 
                  selectedTime === time && styles.selectedTimeSlot, 
                  isUnavailable && styles.unavailableTimeSlot
                ]}
                onPress={() => !isUnavailable && handleSelectTime(time)}
                disabled={isUnavailable}
              >
                <Text style={styles.timeSlotText}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    return rows;
  };
  

  const saveReservation = async (reservationDetails) => {
    const userDocRef = doc(firestore, `users/${auth.currentUser.uid}`);
    const designerDocRef = doc(firestore, `designers/${route.params.designerId}`);

    const userReservation = {
      designerName: reservationDetails.designerName,
      salonName: reservationDetails.salonName,
      serviceName: reservationDetails.serviceName,
      servicePrice: reservationDetails.servicePrice,
      date: reservationDetails.selectedDate,
      time: reservationDetails.selectedTime,
    };

    const designerReservation = {
      userName: userName,
      serviceName: reservationDetails.serviceName,
      date: reservationDetails.selectedDate,
      time: reservationDetails.selectedTime,
    };

    try {
      await setDoc(userDocRef, {
        reservations: arrayUnion(userReservation),
      }, { merge: true });
  
      await setDoc(designerDocRef, {
        reservations: arrayUnion(designerReservation),
      }, { merge: true });
    } catch (error) {
      console.error("Error saving reservation:", error);
    }
  };

  const onNextPress = () => {
    if (date && selectedTime) {
      if (!route.params.designerId) {
        console.error("designerId is undefined");
        return; // designerId가 없으면 함수를 종료합니다.
      }
      const paramsToPass = {
        ...route.params, // Spread operator to pass along all previous parameters
        selectedDate: date.toLocaleDateString(),
        selectedTime: selectedTime,
      };
  
      saveReservation(paramsToPass);
  
      navigation.navigate('FinalReservation', paramsToPass);
    } else {
      alert("Please select both a date and a time.");
    }
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
            minimumDate={new Date()}
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
      <TouchableOpacity style={styles.confirmButton} onPress={onNextPress}>
        <Text style={styles.confirmButtonText}>예약</Text>
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
    backgroundColor: '#007bff',
  },
  timeSlotText: {
    fontSize: 16,
  },
  confirmButton: {
    padding: 15,
    backgroundColor: '#007bff',
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
  unavailableTimeSlot: {
    backgroundColor: 'red',
  },
});

export default DateReservtionScreen;