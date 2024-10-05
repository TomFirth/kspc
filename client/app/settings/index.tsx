import { useEffect, useState } from "react";
import { Text, TextInput, View, Pressable, TouchableOpacity } from "react-native";

import { styles } from '@/styles/styles';
import { getUser, updateUser } from '@/db/user';

const SettingsScreen = () => {
  const [uuid, setUuid] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const { uuid, username, theme } = getUser();
    setUuid(uuid);
    setTempUsername(username);
    setTheme(theme);
  }, [])

  const handleSave = () => {
    console.warn("Updated settings (not really)");
  };

  const theme = (theme: string) => {
    setTheme(theme);
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
        style={theme = 'light' ? styles.settingsSelected : styles.settingsUnselected}
        onPress={theme("light")}>
        <Image
          source={require('@/assets/settings/light.png')}
          style={styles.settingsIcon}
        />
      </Pressable>
      <Pressable
        style={theme = 'dark' ? styles.settingsSelected : styles.settingsUnselected}
        onPress={theme("dark")}>
        <Image
          source={require('@/assets/settings/dark.png')}
          style={styles.settingsIcon}
        />
      </Pressable>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen;