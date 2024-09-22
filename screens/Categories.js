import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Search from './Search';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const navigation = useNavigation();

  const recentSearches = [
    'V-shaped pattern',
    'Six-sided tiles',
    'Textured Tiles'
  ];

  const colors = [
    'BLACK', 'WHITE', 'GREY', 'YELLOW',
    'BLUE', 'PURPLE', 'GREEN', 'RED', 'PINK',
    'ORANGE', 'GOLD', 'SILVER'
  ];

  const categories = [
    'TEXTURE-BASED TILES',
    'PATTERN & SHAPE TILES',
    'SPECIAL TILES',
    'MOSAIC TILES',
    'NATURAL STONE TILES',
  ];

  const products = [
    { name: 'Luna Pearl', designer: 'Ellie Stein', image: require('../assets/images/feature1.png') },
    { name: 'Dark Marble', designer: 'John Doe', image: require('../assets/images/feature1.png') },
    // Add more products as needed
  ];

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const renderSearchView = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => setIsSearchActive(false)}>
          <Icon name="arrow-left" size={24} color="#999" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <Text style={styles.recentSearchesTitle}>RECENT SEARCHES</Text>
      {recentSearches.map((search, index) => (
        <View key={index} style={styles.recentSearchItem}>
          <Text style={styles.recentSearchText}>{search}</Text>
          <TouchableOpacity>
            <Icon name="x" size={16} color="#999" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderFilterView = () => (
    <View style={styles.filterContainer}>
      <View style={styles.filterHeader}>
        <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.filterTitle}>Filter</Text>
        <TouchableOpacity>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.filterOption}>
        <Text style={styles.filterOptionText}>Category</Text>
        <View style={styles.filterBadge}><Text style={styles.filterBadgeText}>1</Text></View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.filterOption}>
        <Text style={styles.filterOptionText}>Price Range</Text>
        <Image source={require('../assets/images/feature1.png')} style={styles.chevronIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.filterOption}>
        <Text style={styles.filterOptionText}>Brand</Text>
        <Image source={require('../assets/images/feature1.png')} style={styles.chevronIcon} />
      </TouchableOpacity>
      
      <View style={styles.filterOption}>
        <Text style={styles.filterOptionText}>Color</Text>
        <View style={styles.filterBadge}><Text style={styles.filterBadgeText}>1</Text></View>
      </View>
      
      <View style={styles.colorOptions}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorButton,
              selectedColors.includes(color) && styles.selectedColorButton
            ]}
            onPress={() => toggleColor(color)}
          >
            <Text style={styles.colorButtonText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.filterOption}>
        <Text style={styles.filterOptionText}>Size</Text>
        <Image source={require('../assets/images/feature1.png')} style={styles.chevronIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => setIsSearchActive(true)}
      >
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsFilterVisible(true)}
      >
        <Icon name="filter" size={24} color="#999" />
      </TouchableOpacity>

      <Modal
        visible={isSearchActive}
        animationType="slide"
        onRequestClose={() => setIsSearchActive(false)}
      >
        <Search onClose={() => setIsSearchActive(false)} />
      </Modal>

      <Modal
        visible={isFilterVisible}
        animationType="slide"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        {renderFilterView()}
      </Modal>

      <ScrollView>
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ProductSection title="New Product" products={products} />
        <ProductSection title="Rectangular Tiles" products={products} />
        <ProductSection title="Decorative Tiles" products={products} />
      </ScrollView>
    </View>
  );
};

const CategorySelector = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category && styles.selectedCategoryText,
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const ProductSection = ({ title, products }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={() => console.log('See more')}>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetails', { product })}
          >
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            {product.designer && (
              <Text style={styles.productDesigner}>Designed by {product.designer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
    searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  filterButton: {
    position: 'absolute',
    top: 28,
    right: 10,
    marginRight:20,
  },
  filterIcon: {
    width: 24,
    height: 24,
    
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#2E2E2E',
    borderRadius: 25,
    paddingHorizontal: 130,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: 16,
    marginTop: 30,
  },
  recentSearchesTitle: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  recentSearchText: {
    color: '#FFF',
    fontSize: 16,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  filterContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelText: {
    color: '#999',
    fontSize: 16,
    marginTop: 50,
  },
  filterTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
  },
  clearAllText: {
    color: '#999',
    fontSize: 16,
    marginTop: 50,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filterOptionText: {
    color: '#FFF',
    fontSize: 16,
  },
  filterBadge: {
    backgroundColor: '#C8A97E',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  filterBadgeText: {
    color: '#1E1E1E',
    fontSize: 12,
  },
  chevronIcon: {
    width: 20,
    height: 20,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  colorButton: {
    backgroundColor: '#333',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5,
  },
  selectedColorButton: {
    backgroundColor: '#C8A97E',
  },
  colorButtonText: {
    color: '#FFF',
    fontSize: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
  selectedCategory: {
    backgroundColor: '#987952',
    borderColor: '#987952',
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
  },
  selectedCategoryText: {
    color: '#000',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeMore: {
    color: '#999',
  },
  productCard: {
    width: 150,
    marginRight: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productName: {
    color: '#fff',
    marginTop: 5,
  },
  productDesigner: {
    color: '#999',
    fontSize: 12,
  },
});

export default Categories;