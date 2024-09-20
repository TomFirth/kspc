import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Page</Text>
      <Pressable onPress={() => router.push("/messages")}>
        <Text>Go to Messages</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen;