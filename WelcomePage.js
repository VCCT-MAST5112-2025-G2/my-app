import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';


  export default function WelcomePage({navigation }) {
  const handleOrderClick = () => {
    navigation.navigate("MenuApp"); // assumes you have a "Menu" screen
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeInDown.duration(800)}
        style={styles.title}
      >
        Welcome to Christoffell's Menu
      </Animated.Text>

      <Animated.Text
        entering={FadeIn.delay(400).duration(600)}
        style={styles.subtitle}
      >
        Explore our delicious menu and add your own dish too.
      </Animated.Text>

      <Animated.View entering={FadeInDown.delay(600)}>
        <TouchableOpacity style={styles.button} onPress={handleOrderClick}>
          <Text style={styles.buttonText}>Start Ordering</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

