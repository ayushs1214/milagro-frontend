import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CartContext } from './CartContext';
import axios from 'axios';

const ProductDetailsScreen = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const { productId } = route.params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch product details.');
      }
    };

    fetchProduct();
  }, [productId]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigation.navigate('Cart');
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `http://localhost:5000/${product.imageUrl}` }}
        style={styles.image}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price} /Sq. Ft.</Text>
        <View style={styles.ratingContainer}>
          {[...Array(4)].map((_, index) => (
            <Icon key={index} name="star" size={20} color="#FFD700" />
          ))}
          <Icon name="star-o" size={20} color="#FFD700" />
        </View>
        <Text style={styles.sku}>SKU: {product.sku}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.wishlistButton}>
            <Text style={styles.buttonText}>Add to Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailContainer: {
    padding: 20,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  price: {
    fontSize: 18,
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sku: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#EEDABC',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#fff',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  wishlistButton: {
    backgroundColor: '#EEDABC',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  cartButton: {
    backgroundColor: '#EEDABC',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProductDetailsScreen;