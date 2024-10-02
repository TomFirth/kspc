import React, { useState, useEffect } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

import { styles } from '@/styles/styles';
import { createUserTable, getUser, saveUser, deleteDB } from '@/db/user';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [uuid, setUuid] = useState('');
  const [pin, setPin] = useState(Array(6).fill(''));

  useEffect(() => {
    (async () => {
      createUserTable();
      const user = await getUser();
      setUsername(user.username);
      setUuid(user.uuid);
    })();
  }, [])

  const handleSave = async () => {
    // check pin length
    if (tempUsername.trim()) {
      try {
        const uuid = uuidv4();
        await saveUser(uuid, tempUsername);
        setUsername(tempUsername);
        setUuid(uuid);
      } catch (error) {
        console.error('Error saving user', error);
      }
    } else {
      console.warn('Username cannot be empty');
    }
  };

  const deleteUser = async () => {
    if (username) {
      await deleteDB();
      router.push("./", { relativeToDirectory: true })
    }
  }

  if (!username) {
    return (
      <View style={styles.main}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="white"
          autoFocus={true}
          value={tempUsername}
          onChangeText={(text) => setTempUsername(text)}
          keyboardType="numeric"
        />

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
                const newPin = [...pin];
                newPin[index] = value;
              }}
              keyboardType="numeric"
              maxLength={1}
            />
          )) }
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
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
