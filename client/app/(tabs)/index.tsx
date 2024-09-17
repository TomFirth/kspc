import React, { useState, useEffect } from 'react';
import { Image, Platform, View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { savePin, getPin } from '@/storage/secure';
import { saveUser, getUser, createTable } from '@/storage/users';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState(Array(6).fill(''));
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  /* useEffect(() => {
    const checkUserExists = async () => {
      createTable();
      const { username, uuid } = await getUser();
      if (username) {
        setUser({ username, uuid });
        setIsUsernameSet(true);
      }
    };
    checkUserExists();
  }, []); */

  /* const handlePinSubmit = async () => {
    const storedPin = await getPin();
    const enteredPin = pin.join('');

    if (storedPin === enteredPin) {
      await SecureStore.setItemAsync('isLoggedIn', 'true');

      // Redirect to Chat screen
    } else {
      setErrorMessage('Incorrect PIN. Please try again.');
    }
  }; */

  const handleSave = async () => {
    if (!username) {
      setErrorMessage('Username is required');
      return;
    }

    if (pin.join('').length !== 6) {
      setErrorMessage('PIN must be 6 digits');
      return;
    }

    // saveUser(uuidv4(), username);
    // savePin(pin.join(''));

    // Navigate to Chat after successful save
  };

  return (
    <View style={styles.main}>
      {!isUsernameSet && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="white"
          autoFocus={true}
        />
      )}
      <View style={styles.pinContainer}>
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
        )) }
      </View>
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={isUsernameSet ? handlePinSubmit : handleSave}
        >Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
  },
  pinInput: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    width: 45,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
