import React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  ImageBackground, 
  View, 
  TouchableOpacity} 
  from 'react-native';

import LandingPageButton from '../components/LandingPageButton.tsx';

const HomeScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground 
          source={require('../images/basilic2.jpeg')}
          style={styles.backgroundImage}
        >
          <View style={styles.topView}>
            <Text style={styles.topText}>BASILICO</Text>
            <Text style={styles.topUnderText}>- ITALIAN FLAVORS -</Text>
          </View>
  
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
              <LandingPageButton buttonText="ORDER" />
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => navigation.navigate('BookScreen')}>
              <LandingPageButton buttonText="BOOK" />
            </TouchableOpacity>
          </View>
  
        </ImageBackground>
      </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topView: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomView: {
      flex: 3,
      alignItems: 'center',
    },
    topText: {
      fontSize: 50,
      color: '#000',
      fontFamily: 'Optima',
    },
    topUnderText: {
      fontSize: 14,
      color: '#000',
      fontFamily: 'Optima',
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
  });
  