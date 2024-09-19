import React, { useState, useEffect } from 'react';
import { Image, Platform, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import { styles } from '@/styles/styles';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { savePin, getPin } from '@/storage/secure';
import { saveUser, getUser, createTable } from '@/storage/users';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
//   const [pin, setPin] = useState(Array(6).fill(''));
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      createTable();
      const { uuid, username } = await getUser();
      if (uuid && username) {
        setUsername({ uuid, username });
        setAuthenticated(true);
      }
    };
    checkUserExists();
  }, []);

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
      console.error('Username is required');
      return;
    }
    createTable();

//     if (pin.join('').length !== 6) {
//       setErrorMessage('PIN must be 6 digits');
//       return;
//     }
    const generatedUuid = uuidv4();
    saveUser(generatedUuid, username);
    setUsername({ uuid, username });
    // savePin(pin.join(''));

    navigation.navigate('Chat');
  };

  return (
    <View style={styles.main}>
      {/*{!isUsernameSet && (*/}
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="white"
          autoFocus={true}
        />
      {/*)}*/}
      {/*<View style={styles.pinContainer}>
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
      </View>*/}
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={handleSave}
        >Submit</Text>
      </TouchableOpacity>
    </View>
  );
}