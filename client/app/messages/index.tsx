import { Pressable, Text, View } from "react-native";
import { router, useRouter } from "expo-router";

import { styles } from '@/styles/styles';

// display all active conversations with contacts
// only display username and alert to display new message (maybe contact tile background could be light green. No new messages dark green)
// press to open thread

const getRandomTimestamp = () => {
  const now = new Date();
  const randomTime = now.getTime() - Math.floor(Math.random() * 10000000000); // Random time in milliseconds
  return new Date(randomTime).toISOString(); // Return ISO timestamp
};

const MessagesScreen = () => {
  const data = [
    { username: "Alice", uuid: "uuid-user-1", timestamp: getRandomTimestamp() },
    { username: "Bob", uuid: "uuid-user-2", timestamp: getRandomTimestamp() },
    { username: "Charlie", uuid: "uuid-user-3", timestamp: getRandomTimestamp() },
    { username: "David", uuid: "uuid-user-4", timestamp: getRandomTimestamp() },
  ];

  const sortedData = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const router = useRouter();

  const handlePress = (uuid: string) => {
    router.push({
      pathname: "/messages/message/[uuid]",
      params: { uuid: uuid }
    });
  };

  const newContact = () => {
    router.push({
      pathname: "/contacts"
    });
  };

  return (
    <View style={styles.main}>
      {sortedData.map((user) => (
        <Pressable
          key={user.uuid}
          style={styles.pressable}
          onPress={() => handlePress(user.uuid)}
        >
          <Text style={styles.pressableText}>{user.username}</Text>
          <Text style={styles.lastMessageText}>Last message: {new Date(user.timestamp).toLocaleString()}</Text>
        </Pressable>
      ))}

      <Pressable style={styles.floatingButton} onPress={newContact}>
        <Text style={styles.floatingButtonText}>+</Text>
      </Pressable>
    </View>
  )
}

export default MessagesScreen;