import React, { useState, useEffect } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

import { styles } from '@/styles/styles';
import { createUserTable, getUser, saveUser, deleteDB } from '@/db/user';
import { savePin, checkPin } from '@/db/secure';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [uuid, setUuid] = useState('');
  const [pin, setPin] = useState(Array(6).fill(''));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        router.push({
          pathname: "/messages"
        })
      }
      createUserTable();
      const user = await getUser();
      setUsername(user.username);
      setUuid(user.uuid);
    })();
  }, [])

  const handleSave = async () => {
    const tempPin = pin.join('').trim();
    if (tempUsername.trim()) {
      try {
        const uuid = uuidv4();
        await saveUser(uuid, tempUsername);
        setUsername(tempUsername);
        setUuid(uuid);
        if (tempPin.length == 6) {
          try {
            await savePin(tempPin);
            setIsAuthenticated(true);
            router.push({
              pathname: "/messages"
            })
          } catch (error) {
            console.error('Error saving pin', error);
          }
        }
      } catch (error) {
        console.error('Error saving user', error);
      }
    } else {
      console.warn('Username cannot be empty');
    }
  };

  const handlePinSave = async () => {
    const tempPin = pin.join('').trim();
    const checkPinReq = await checkPin(tempPin);
    setIsAuthenticated(checkPinReq);
    if (isAuthenticated) {
      router.push({
        pathname: "/messages"
      })
    }
  }

  const deleteUser = async () => {
    if (username) {
      await deleteDB();
      router.push({
        pathname: "/"
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.main}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="white"
          autoFocus={true}
          value={tempUsername}
          onChangeText={(text) => setTempUsername(text)}
        />

        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              value={digit}
              onChangeText={(value) => {
                if (value.length <= 1) {  // Ensures only a single character is accepted
                  const newPin = [...pin];
                  newPin[index] = value;  // Update the specific digit in the pin array
                  setPin(newPin);  // Update state with the new pin array
                }
              }}
              keyboardType="numeric"
              maxLength={1}  // Restricts to one character
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Pressable style={styles.button} onPress={() => router.push("/messages")}>
          <Text style={styles.buttonText}>Messages</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              value={digit}
              onChangeText={(value) => {
                if (value.length <= 1) {  // Ensures only a single character is accepted
                  const newPin = [...pin];
                  newPin[index] = value;  // Update the specific digit in the pin array
                  setPin(newPin);  // Update state with the new pin array
                }
              }}
              keyboardType="numeric"
              maxLength={1}  // Restricts to one character
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePinSave}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Pressable style={styles.button} onPress={() => router.push("/messages")}>
          <Text style={styles.buttonText}>Messages</Text>
        </Pressable>

        <Text>Logged in: {username ? username : "None"}</Text>

        <TouchableOpacity style={styles.button} onPress={deleteUser}>
          <Text style={styles.buttonText}>Delete User</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default HomeScreen;
