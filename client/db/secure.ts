import * as SecureStore from 'expo-secure-store';

export const savePin = async (pin: string) => {
  try {
    await SecureStore.setItemAsync('userPin', pin);
  } catch (error) {
    console.error('Error saving PIN:', error);
  }
};

export const checkPin = async (pin: string): Promise<boolean> => {
  try {
    const securePin = await SecureStore.getItemAsync('userPin');
    if (securePin == pin) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error with PIN:', error);
  }
  return false;
};

export const deletePin = async () => {
  try {
    await SecureStore.deleteItemAsync('userPin');
  } catch (error) {
    console.error('Error deleting PIN:', error);
  }
};