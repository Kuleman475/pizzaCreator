import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Alert, View, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedPizza from './savedPizza';

const Stack = createNativeStackNavigator();

function PizzaMaker({ navigation }) {
  const [size, setSize] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [toppings, setToppings] = useState([]);

  const sizeOptions = [
    { label: 'Small', value: 'Small' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Large', value: 'Large' },
  ];

  const sauceOptions = [
    { label: 'Marinara', value: 'Marinara' },
    { label: 'Barbeque', value: 'Barbeque' },
    { label: 'Ranch', value: 'Ranch' },
    { label: 'Alfredo', value: 'Alfredo' },
    { label: 'Garlic', value: 'Garlic' },
    { label: 'No Sauce', value: 'No Sauce' },
  ];

  const toppingsOptions = [
    "Pepperoni", "Sausage", "Chicken", "Ham",
    "Turkey", "Green Peppers", "Red Peppers", "Onions", "Olives",
    "Pineapple", "Mushrooms", "Bacon", "Anchovies", "Corn",
    "Hamburger", "Pickles", "Mac and Cheese", "Peanut Butter", "Jelly", "Cheese"
  ];

  function toggleToppings(topping) {
    if (toppings.includes(topping)) {
      setToppings(toppings.filter(item => item !== topping));
    } else {
      setToppings([...toppings, topping]);
    }
  }

  const submitOrder = async () => {
    if (!size || !sauce || toppings.length === 0) {
      Alert.alert("Oops!", "Please select a size, sauce, and at least one topping.");
      return;
    }

    const newRecipe = {
      size,
      sauce,
      toppings,
    };

   
      const existing = await AsyncStorage.getItem('pizzaRecipes');
      const recipes = existing ? JSON.parse(existing) : [];

      const updatedRecipes = [...recipes, newRecipe];
      await AsyncStorage.setItem('pizzaRecipes', JSON.stringify(updatedRecipes));

      Alert.alert("Pizza Saved!", `\nSize: ${size}\n\nSauce: ${sauce}\n\nToppings: ${toppings.join(", ")}`);

  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      <Text style={styles.header}>Pizza Creator</Text>

      <Text style={styles.subheader}>Size:</Text>
      <RadioForm
        radio_props={sizeOptions}
        initial={-1}
        onPress={(value) => setSize(value)}
        buttonColor={'black'}
        selectedButtonColor={'blue'}
        labelStyle={{ marginRight: 10 }}
        style={styles.radio}
        formHorizontal={true}
      />

      <Text style={styles.subheader}>Sauce:</Text>
      <RadioForm
        radio_props={sauceOptions}
        initial={-1}
        onPress={(value) => setSauce(value)}
        buttonColor={'black'}
        selectedButtonColor={'blue'}
        labelStyle={{ marginRight: 10 }}
        style={styles.radio}
      />

      <Text style={styles.subheader}>Toppings:</Text>
      <View style={styles.toppingsGrid}>
        {toppingsOptions.map((topping) => (
          <Pressable
            key={topping}
            onPress={() => toggleToppings(topping)}
            style={[
              styles.button,
              toppings.includes(topping) && styles.buttonClicked,
            ]}
          >
            <Text style={styles.buttonLabel}>{topping}</Text>
          </Pressable>
        ))}
      </View>

  <Pressable onPress={submitOrder} style={styles.submit}>
    <Text style={styles.submitText}>Submit</Text>
  </Pressable>

  <Pressable onPress={() => navigation.navigate("SavedPizza")} style={styles.submit}>
    <Text style={styles.submitText}>View Saved Pizzas</Text>
  </Pressable>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PizzaMaker">
        <Stack.Screen name="PizzaMaker" component={PizzaMaker} />
        <Stack.Screen name="SavedPizza" component={SavedPizza} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 48,
    fontFamily: 'georgia',
    margin: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  radio: {
    alignItems: 'flex-start',
    margin: 10,
  },
  button: {
    backgroundColor: "white",
    margin: 5,
    width: '45%',
    alignItems: "center",
    padding: 10,
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 10,
  },
  buttonClicked: {
    backgroundColor: "lightblue",
    borderColor: "darkred",
    borderWidth: 5,
    width: '45%',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  toppingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  submit: {
    backgroundColor: 'green',
    borderRadius: 15,
    borderColor: 'green',
    marginBottom: 20,
    marginTop: 15,
    padding: 10,
    width: '90%',
    borderWidth: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  submitText: {
    fontSize: 30,
    fontFamily: 'georgia',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});