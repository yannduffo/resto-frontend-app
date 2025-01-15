import React from "react";
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

//getting screen size to build responsive design
const { width, height } = Dimensions.get('window');

const DishCard = (props: {DishText:string; DishDescription:string; DishAllergens:string; image; DishPrice:Int32}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                //navigate to the dishDetailScreen and passing the params
                navigation.navigate('DishDetailScreen', {
                    dishText: props.DishText,
                    dishDescription: props.DishDescription,
                    dishImage: props.image,
                    dishAllergens : props.DishAllergens,
                    dishPrice : props.DishPrice
                });
            }}
        >
            <View style={styles.card}>
                <Image source={props.image} style={styles.image} />

                <View style={styles.textContainer}>
                    <Text style={styles.cardDishText}>{props.DishText}</Text>
                    <Text style={styles.cardDishTextDescription}>{props.DishDescription}</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',
        height: height * 0.16,
        width: width * 0.92,
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden', //supprime les dépacements de cadres
    },
    image: {
        width: width * 0.35,
        height: '100%',
    },
    textContainer: {
        width: width * 0.55,
        padding: 10,
    },
    cardDishText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Avenir',
    },
    cardDishTextDescription: {
        fontSize: 13,
        color: '#555',
        fontFamily: 'Avenir',
    },
});

export default DishCard;