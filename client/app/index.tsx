import React, { useState, useEffect } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { v4 as uuidv4 } from 'uuid';

import { styles } from '@/styles/styles';

import { savePin, getPin } from '@/db/secure';
import { saveUser, getUser, createTable } from '@/db/users';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [uuid, setUuid] = useState('');
  //   const [pin, setPin] = useState(Array(6).fill(''));
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      createTable();
      const { uuid, username } = await getUser();
      if (uuid && username) {
        setUuid(uuid);
        setUsername(username);
        setAuthenticated(true);
      }
    };
    checkUserExists();
  }, []);

  const handleSave = async () => {
    if (!username) {
      console.error('Username is required');
      return;
    }
    createTable();
    const generatedUuid = uuidv4();
    saveUser(generatedUuid, username);
    setUuid(uuid);
    setUsername(username);
    setAuthenticated(true);

    router.push("/messages");
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="white"
        autoFocus={true}
      />
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={handleSave}
        >Submit</Text>
      </TouchableOpacity>
      <Pressable style={styles.button} onPress={() => router.push("/messages")}>
        <Text
          style={styles.buttonText}>Messages</Text>
      </Pressable>
      <Text>Logged in: {username.username}</Text>
    </View>
  )
}

export default HomeScreen;