import { Text, View } from "react-native";
import { Link } from "expo-router";

const ContactsScreen = () => {
  return (
    <View>
      <Link href="/1">User 1</Link>
      <Link href="/1">User 1</Link>
    </View>
  )
}

export default ContactsScreen;