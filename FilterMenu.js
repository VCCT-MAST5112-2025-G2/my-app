import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MenuContext } from './MenuContext';

export default function FilterMenu() {
  const { menu } = useContext(MenuContext);
  const [filter, setFilter] = useState('all');

  const filteredMenu = filter === 'all' ? menu : menu.filter(item => item.category === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      <View style={styles.filterRow}>
        {['all', 'starters', 'mains', 'desserts'].map(cat => (
          <TouchableOpacity key={cat} style={[styles.filterButton, filter === cat && styles.active]} onPress={() => setFilter(cat as any)}>
            <Text style={filter === cat ? styles.activeText : styles.text}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredMenu}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.Description}</Text>
            <Text>R {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  filterRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  filterButton: { padding: 8, margin: 5, backgroundColor: '#ddd', borderRadius: 8 },
  active: { backgroundColor: '#ffb703' },
  text: { color: '#333' },
  activeText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#f9f9f9', padding: 10, marginVertical: 5, borderRadius: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
});
