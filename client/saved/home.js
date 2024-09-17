import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { savePin, getPin } from '../storage/secure';
import { saveUsername, getUsername, createTable } from '../storage/users';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState(Array(6).fill(''));
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // On component mount, check if a username already exists
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

  // Handle PIN entry and validation
  const handlePinSubmit = async () => {
    const storedPin = await getPin();
    const enteredPin = pin.join('');

    if (storedPin === enteredPin) {
      await SecureStore.setItemAsync('isLoggedIn', 'true');

      // Redirect to Chat screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Chat' }],
      });
    } else {
      setErrorMessage('Incorrect PIN. Please try again.');
    }
  };

  // Handle full form submission (username + pin)
  const handleSave = async () => {
    if (!username) {
      setErrorMessage('Username is required');
      return;
    }

    if (pin.join('').length !== 6) {
      setErrorMessage('PIN must be 6 digits');
      return;
    }

    // Save the username to SQLite
    saveUsername(username);

    // Save the PIN to Secure Store
    savePin(pin.join(''));

    // Navigate to Chat after successful save
    navigation.navigate('Chat');
  };

  return (
    <View style={styles.container}>
      {!isUsernameSet ? (
        <>
          <TextInput
            style={styles.usernameInput}
            placeholder="Username"
            placeholderTextColor="black"
            value={username}
            onChangeText={setUsername}
            autoFocus={true}
          />
        </>
      ) : (
        <Text style={styles.infoText}>Welcome back, {username}!</Text>
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
        ))}
      </View>

      <View style={styles.saveButtonContainer}>
        <Button
          title={isUsernameSet ? 'Enter PIN' : 'Save'}
          onPress={isUsernameSet ? handlePinSubmit : handleSave}
          color="black"
        />
      </View>

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
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
  usernameInput: {
    width: '80%',
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  pinInput: {
    width: 40,
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  saveButtonContainer: {
    width: '80%',
    alignItems: 'flex-end',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
});