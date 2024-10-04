import { useEffect, useState } from "react";
import { Text, TextInput, View, Pressable, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { styles } from '@/styles/styles';

// save

const ShareScreen = () => {
  const navigation = useNavigation();
  const { selectedUUID, selectedUsername } = useLocalSearchParams();
  const [contactUsername, setContactUsername] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: `Edit: ${selectedUsername}`,
    });
  }, []);

  const handleDeleteContact = () => {
    console.warn("Deleted contact (not really)");
  };

  const handleSave = () => {
    console.warn("Edited contact (not really)");
  };

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Editing UUID: { selectedUUID }</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        autoFocus={true}
        value={selectedUsername}
        onChangeText={(text) => setContactUsername(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <Pressable style={styles.deleteButton} onPress={handleDeleteContact}>
        <Text style={styles.ButtonText}>Delete Contact</Text>
      </Pressable>
    </View>
  )
}

export default ShareScreen;