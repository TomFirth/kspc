import { useEffect, useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { router, useRouter } from "expo-router";

import { styles } from '@/styles/styles';
import { getLocale } from '@/util/locale';

// display all active conversations with contacts
// only display username and alert to display new message (maybe contact tile background could be light green. new messages darker green)

const getRandomTimestamp = () => {
  const now = new Date();
  const randomTime = now.getTime() - Math.floor(Math.random() * 10000000000);
  return new Date(randomTime).toISOString();
};

const MessagesScreen = () => {
  const [locale, setLocale] = useState('');

  useEffect(() => {
    const loc = getLocale();
    setLocale(loc);
  }, []);

  const data = [
    { username: "Alice", uuid: "uuid-user-1", timestamp: getRandomTimestamp() },
    { username: "Bob", uuid: "uuid-user-2", timestamp: getRandomTimestamp() },
    { username: "Charlie", uuid: "uuid-user-3", timestamp: getRandomTimestamp() },
    { username: "David", uuid: "uuid-user-4", timestamp: getRandomTimestamp() },
    { username: "Ethan", uuid: "uuid-user-5", timestamp: getRandomTimestamp() },
    { username: "Freddie", uuid: "uuid-user-6", timestamp: getRandomTimestamp() },
    { username: "George", uuid: "uuid-user-7", timestamp: getRandomTimestamp() },
    { username: "Harry", uuid: "uuid-user-8", timestamp: getRandomTimestamp() },
  ];

  const sortedData = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const router = useRouter();

  const handlePress = (selectedUUID: string, selectedUsername: string) => {
    router.push({
      pathname: "/messages/thread/[uuid]",
      params: { selectedUUID, selectedUsername }
    });
  };

  const newContact = () => {
    router.push({
      pathname: "/contacts"
    });
  };

  return (
    <View style={styles.listMain}>
      {sortedData.map((user, index) => (
        <Pressable
          key={user.uuid}
          style={index === 0 || index == 1 || index == 2 ? styles.pressableDark : styles.pressable}
          onPress={() => handlePress(user.uuid, user.username)}
        >
          <Text style={styles.pressableText}>{user.username}</Text>
          <Text style={styles.lastMessageText}>Last message: {new Date(user.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })}</Text>
        </Pressable>
      ))}

      <Pressable style={styles.floatingButton} onPress={newContact}>
        <Image
          source={require('@/assets/contacts/user.png')}
          style={styles.floatingButtonImage}
        />
      </Pressable>
    </View>
  )
}

export default MessagesScreen;