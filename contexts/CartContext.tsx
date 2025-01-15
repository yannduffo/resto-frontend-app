import React, { createContext, useState, useContext } from 'react';

//cart context creation
const CartContext = createContext();

//cart provider
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); //table of the product in the cart

    //add a product to the cart
    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    //delete a product from the cart
    const removeFromCart = (itemToRemove) => {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== itemToRemove.id));
    };

    return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        {children}
    </CartContext.Provider>
    );
};

//using a hook useContext()
export const useCart = () => useContext(CartContext);
