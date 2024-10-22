import { useEffect, useState } from "react";
import { Image, Text, TextInput, View, Pressable, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

import { updateContact } from '@/db/contacts';
import { styles } from '@/styles/styles';

const ShareScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const { selectedUUID, selectedUsername } = useLocalSearchParams();
  const [contactUsername, setContactUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');

  useEffect(() => {
    updateHeaderTitle(selectedUsername as string);
  }, []);

  const updateHeaderTitle = (username: string) => {
    navigation.setOptions({
      title: `Edit: ${username}`,
    });
  }

  const handleDeleteContact = () => {
    console.warn("Deleted contact (not really)");
  };

  const handleSave = async () => {
    updateHeaderTitle(contactUsername);
    updateContact(selectedUUID as string, contactUsername as string);
    console.warn('Contact Updated');
  };

const contacts = () => {
  router.push({
    pathname: "/contacts"
  });
};

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Editing UUID: { selectedUUID }</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        autoFocus={true}
        value={selectedUsername as string}
        onChangeText={(text) => setTempUsername(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <Pressable style={styles.deleteButton} onPress={handleDeleteContact}>
        <Text style={styles.buttonText}>Delete Contact</Text>
      </Pressable>

      <Pressable style={styles.floatingButton} onPress={contacts}>
        <Image
          source={require('@/assets/contacts/user.png')}
          style={styles.floatingButtonImage}
        />
      </Pressable>
    </View>
  )
}

export default ShareScreen;