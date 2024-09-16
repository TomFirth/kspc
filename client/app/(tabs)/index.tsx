import React, { useState, useEffect } from 'react';
import { Image, Platform, View, TextInput, Button, StyleSheet, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { savePin, getPin } from '@/storage/secure';
import { saveUsername, getUsername, createTable } from '@/storage/users';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState(Array(6).fill(''));
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
  };

  const handleSave = async () => {
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
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      {!isUsernameSet ? (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Username</ThemedText>
          <ThemedText>
            <TextInput
              style={styles.usernameInput}
              placeholder="Username"
              placeholderTextColor="black"
              value={username}
              onChangeText={setUsername}
              autoFocus={true}
            />
          </ThemedText>
        </ThemedView>
      ) : (<></>)}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">PIN</ThemedText>
        <ThemedText>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              value={digit}
              onChangeText={(value) => {
                const newPin = [...pin];
                newPin[index] = value;
                setPin(newPin);
              }}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </ThemedText>
      </ThemedView>
      <Button
        title={isUsernameSet ? 'Enter PIN' : 'Save'}
        onPress={isUsernameSet ? handlePinSubmit : handleSave}
        color="black"
      />
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
