import SecureStore from 'expo-secure-store';

export const checkLoggedInState = async () => {
  try {
    const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');
    return isLoggedIn === 'true';  // Returns true if logged in, false otherwise
  } catch (error) {
    console.error('Error checking login state:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    await SecureStore.deleteItemAsync('isLoggedIn');  // Clear logged-in state
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
