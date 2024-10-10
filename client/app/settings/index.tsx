import { useEffect, useState } from "react";
import { Text, TextInput, View, Pressable, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

import { styles } from '@/styles/styles';
import { deleteDB, getUser, updateUser } from '@/db/user';

const SettingsScreen = () => {
  const [settingsUuid, setSettingsUuid] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const user = await getUser();
        setSettingsUuid(user.uuid);
        setTempUsername(user.username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    loadSettings();
  }, [])

  const handleSave = () => {
    console.warn("Updated settings (not really)");
  };

  const saveTheme = (theme: string) => {
    setTheme(theme);
  };

  const deleteUser = async () => {
    if (tempUsername) {
      await deleteDB();
      router.push({
        pathname: "/"
      })
    }
  };

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
      <Pressable
        style={theme == 'light' ? styles.settingsSelected : styles.settingsUnselected}
        onPress={() => saveTheme("light")}>
        <Image
          source={require('@/assets/settings/light.png')}
          style={styles.settingsIcon}
        />
      </Pressable>
      <Pressable
        style={theme == 'dark' ? styles.settingsSelected : styles.settingsUnselected}
        onPress={() => saveTheme("dark")}>
        <Image
          source={require('@/assets/settings/dark.png')}
          style={styles.settingsIcon}
        />
      </Pressable>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <Pressable style={styles.deleteButton} onPress={deleteUser}>
        <Text style={styles.buttonText}>Delete User</Text>
      </Pressable>
    </View>
  )
}

export default SettingsScreen;