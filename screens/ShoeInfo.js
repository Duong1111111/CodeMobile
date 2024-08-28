import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const backgroundImage = require('../assets/main.png');
import shoe3 from '../assets/shoe3.png';
import shoe4 from '../assets/shoe4.png';
import shoe5 from '../assets/shoe5.png';

const { width } = Dimensions.get('window'); // Get the screen width

export default function ShoeInfo({ route, navigation }) {
  const { shoe } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCart = () => {
    navigation.navigate('MyCart');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn size trước khi thêm vào giỏ hàng.');
      return;
    }
    setModalVisible(true);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chi Tiết Sản Phẩm</Text>
          <TouchableOpacity style={styles.cartButton} onPress={handleCart}>
            <Icon name="cart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Image source={shoe.image} style={styles.shoeImage} />

        <View style={styles.card}>
          <Text style={styles.shoeStatus}>{shoe.status}</Text>
          <Text style={styles.shoeTitle}>{shoe.title}</Text>
          <Text style={styles.shoePrice}>{shoe.price}</Text>
          <Text style={styles.shoeDetail}>{shoe.detail}</Text>
        </View>

        {/* Updated Gallery Section */}
        <Text style={styles.galleryHeader}>Gallery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
          <TouchableOpacity onPress={() => console.log('Shoe 3 pressed')}>
            <Image source={shoe3} style={styles.galleryImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Shoe 4 pressed')}>
            <Image source={shoe4} style={styles.galleryImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Shoe 5 pressed')}>
            <Image source={shoe5} style={styles.galleryImage} />
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sizeHeader}>Chọn Size:</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sizeContainer}>
          {Array.from({ length: 17 }, (_, i) => 32 + i).map(size => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeButtonText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedSize && (
          <View style={styles.sizeQuantityContainer}>
            <Text style={styles.selectedSizeText}>Size đã chọn: {selectedSize}</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity style={styles.controlButton} onPress={decreaseQuantity}>
                <Icon name="remove" size={16} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity style={styles.controlButton} onPress={increaseQuantity}>
                <Icon name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.priceContainer}>
          <Text style={styles.shoePrice}>{shoe.price}</Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartButtonText}>Thêm Vào Giỏ Hàng</Text>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Icon name="checkmark-circle" size={50} color="#4CAF50" style={styles.checkmarkIcon} />
              <Text style={styles.modalMessage}>Thêm vào giỏ hàng thành công!</Text>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  shoeImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#161F28',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  shoeStatus: {
    fontSize: 16,
    color: '#5B9EE1',
  },
  shoeTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  shoePrice: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  shoeDetail: {
    fontSize: 14,
    color: '#ccc',
  },
  galleryHeader: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  galleryContainer: {
    marginBottom: 20,
  },
  galleryImage: {
    width: width * 0.2,
    height: width * 0.1,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 5,
  },
  sizeHeader: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  sizeContainer: {
    marginBottom: 20,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#87CEFA',
  },
  sizeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sizeQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectedSizeText: {
    color: '#fff',
    fontSize: 16,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#161F28',
    padding: 10,
    borderRadius: 10,
  },
  shoePrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#87CEFA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkmarkIcon: {
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
