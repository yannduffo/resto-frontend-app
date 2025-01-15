import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

//import cartcontext
import { useCart } from '../contexts/CartContext';

const CartScreen = ({ navigation }) => {
    //access to products in the cart
    const { cartItems, removeFromCart } = useCart();

    //calculate price total
    const totalPrice = cartItems.reduce((sum, item) => sum + item.dishPrice, 0);

    return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>

        <View style={styles.underContainer}>
            <View>
                <Text style={styles.cartTitle}>Your Cart</Text>

                {/* products list (display with the Flatlist component)*/}
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Text style={styles.cartItemText}>{item.dishText} - ${item.dishPrice}</Text>
                        <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                />
            </View>
            <View>
                {/* display total price */}
                {cartItems.length > 0 && (
                    <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
                    </View>
                )}
                {/* order button (not apperaing when nothing is in the cart*/}
                {cartItems.length > 0 && (
                    <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
        
    </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    underContainer:{
        margin:10,
        flex:1,
        justifyContent:'space-between',
    },
    backButton: {
        marginBottom: 6,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 5,
    },
    backButtonText: {
        fontSize: 18,
        color: '#007BFF',
    },
    cartTitle: {
        fontSize: 30,
        color: '#000',
        fontFamily: 'Optima',
        marginBottom: 5,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cartItemText: {
        marginTop:7,
        fontSize: 18,
        color: '#555',
        fontFamily: 'Optima',
    },
    removeButton: {
        backgroundColor: '#ff4d4d',
        padding: 8,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Optima',
    },
    orderButton: {
        backgroundColor: '#909090',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Optima',
    },
    totalContainer: {
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
});
