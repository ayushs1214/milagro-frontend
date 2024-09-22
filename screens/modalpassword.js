import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Button, Text, IconButton } from 'react-native-paper';

const PasswordChangeSuccessModal = ({ visible, onDismiss }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
        <View style={styles.content}>
          <IconButton icon="check-circle" iconColor="#4CAF50" size={60} />
          <Text style={styles.text}>Password Change Successful!</Text>
          <Button mode="contained" style={styles.button} onPress={onDismiss}>
            Go back to Login page
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    elevation: 5,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 54,
  },
});

export default PasswordChangeSuccessModal;