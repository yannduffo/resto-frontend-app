import React, {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  Alert } from 'react-native';

import DishCard from '../components/DishCard.tsx';
import DishSearchBar from '../components/DishSearchBar.tsx';

//cartcontxt import
import { useCart } from '../contexts/CartContext.tsx';

//image importations (we still stocking images in the local app cause i don't know if we can send them with the REST API)
const dishImages = {
    pizza_margherita: require("../images/dishes/margherita.jpg"),
    pizza_four_cheese: require("../images/dishes/fromaggi.jpeg"),
    pizza_pepperoni: require("../images/dishes/peperroni.jpeg"),
    pizza_burrata: require("../images/dishes/burrata.jpeg"),
    pizza_parma: require("../images/dishes/parma.jpeg"),
    pizza_mortadella: require("../images/dishes/mortadella.jpeg"),
    pizza_veggie: require("../images/dishes/veggie.jpeg"),
    pizza_seafood: require("../images/dishes/seafood.jpeg"),
    pasta_carbonara: require("../images/dishes/pasta_carbonara.jpeg"),
    pasta_manzo: require("../images/dishes/pasta_manzo.jpeg"),
    pasta_mare: require("../images/dishes/pasta_mare.jpeg"),
    pasta_pollo: require("../images/dishes/pasta_pollo.jpeg"),
  };

const OrderScreen = ({ navigation }) => {

    const [filteredDishes, setFilteredDishes] = useState([]); //state for searchbar, by default empty and setted when data loading
    const [selectedCategory, setSelectedCategory] = useState('All'); //state for the selected category
    const { cartItems } = useCart(); //access to the cart

    const [dishes, setDishes] = useState([]); //initialize an empty array for dishes
    const [loading, setLoading] = useState(true); //loading state

    //fetch dishes from API when component mounts
    useEffect(() => {
      const fetchDishes = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8080/dishes');
          if (response.ok) {
            const data = await response.json();

            //map the API data to include images
            const mappedDishes = data.map(dish => {
              // get ride of  "dishImages." du champ image pour obtenir la clé de l'image
              const imageKey = dish.image.replace('dishImages.', '');
              return {
                ...dish,
                image: dishImages[imageKey] //assign the correct image from dishImages object
              };
            });

            setDishes(mappedDishes);
            setFilteredDishes(mappedDishes); //by default show all dishes
          } else {
            throw new Error('Failed to fetch dishes');
          }
        } catch (error) {
          Alert.alert('Error', error.message);
        } finally {
          setLoading(false); //hide loader when data is fetched
        }
      };

      fetchDishes();
    }, []);
    
    //filter by category logic
    const filterByCategory = (category) => {
      setSelectedCategory(category);
      if (category === 'All') {
        setFilteredDishes(dishes);
      } else {
        const filtered = dishes.filter(dish => dish.category === category.toLowerCase());
        setFilteredDishes(filtered);
      }
    };

    //loading screen while retreiving datas
    if (loading) {
      return (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#007BFF" />
        </SafeAreaView>
      );
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>
  
        {/*search bar*/}
        <View style={styles.orderPageHeader}>
          <Text style={styles.headerTitle}>ORDER</Text>
          <DishSearchBar dishes={dishes} setFilteredDishes={setFilteredDishes} />
        </View>
  
        {/* category selection*/}
        <View style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => filterByCategory('All')} style={[styles.categoryButton, selectedCategory === 'All' && styles.activeCategory]}> 
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => filterByCategory('pizza')} style={[styles.categoryButton, selectedCategory === 'pizza' && styles.activeCategory]}>
            <Text style={styles.categoryText}>Pizza</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => filterByCategory('pasta')} style={[styles.categoryButton, selectedCategory === 'pasta' && styles.activeCategory]}>
            <Text style={styles.categoryText}>Pasta</Text>
          </TouchableOpacity>
        </View>
  
        {/*filtered dish list*/}
        <ScrollView>
          {
            //adding a check for result
            //if number of serch reasult > 0 :
            filteredDishes.length > 0 ? (
              <View style={styles.orderPageDishList}>
                {filteredDishes.map((dish, index) => (
                  <DishCard 
                    key={index}
                    DishText={dish.title}
                    DishDescription={dish.description}
                    image={dish.image}
                    DishAllergens={dish.allergens}
                    DishPrice={dish.price}
                  />
                ))}
              </View>
            ) : (
              //esle the number of results is = 0 
              <Text style={styles.noResultsText}>No dishes found</Text>
            )
          }
        </ScrollView>
        {/* cart button */}
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Text style={styles.viewCartButtonText}>View Cart ({cartItems.length})</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
};

export default OrderScreen;

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
    orderPageHeader:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginBottom: 8,
    },
    categoryContainer: {
      flexDirection: 'row',
      marginBottom: 7,
      marginLeft: 5,
    },
    categoryButton: {
      paddingHorizontal:10,
      paddingVertical:6,
      backgroundColor: '#fff',
      borderRadius: 20,
      marginHorizontal: 5,
    },
    activeCategory: {
      borderColor : '#909090',
      borderStyle: 'solid',
      borderWidth: 1.5,
    },
    categoryText: {
      color: '#000',
      fontSize: 16,
    },
    orderPageDishList:{
      justifyContent:'space-evenly',
      alignItems:'center',
      flexDirection:'row',
      flexWrap:'wrap',
    },
    headerTitle:{
      fontSize: 30,
      color: '#000',
      fontFamily: 'Optima',
    },
    noResultsText: {
      fontSize: 18,
      color: '#404040',
      textAlign: 'center',
      marginTop: 20,
    },
    viewCartButton: {
      backgroundColor: '#909090',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10,
      marginHorizontal:15,
    },
    viewCartButtonText: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'Optima',
    },
  });