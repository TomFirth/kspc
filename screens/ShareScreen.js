import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import RSA from 'react-native-rsa-native';
import { getUsername, saveReceivedContact } from '../storage/users';

// Initialize NFC
NfcManager.start();

export default function ShareScreen() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [receivedData, setReceivedData] = useState(null);

  // Generate RSA key pair and set them in state
  useEffect(() => {
    const verifyLogin = async () => {
      const isLoggedIn = await checkLoggedInState();

      if (!isLoggedIn) {
        // If not logged in, redirect to Home and log out
        await logout();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    };

    verifyLogin();
    generateRSAKeys();
    activateNFC();
    
    return () => {
      NfcManager.setEventListener(NfcTech.Ndef, null); // Clean up NFC events
    };
  }, [navigation]);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // If app was inactive/backgrounded and now is active, check login state
        const isLoggedIn = await checkLoggedInState();
        if (!isLoggedIn) {
          // If the user is not logged in, redirect to Home for PIN re-entry
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // When the app goes into the background, invalidate login state
        await invalidateLoginState();
      }

      setAppState(nextAppState);
      generateRSAKeys();
      activateNFC();
      
      return () => {
        NfcManager.setEventListener(NfcTech.Ndef, null); // Clean up NFC events
      };
    };

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();  // Clean up event listener
    };
  }, [appState, navigation]);

  // Generate RSA key pair
  const generateRSAKeys = async () => {
    try {
      const keys = await RSA.generateKeys(2048); // 2048-bit key
      setPublicKey(keys.public);  // Store public key
      setPrivateKey(keys.private);  // Store private key
    } catch (error) {
      console.error('Error generating RSA keys:', error);
    }
  };

  // Activate NFC
  const activateNFC = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      
      const username = await getUsername(); // Get the local username from SQLite
      
      // Send public key and username via NFC
      const message = `${publicKey}|${username}`;  // Delimit public key and username
      await NfcManager.ndefHandler.writeNdefMessage([message]);
      
      // Listen for incoming NFC messages
      NfcManager.setEventListener(NfcTech.Ndef, async (tag) => {
        const receivedMessage = tag.ndefMessage[0].payload;
        handleReceivedMessage(receivedMessage);
      });
      
    } catch (error) {
      console.error('Error with NFC:', error);
    }
  };

  // Handle received NFC message
  const handleReceivedMessage = async (message) => {
    const [encryptedData] = message.split('|');  // Assuming encrypted data comes as one piece
    
    // Decrypt the data using the private RSA key
    const decryptedMessage = await RSA.decrypt(encryptedData, privateKey);
    const [receivedPublicKey, receivedUsername] = decryptedMessage.split('|');

    // Save the received public key and username in SQLite
    saveReceivedContact(receivedUsername, receivedPublicKey);
    
    // Update UI to reflect received data
    setReceivedData({ username: receivedUsername, publicKey: receivedPublicKey });
    Alert.alert('Received Contact', `Username: ${receivedUsername}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Share Screen</Text>
      
      {/* Display local public key */}
      <Text style={styles.info}>Public Key: {publicKey}</Text>

      {/* Display received data */}
      {receivedData && (
        <>
          <Text style={styles.info}>Received Username: {receivedData.username}</Text>
          <Text style={styles.info}>Received Public Key: {receivedData.publicKey}</Text>
        </>
      )}

      <Button title="Activate NFC" onPress={activateNFC} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  info: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
});
