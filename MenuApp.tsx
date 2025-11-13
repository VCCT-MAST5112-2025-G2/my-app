import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
}

const initialMenu: Record<string, Dish[]> = {
  starters: [
    { id: 's1', name: 'Deviled Eggs', description: 'Classic appetizer with creamy yolk filling.', price: 55 },
    { id: 's2', name: 'Bruschetta', description: 'Toasted bread topped with tomato, basil & mozzarella.', price: 45 },
    { id: 's3', name: 'Classic Dips (e.g., Cheese-based or Cowboy Caviar)', description: 'Cowboy Caviar is a vibrant bean-and-vegetable dip made with black-eyed peas (or beans), corn, chopped peppers and tomatoes, tossed in a tangy vinaigrette — great for chips or veggie sticks.', price: 50 },
    { id: 's4', name: 'Taco Bites', description: 'Taco bites are bite-sized versions of tacos: mini tortilla cups or chips filled with seasoned ground meat (or a filling), topped with cheese and your favourite taco toppings', price: 60 },
  ],
  mains: [
    { id: 'm1', name: 'Butter Chicken', description: 'Creamy, spiced tomato-based chicken dish.', price: 169 },
    { id: 'm2', name: 'Spaghetti Bolognese', description: 'Rich, meaty tomato pasta sauce.', price: 140 },
    { id: 'm3', name: 'Seafood Paella', description: 'Flavor-packed rice dish with assorted seafood.', price: 365 },
    { id: 'm4', name: 'Molasses-Soy Glazed Salmon', description: 'Baked salmon with a sweet and savory glaze.', price: 233 },
    { id: 'm5', name: 'Tandoori chicken', description: 'Chicken marinated in spiced yoghurt and grilled-charred, juicy, and bursting with flavour', price: 211},
    { id: 'm6', name: 'Quick Honey-Garlic Glazed Chicken', description: 'Pan-seared chicken thighs finished with a sticky sweet garlic-honey glaze.', price: 231 },
  ],
  desserts: [
    { id: 'd1', name: 'Tiramisu', description: 'Coffee-soaked dessert with mascarpone layers.', price: 60 },
    { id: 'd2', name: 'Cheesecake', description: 'Smooth cream cheese filling with biscuit crust.', price: 70 },
    { id: 'd3', name: 'Chocolate Mousse', description: 'Light and airy chocolate dessert.', price: 65 }, 
    { id: 'd4', name: 'Ice Cream Sundae', description: 'Classic scoops of ice cream topped with sweet sauces like chocolate or caramel, and garnished with whipped cream, nuts, fruits, or a cherry', price: 50 },
    { id: 'd5', name: 'Milk Tart', description: 'a sweet pastry crust filled with a creamy custard made from milk, sugar, flour, and eggs. The filling is typically flavored with vanilla and sometimes cinnamon, offering a delicate sweetness and smooth texture.', price: 75 },
  ],
};

const MenuPage: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<'starters' | 'mains' | 'desserts'>('starters');
  const [menu, setMenu] = useState(initialMenu);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const items = menu[selectedCategory];

  // Calculate average price
  const averagePrice =
    items.length > 0
      ? (items.reduce((sum, dish) => sum + dish.price, 0) / items.length).toFixed(2)
      : '0.00';

  const handleAddDish = (): void => {
    if (!newName.trim() || !newDesc.trim() || !newPrice) return;
    const newDish: Dish = {
      id: `${selectedCategory}_${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim(),
      price: Number(newPrice),
    };
    setMenu(prev => ({
      ...prev,
      [selectedCategory]: [newDish, ...prev[selectedCategory]],
    }));
    setNewName('');
    setNewDesc('');
    setNewPrice('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text entering={FadeInDown.delay(100)} style={styles.title}>
        Menu – {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </Animated.Text>

      <Animated.Text entering={FadeInDown.delay(150)} style={styles.subtitle}>
        Average Price: R {averagePrice}
      </Animated.Text>

      <View style={styles.categoryButtons}>
        {(['starters', 'mains', 'desserts'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.activeButton,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.activeText,
              ]}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        )))}
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Dish Name"
          value={newName}
          onChangeText={setNewName}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={newDesc}
          onChangeText={setNewDesc}
          style={styles.input}
        />
        <TextInput
          placeholder="Price (R)"
          value={newPrice}
          keyboardType="numeric"
          onChangeText={setNewPrice}
          style={styles.input}
        />

        <TouchableOpacity onPress={handleAddDish} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Dish</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInDown.delay(200)} style={styles.dishCard}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.dishDesc}>{item.description}</Text>
            <Text style={styles.dishPrice}>R {item.price}</Text>
          </Animated.View>
        )}
      />

      <TouchableOpacity onPress={() => navigation.navigate('FilterMenu')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Welcome</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#ffb703',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  activeText: {
    color: '#fff',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#219ebc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dishCard: {
    backgroundColor: '#fafafa',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  dishDesc: {
    color: '#555',
    marginVertical: 4,
  },
  dishPrice: {
    color: '#000',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#8ecae6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


