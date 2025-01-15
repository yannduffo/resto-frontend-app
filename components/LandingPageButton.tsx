import React from "react";
import {Text, View, StyleSheet} from "react-native";

const LandingPageButton = (props: {buttonText:string}) => {
    return (
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.buttonText}</Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(245, 245, 245, 0.95)',
        height: 48,
        width: 260,
        borderRadius: 30,
        borderWidth: 0.4,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
      },
      buttonText: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Avenir',
      },
});

export default LandingPageButton;