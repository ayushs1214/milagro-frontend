import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Support = () => {
  return (
    <LinearGradient 
      colors={["#575757", "#000000"]}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CONTACT US</Text>
        </View>

        <View style={styles.section}>
          <Image source={{ uri: 'https://example.com/contact-icon.png' }} style={styles.icon} />
          <Text style={styles.description}>
            Need an ASAP answer? Contact us via chat, 24/7! For existing orders, please call us.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => { /* Chat action */ }}>
            <Text style={styles.buttonText}>CHAT WITH US</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Image source={{ uri: 'https://example.com/text-icon.png' }} style={styles.icon} />
          <Text style={styles.description}>
            You can text us at 800-309-2622 — Please allow the system to acknowledge a greeting before providing your details.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('sms:8003092622')}>
            <Text style={styles.buttonText}>TEXT US</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Image source={{ uri: 'https://example.com/social-icon.png' }} style={styles.icon} />
          <Text style={styles.description}>
            Send us a direct message on <Text style={styles.link} onPress={() => Linking.openURL('https://facebook.com')}>Facebook</Text> or follow us on <Text style={styles.link} onPress={() => Linking.openURL('https://twitter.com')}>Twitter</Text>.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLink} onPress={() => { /* Navigate to About */ }}>About</Text>
          <Text style={styles.footerLink} onPress={() => { /* Navigate to Contact */ }}>Contact</Text>
          <Text style={styles.footerLink} onPress={() => { /* Navigate to Blog */ }}>Blog</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '200',
  },
  section: {
    marginVertical: 25,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#00f',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingVertical: 20,
  },
  footerLink: {
    color: '#987952',
    fontSize: 16,
  },
});

export default Support;