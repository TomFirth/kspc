// storage/secure.js
import * as SecureStore from 'expo-secure-store';

// Save PIN securely
export const savePin = async (pin) => {
  try {
    await SecureStore.setItemAsync('userPin', pin);
    console.log('PIN saved successfully');
  } catch (error) {
    console.error('Error saving PIN:', error);
  }
};

// Get PIN
export const getPin = async () => {
  try {
    const pin = await SecureStore.getItemAsync('userPin');
    if (pin) {
      console.log('Retrieved PIN:', pin);
      return pin;
    } else {
      console.log('No PIN found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving PIN:', error);
  }
};

// Delete PIN
export const deletePin = async () => {
  try {
    await SecureStore.deleteItemAsync('userPin');
    console.log('PIN deleted successfully');
  } catch (error) {
    console.error('Error deleting PIN:', error);
  }
};