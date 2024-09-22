import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

const ForgotOtp = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    } else if (index === 3) {
      inputs.current[index].blur();
      Keyboard.dismiss();
    }
  };

  const handleNextPress = () => {
    if (code.join('').length === 4) {
      // Handle OTP validation here
      navigation.navigate('ChangePassword');
    } else {
      alert('Please enter the 4-digit code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Confirmation Code</Text>
      <Text style={styles.subHeader}>A 4-digit code was sent to your email.</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => (inputs.current[index] = input)}
            style={styles.codeInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleCodeChange(text, index)}
            value={digit}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 50,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  codeInput: {
    width: 45,
    height: 45,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    margin: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ForgotOtp;