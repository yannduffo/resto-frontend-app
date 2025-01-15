import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

//import cartcontext
import { useCart } from '../contexts/CartContext';

const DishDetailScreen = ({ route, navigation }) => {
  //dish data are received through navigation
  const { dishText, dishDescription, dishAllergens, dishImage, dishPrice } = route.params;
  //access to the cart
  const { cartItems, addToCart } = useCart();

  //counting the number of item of this type of dish in the cart
  const itemCount = cartItems.filter(item => item.dishText === dishText).length;

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>

        {/* image */}
        <Image source={dishImage} style={styles.dishImage} />

        {/* title, description */}
        <View style={styles.underImage}>
          <View style={styles.dishText}>
              <Text style={styles.dishTitle}>{dishText}</Text>
              <Text style={styles.dishDescription}>{dishDescription}</Text>
              <Text style={styles.dishAlergens}>Allergens : {dishAllergens}</Text>
          </View>

          {/* lower part of the screen : price + button 'add to cart' */}
          <View style={styles.lowerPagePart}>
            <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>$ {dishPrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart({ id: Date.now(), dishText, dishPrice })}
            >
              <Text style={styles.addToCartButtonText}>Add to Cart {`(${itemCount})`}</Text>
            </TouchableOpacity>
          </View>
        </View>

        
    </SafeAreaView>
  );
};

export default DishDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //margin: 20,
  },
  backButton: {
    position: 'absolute', //button in absolute position to be on top of the image
    top: 40,
    left: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 10,
    paddingVertical:8,
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#000',
  },
  dishImage: {
    width: '100%',
    height: '45%',
    resizeMode: 'cover',
  },
  dishTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 16,
    color: '#555',
  },
  dishText:{
    marginHorizontal:20,
  },
  dishAlergens:{
    marginTop : 30,
    color: '#555',
  },
  addToCartButton: {
    backgroundColor: '#909090',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Optima',
  },
  lowerPagePart:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  priceLabel: {
    fontSize: 16,
    color: '#555',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  underImage:{
    flex:1,
    justifyContent:'space-between',
  }
});
