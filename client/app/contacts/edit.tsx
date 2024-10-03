import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { styles } from '@/styles/styles';

// display editable username
// save

const ShareScreen = () => {
  const { uuid } = useLocalSearchParams();

  const handleDeleteContact = () => {
    console.warn("Deleted contact (not really)");
  };

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Editing UUID: {uuid}</Text>

      <Pressable style={styles.deleteButton} onPress={handleDeleteContact}>
        <Text style={styles.ButtonText}>Delete Contact</Text>
      </Pressable>
    </View>
  )
}

export default ShareScreen;