import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { TextInput, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0a84ff',
  },
};

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [registerAs, setRegisterAs] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const registerAsOptions = [
    { label: 'Dealer', value: 'dealer', icon: 'store' },
    { label: 'Salesperson', value: 'salesperson', icon: 'account-tie' },
    { label: 'Architect', value: 'architect', icon: 'compass-outline' },
    { label: 'Builder', value: 'builder', icon: 'hammer' },
  ];

  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSignup = async () => {
    let newErrors = {};

    if (!registerAs) newErrors.registerAs = 'Please select how you want to register';
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (!mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    else if (!validatePhone(mobileNumber)) newErrors.mobileNumber = 'Invalid phone number';
    if (!password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const data = {
      registerAs,
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/register', data);
      if (response.data.success) {
        Alert.alert('Success', 'Registration successful. Please log in.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Registration failed');
      console.error('Signup error:', error);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.view}>
            <Text style={styles.heading}>Sign Up</Text>
            <Text>Create an account to get started</Text>
          </View>

          <View style={styles.form}>
            {/* Dropdown for Register As */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.textinput}>Register as a<Text style={styles.required}>*</Text></Text>
              <TouchableOpacity
                style={[styles.dropdownButton, errors.registerAs && styles.errorInput]}
                onPress={() => setShowMenu(!showMenu)}
              >
                <Text style={styles.dropdownButtonText}>
                  {registerAs ? registerAsOptions.find(option => option.value === registerAs).label : 'Select here'}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#0a84ff" />
              </TouchableOpacity>
              {showMenu && (
                <View style={styles.dropdownMenu}>
                  {registerAsOptions.map(option => (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setRegisterAs(option.value);
                        setShowMenu(false);
                        setErrors({ ...errors, registerAs: null });
                      }}
                    >
                      <MaterialCommunityIcons name={option.icon} size={24} color="#0a84ff" />
                      <Text style={styles.dropdownItemText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {errors.registerAs && <Text style={styles.errorText}>{errors.registerAs}</Text>}

            {/* First name input */}
            <Text style={styles.textinput}>First name<Text style={styles.required}>*</Text></Text>
            <TextInput
              mode="outlined"
              style={[styles.input, errors.firstName && styles.errorInput]}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setErrors({ ...errors, firstName: null });
              }}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

            {/* Last name input */}
            <Text style={styles.textinput}>Last name</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />

            {/* Email input */}
            <Text style={styles.textinput}>Email<Text style={styles.required}>*</Text></Text>
            <TextInput
              keyboardType="email-address"
              mode="outlined"
              style={[styles.input, errors.email && styles.errorInput]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: null });
              }}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Mobile number input */}
            <Text style={styles.textinput}>Mobile Number<Text style={styles.required}>*</Text></Text>
            <TextInput
              keyboardType="phone-pad"
              mode="outlined"
              style={[styles.input, errors.mobileNumber && styles.errorInput]}
              value={mobileNumber}
              onChangeText={(text) => {
                setMobileNumber(text);
                setErrors({ ...errors, mobileNumber: null });
              }}
            />
            {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}

            {/* Password input */}
            <Text style={styles.textinput}>Password<Text style={styles.required}>*</Text></Text>
            <View style={styles.passwordContainer}>
              <TextInput
                secureTextEntry={!showPassword}
                mode="outlined"
                style={[styles.input, styles.passwordInput, errors.password && styles.errorInput]}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors({ ...errors, password: null });
                }}
              />
              <TouchableOpacity
                style={styles.passwordVisibilityButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#0a84ff"
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Terms and Conditions checkbox */}
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                isChecked={checked}
                onPress={() => setChecked(!checked)}
                fillColor="#0a84ff"
                text="I've read and agree with the Terms and Conditions and the Privacy Policy"
                textStyle={{ textDecorationLine: 'none' }}
              />
            </View>

            {/* Action buttons */}
            <View style={styles.buttonContainer}>
              <Button mode="text" onPress={() => navigation.navigate('Welcome')} style={styles.cancelButton}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleSignup} style={styles.nextButton} disabled={!checked}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
    height: 45,
  },
  textinput: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginBottom: 15,
    zIndex:1000, // Ensure the dropdown is in front
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 45,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  link: {
    color: '#0a84ff',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nextButton: {
    flex: 1,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 0,
  },
  passwordVisibilityButton: {
    position: 'absolute',
    right: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  required: {
    color: 'red',
  },
});

export default Signup;