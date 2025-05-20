import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Saved Pizzas</Text>
      {savedPizzas.length === 0 ? (
        <Text style={styles.text}>No saved pizzas found.</Text>
      ) : (
        savedPizzas.map((pizza, index) => (
          <View key={index} style={styles.pizzaCard}>
            <Text style={styles.text}><Text style={styles.bold}>Pizza #{index + 1}</Text></Text>
            <Text style={styles.text}><Text style={styles.bold}>Size:</Text> {pizza.size}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Sauce:</Text> {pizza.sauce}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Toppings:</Text> {pizza.toppings.join(', ')}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'lavender',
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
    borderColor: '#888',
    borderWidth: 2,
  },
  text: {
    fontSize: 20,
    marginVertical: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});
