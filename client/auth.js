import SecureStore from 'expo-secure-store';

export const checkLoggedInState = async () => {
  try {
    const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');
    return isLoggedIn === 'true';
  } catch (error) {
    console.error('Error checking login state:', error);
    return false;
  }
};

// Clear login state (called when app moves to background or device is turned off)
export const invalidateLoginState = async () => {
  try {
    await SecureStore.deleteItemAsync('isLoggedIn');  // Clear the stored login flag
  } catch (error) {
    console.error('Error clearing login state:', error);
  }
};
