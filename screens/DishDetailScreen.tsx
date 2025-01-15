import React,  { useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

//import cartcontext
import { useCart } from '../contexts/CartContext';

const DishDetailScreen = ({ route, navigation }) => {
  //dish data are received through navigation
  const { dishText, dishDescription, dishAllergens, dishImage, dishPrice } = route.params;
  //access to the cart
  const { cartItems, addToCart, removeFromCart } = useCart();

  //local state for item count
  const [itemCount, setItemCount ] = useState(0);

  //initialize item count regarding current state
  useEffect(() => {
    const itemCount = cartItems.filter(item => item.dishText === dishText).length;
    setItemCount(itemCount);
  }, [cartItems, dishText]);

  //add an item to the cart (and increment counter)
  const handleIncrement = () => {
    addToCart({ id: Date.now(), dishText, dishPrice });
    setItemCount(prevCount => prevCount + 1);
  };

  //remove an item from the cart (and decrement counter)
  const handleDecrement = () => {
    if (itemCount > 0) {
      const itemToRemove = cartItems.find(item => item.dishText === dishText);
      if (itemToRemove) {
        removeFromCart(itemToRemove);
        setItemCount(prevCount => prevCount - 1);
      }
    }
  };

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

          {/* lower part of the screen : price + (double button & counter) */}
          <View style={styles.lowerPagePart}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>$ {dishPrice}</Text>
            </View>

            {/* Counter with (- 1 +) */}
            <View style={styles.counterContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.orderLabel}>Order</Text>                
                <View style={styles.cartaddingremoveContainer}>
                  <TouchableOpacity style={styles.counterButton} onPress={handleDecrement}>
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{itemCount}</Text>
                  <TouchableOpacity style={styles.counterButton} onPress={handleIncrement}>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
    marginBottom : 15,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  underImage:{
    flex:1,
    justifyContent:'space-between',
  },
  orderLabel:{
    fontSize: 16,
    color: '#555',
    marginBottom : 15,
    marginTop : 8,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 8,
    marginTop: 4,
  },
  cartaddingremoveContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  }
});
