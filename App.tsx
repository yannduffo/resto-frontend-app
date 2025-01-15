import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen.tsx';
import BookScreen from './screens/BookScreen.tsx';
import OrderScreen from './screens/OrderScreen.tsx';
import DishDetailScreen from './screens/DishDetailScreen.tsx';
import CartScreen from './screens/CartScreen.tsx';

//import the cartcontext
import { CartProvider } from './contexts/CartContext.tsx';

//stack navigation creating
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil'}}/>
          <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ title: 'Order Menu'}} />
          <Stack.Screen name="BookScreen" component={BookScreen} options={{ title: 'Book a table'}} />
          <Stack.Screen name="DishDetailScreen" component={DishDetailScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>

  );
}