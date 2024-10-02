import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { styles } from '@/styles/styles';

// display unencrypted message thread

const ThreadScreen = () => {
  const { uuid } = useLocalSearchParams();

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Sending message to UUID: {uuid}</Text>
    </View>
  )
}

export default ThreadScreen;