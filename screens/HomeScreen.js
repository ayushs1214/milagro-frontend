import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Menu pressed')}>
          <Ionicons name="menu" size={24} color="#987952" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color="#987952" style={styles.search} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Favorite pressed')}>
          <FontAwesome name="heart" size={24} color="#987952" style={styles.fav} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <FontAwesome name="shopping-cart" size={24} color="#987952" style={styles.cart} />
        </TouchableOpacity>
      </View>

      {/* Discount Banner */}
      <ImageBackground source={require('../assets/images/feature1.png')} style={styles.imageBackground}>
        <Text style={styles.text}>Discounts up to 15% to all</Text>
      </ImageBackground>

      {/* Featured Products */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView horizontal>
          {products.map((product) => (
            <TouchableOpacity
              key={product._id}
              style={styles.productContainer}
              onPress={() => navigation.navigate('ProductDetails', { productId: product._id })}
            >
              <Image source={{ uri: `http://localhost:5000/${product.imageUrl}` }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'black',
  },
  search: {
    paddingLeft: 245,
    marginRight: 10,
  },
  fav: {
    paddingRight: 10,
  },
  cart: {
    marginRight: 25,
  },
  sectionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 10,
    paddingLeft: 6,
  },
  productContainer: {
    marginRight: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  productPrice: {
    color: '#aaa',
    fontSize: 14,
  },
  imageBackground: {
    width: '100%',
    height: 155,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default HomeScreen;