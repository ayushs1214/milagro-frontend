import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CodeScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleCodeSubmit = () => {
    if (code.length === 4) {
      // Handle OTP verification here.
      console.log('Code verified');
      navigation.navigate('ChangePassword');
    } else {
      alert('Please enter the 4-digit code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Code</Text>
      <Text style={styles.description}>A 4-digit code was sent to your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Code"
        keyboardType="number-pad"
        maxLength={4}
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleCodeSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#888',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CodeScreen;