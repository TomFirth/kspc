import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { styles } from '@/styles/styles';

const MessagesScreen = () => {
  return (
    <View>
      <Pressable style={styles.button} onPress={() => router.push("share")}>
        <Text
          style={styles.buttonText}>Add Contact</Text>
      </Pressable>
      <Pressable onPress={() => router.push({
        pathname: "/messages/message/[uuid]",
        params: { uuid: '1' }
      })}>
        <Text>User 1</Text>
      </Pressable>
      <Pressable onPress={() => router.push({
        pathname: "/messages/message/[uuid]",
        params: { uuid: '2' }
      })}>
        <Text>User 2</Text>
      </Pressable>
    </View>
  )
}

export default MessagesScreen;