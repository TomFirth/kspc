import { useEffect, useState } from "react";
import { Text, TextInput, View, Pressable, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { updateContact } from '@/db/contacts';
import { styles } from '@/styles/styles';

const ShareScreen = () => {
  const navigation = useNavigation();
  const { selectedUUID, selectedUsername } = useLocalSearchParams();
  const [contactUsername, setContactUsername] = useState('');

  useEffect(() => {
    updateHeaderTitle(selectedUsername);
  }, []);

  const updateHeaderTitle = (username) => {
    navigation.setOptions({
      title: `Edit: ${username}`,
    });
  }

  const handleDeleteContact = () => {
    console.warn("Deleted contact (not really)");
  };

  const handleSave = async () => {
    updateHeaderTitle(contactUsername);
    await updateContact(selectedUUID, contactUsername);
    console.warning('Contact Updated');
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