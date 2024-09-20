import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

const MessagesScreen = () => {
  return (
    <View>
      <Text>Messages Page</Text>
      <Pressable onPress={() => router.push("/share")}>
        <Text>Add Contact</Text>
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