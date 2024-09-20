import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ThreadScreen = () => {
  const { uuid } = useLocalSearchParams();
  return (
    <View>
      <Text>Thread Page - User: { uuid }</Text>
    </View>
  )
}

export default ThreadScreen;