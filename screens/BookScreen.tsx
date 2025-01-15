import React, {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput,
  View, 
  TouchableOpacity, 
  ScrollView,
  Alert, 
  FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ModalSelector from 'react-native-modal-selector';

const BookScreen = ({ navigation }) => {

  //states for new booking
  const [name, setName] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('+33'); //default french prefix +33
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('18h'); //default time 18h

  //handler date selection
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  //handler time selection
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  //possible times
  const timeSlots = ['18h', '18h30', '19h', '19h30', '20h', '20h30'];

  //phone preffixes possibles
  const phonePrefixes = [
    { key: 1, label: '+33' },
    { key: 2, label: '+1' },
    { key: 3, label: '+44' },
    { key: 4, label: '+49' },
    { key: 5, label: '+61' },
    { key: 6, label: '+91' }
  ];

  // function to handle the booking submission
  const handleBooking = async () => {
    if (!name || !phone || !selectedDate || !selectedTime) {
      Alert.alert('Please fill all the fields');
      return;
    }

    //defining the struct appointmentData we will send to the API
    const appointmentData = {
      name,
      phonePrefix,
      phoneNumber: phone,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const response = await fetch('http://127.0.0.1:8080/bookings',
        {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (response.ok) {
        const message = await response.text();
        Alert.alert('Success', message);
        resetForm(); // calling reset form function
      } else {
        throw new Error('Failed to add booking');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // reset form function (after submission) put every values back to default
  const resetForm = () => {
    setName('');
    setPhone('');
    setSelectedDate('');
    setSelectedTime('18h');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Retour</Text>
      </TouchableOpacity>

      {/*title*/}
      <View style={styles.orderPageHeader}>
        <Text style={styles.headerTitle}>BOOK A TABLE</Text>
      </View>

    
      <ScrollView style={styles.formContainer}>
        {/* form to complete to reserve a table */}

        {/* under title 'booking from'*/}
        <View style={styles.orderPageHeader}>
          <Text style={styles.headerUnderTitle}>Booking form</Text>
        </View>

        {/* name input */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
            />
        </View>

        {/* phone number input - divided in 2 imputs (prefix + number) */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
            {/* prefix ModalSelector */}
            <ModalSelector
                data={phonePrefixes}
                initValue={phonePrefix}
                onChange={(option) => setPhonePrefix(option.label)} // Mise à jour du préfixe
                style={styles.phonePrefix}
                initValueTextStyle={styles.initValueTextStyle}
            />

            {/* phone number */}
            <TextInput
                style={[styles.textInput, styles.phoneNumberInput]}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
        </View>

        {/* calendar view */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Choose a date</Text>
            <Calendar
            onDayPress={onDayPress}
            markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: '#909090' }
            }}
            theme={{
                selectedDayBackgroundColor: '#909090',
                todayTextColor: '#007BFF',
                arrowColor: '#909090',
            }}
            />
        </View>

        {/* time selection from 6 buttons */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Choose a time</Text>
            <View style={styles.timeContainer}>
            {timeSlots.map((time, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => handleTimeSelection(time)}
                style={[
                    styles.timeButton,
                    selectedTime === time && styles.activeTimeButton //rendering regarding the selected button
                ]}
                >
                <Text style={styles.timeButtonText}>{time}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
  
        {/* final button (call the handleBooking funciton to send POST request on a click) */}
        <TouchableOpacity style={styles.submitButton} onPress={handleBooking}>
            <Text style={styles.submitButtonText}>Confirm appointment</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backButton: {
      marginBottom: 6,
      padding: 10,
      backgroundColor: '#eee',
      borderRadius: 5,
    },
    backButtonText: {
      fontSize: 18,
      color: '#007BFF',
    },
    headerTitle:{
        fontSize: 30,
        color: '#000',
        fontFamily: 'Optima',
    },
    headerUnderTitle :{
      fontSize: 20,
      color: '#000',
      fontFamily: 'Optima',
    },
    orderPageHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 8,
      },
    formContainer: {
      paddingHorizontal:20,
      marginBottom:10,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      marginBottom: 5,
      fontFamily: 'Optima',
      color: '#333',
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      fontSize: 16,
    },
    timeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    timeButton: {
      width: '30%', //3 buttons per line
      paddingVertical: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 5,
    },
    activeTimeButton: {
      backgroundColor: '#c0c0c0',
    },
    timeButtonText: {
      fontSize: 16,
      color: '#333',
    },
    submitButton: {
      backgroundColor: '#909090',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 30,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'Optima',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      phonePrefix: {
        width: '20%',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
      },
      phoneNumberInput: {
        flex: 1,
      },
      initValueTextStyle: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#000',
      },
      appointmentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom:10,
      },
  });