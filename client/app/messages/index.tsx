import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { styles } from '@/styles/styles';

// display all active conversations with contacts
// only display username and alert to display new message (maybe contact tile background could be light green. No new messages dark green)
// press to open thread

const MessagesScreen = () => {
  return (
    <View>
      <Text>Messages Page</Text>
      <Pressable style={styles.button} onPress={() => router.push("contacts")}>
        <Text
          style={styles.buttonText}>View Contacts</Text>
      </Pressable>
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