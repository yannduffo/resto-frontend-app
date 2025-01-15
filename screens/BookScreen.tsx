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

  //infos for new booking
  const [name, setName] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('+33'); //default french prefix +33
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('18h'); //default time 18h
  //appointment list
  const [appointments, setAppointments] = useState([]);
  //editing state (for choosing between a PUT or a POST request)
  const [isEditing, setIsEditing] = useState(false);

  //load bookings and actialise on rendering
  useEffect(() => {
    fetchAppointments();
  }, []);

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

  // function to fetch appointments (using GET /bookings endpoint from API)
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/bookings');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        throw new Error('Failed to load bookings');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // function to handle the booking submission or update
  const handleBooking = async () => {
    if (!name || !phone || !selectedDate || !selectedTime) {
      Alert.alert('Please fill all the fields');
      return;
    }

    const appointmentData = {
      name,
      phonePrefix,
      phoneNumber: phone,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8080/bookings${isEditing ? `/${phone}` : ''}`,
        {
          method: isEditing ? 'PUT' : 'POST', //regarding editing or creating a new booking we adapt the http request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (response.ok) {
        const message = isEditing ? 'Booking updated successfully' : 'Booking added successfully';
        Alert.alert('Success', message);
        fetchAppointments(); //refresh the list for renderring
        resetForm(); // calling reset form function
      } else {
        throw new Error(isEditing ? 'Failed to update booking' : 'Failed to add booking');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // function to delete an appointment (using DELETE /bookings/{phone_number} endpoint from API)
  const deleteAppointment = async (phoneNumber) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/bookings/${phoneNumber}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'Booking deleted successfully');
        fetchAppointments(); // refresh the list for renderring
      } else {
        throw new Error('Failed to delete booking');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // function to start editing a booking
  const editAppointment = (appointment) => {
    setName(appointment.name);
    setPhonePrefix(appointment.phonePrefix);
    setPhone(appointment.phoneNumber);
    setSelectedDate(appointment.date);
    setSelectedTime(appointment.time);
    setIsEditing(true);
  };

  // reset form function (after submission)
  const resetForm = () => {
    setName('');
    setPhone('');
    setSelectedDate('');
    setSelectedTime('18h');
    setIsEditing(false); //going back to isEditing false
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

        {/* under title 'booking list'*/}
        <View style={styles.orderPageHeader}>
          <Text style={styles.headerUnderTitle}>Booking list</Text>
        </View>

        {/* printing the list of bookings */}
        <View>
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.phoneNumber}
            renderItem={({ item }) => (
              <View style={styles.appointmentItem}>
                {/* print booking infos */}
                <Text>{`${item.name} - ${item.date} ${item.time}`}</Text>
                {/* edit button */}
                <TouchableOpacity onPress={() => editAppointment(item)}> {/* calling editAppoint func and passing in isEditing state true */}
                  <Text>Edit</Text>
                </TouchableOpacity>
                {/* delete button */}
                <TouchableOpacity onPress={() => deleteAppointment(item.phoneNumber)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
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