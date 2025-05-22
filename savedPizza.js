import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedPizza() {
  const [savedPizzas, setSavedPizzas] = useState([]);

    const loadPizzas = async () => {
      const jsonValue = await AsyncStorage.getItem('pizzaRecipes');
      if (jsonValue) {
        setSavedPizzas(JSON.parse(jsonValue));
      }
    };
    loadPizzas();
  
    async function clear() {
    await AsyncStorage.clear();
    setSavedPizzas([]);
    Alert.alert("Pizzas Cleared!");
    await loadPizzas();
};
loadPizzas();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Saved Pizzas</Text>
      {savedPizzas.length === 0 ? (
        <Text style={styles.text}>No saved pizzas found.</Text>
      ) : (
        savedPizzas.map((pizza, index) => (
          <View key={index} style={styles.pizzaCard}>
            <Text style={styles.text}>Pizza #{index + 1}</Text>
            <Text style={styles.text}>Size: {pizza.size}</Text>
            <Text style={styles.text}>Sauce: {pizza.sauce}</Text>
            <Text style={styles.text}>Toppings: {pizza.toppings.join(', ')}</Text>
          </View>
        ))
      )}
        <Pressable onPress={clear} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear All Saved Pizzas</Text>
        </Pressable>
    </ScrollView>
  );s
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    marginBottom: 50,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pizzaCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    borderColor: 'black',
    borderWidth: 3,
  },
  text: {
    fontSize: 25,
    marginVertical: 2,
  },
  clearButton: {
    padding: 20,
    fontSize: 50,
    backgroundColor: 'darkslategrey',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 50,
  },
  clearText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'lightgrey',
    fontStyle: 'italic'
  }

});
