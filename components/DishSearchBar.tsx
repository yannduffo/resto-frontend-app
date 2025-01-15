import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const DishSearchBar = ({ dishes, setFilteredDishes }) => {

    const [searchText, setSearchText] = useState("");

    //search "function"
    const handleSearch = (newText:string) => {
        setSearchText(newText);

        if (newText.trim().length >= 2) {
            const filtered = dishes.filter(dish =>
            dish.DishText.toLowerCase().includes(newText.toLowerCase())
            );
            setFilteredDishes(filtered); //set the dishes variable with only filtered dishes
        } else {
            setFilteredDishes(dishes); //set the dishes variable with every dishes
        }
    };

    //searchbar to render
    return (
        <View style={styles.searchContainer}>
            <TextInput
            style={styles.searchInput}
            placeholder="Search for a dish..."
            value={searchText}
            onChangeText={handleSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex:1,
    height:36,
    marginLeft:30,
    justifyContent: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default DishSearchBar;
