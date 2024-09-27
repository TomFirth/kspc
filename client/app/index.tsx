import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { styles } from '@/styles/styles';

const HomeScreen = () => {
  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        autoFocus={true}
      />
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
        >Submit</Text>
      </TouchableOpacity>
      <Pressable style={styles.button} onPress={() => router.push("/messages")}>
        <Text
          style={styles.buttonText}>Messages</Text>
      </Pressable>
      <Text>Logged in:</Text>
    </View>
  )
}

export default HomeScreen;