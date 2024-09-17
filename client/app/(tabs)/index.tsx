import React, { useState, useEffect } from 'react';
import { Image, Platform, View, TextInput, Button, StyleSheet, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { savePin, getPin } from '@/storage/secure';
import { saveUsername, getUsername, createTable } from '@/storage/users';

export default function HomeScreen() {
  /* const [username, setUsername] = useState(''); */
  const pin = Array(6).fill('');
  const isUsernameSet = false;
  /* const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkUserExists = async () => {
      createTable(); // Ensure the table is created
      const storedUsername = await getUsername();
      if (storedUsername) {
        setUsername(storedUsername);
        setIsUsernameSet(true);
      }
    };
    checkUserExists();
  }, []);

  const handlePinSubmit = async () => {
    const storedPin = await getPin();
    const enteredPin = pin.join('');

    if (storedPin === enteredPin) {
      await SecureStore.setItemAsync('isLoggedIn', 'true');

      // Redirect to Chat screen
    } else {
      setErrorMessage('Incorrect PIN. Please try again.');
    }
  }; */

  /* const handleSave = async () => {
    if (!username) {
      setErrorMessage('Username is required');
      return;
    }

    if (pin.join('').length !== 6) {
      setErrorMessage('PIN must be 6 digits');
      return;
    }

    // saveUuid
    saveUsername(username);
    savePin(pin.join(''));

    // Navigate to Chat after successful save
  }; */

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      {!isUsernameSet ? (
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="white"
          autoFocus={true}
        />
      ) : (<></>) }
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.pinInput}
            onChangeText={(value) => {
              const newPin = [...pin];
              newPin[index] = value;
            }}
            keyboardType="numeric"
            maxLength={1}
          />
        )) }
      </View>
      {/*<Button
        title={isUsernameSet ? 'Enter PIN' : 'Save'}
        onPress={isUsernameSet ? handlePinSubmit : handleSave}
        color="black"
      />*/}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'black',   // Black background
    color: 'white',             // White text color
    borderRadius: 10,           // Rounded edges
    paddingHorizontal: 15,      // Horizontal padding inside the input
    paddingVertical: 10,        // Vertical padding inside the input
    fontSize: 16,               // Font size
    width: '80%',               // Set container to 80% of screen width
    alignSelf: 'center',              // Center the container horizontally
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Spacing between inputs
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '80%',                     // Set container to 80% of screen width
    alignSelf: 'center',              // Center the container horizontally
  },
  pinInput: {
    backgroundColor: 'black',         // Black background
    color: 'white',                   // White text color
    borderRadius: 10,                 // Rounded edges
    padding: 10,                      // Padding inside input
    fontSize: 18,                     // Font size for the PIN digits
    width: 45,                        // Width for each PIN input
    height: 45,                       // Height for each PIN input
    borderColor: 'gray',              // Optional: Border color to make the input stand out
    borderWidth: 1,
  },
});
