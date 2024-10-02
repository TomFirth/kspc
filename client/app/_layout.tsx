import { Stack } from "expo-router";
import { RouteProp } from '@react-navigation/native';

type MessageRouteParams = {
  'messages/message/[uuid]': { uuid: string };
};

const RootLayout = ({ route }: { route: RouteProp<MessageRouteParams, 'messages/message/[uuid]'> }) => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: "Welcome"
      }} />
      <Stack.Screen name="messages/index" options={{
        headerTitle: "Messages"
      }} />
      <Stack.Screen name="messages/contacts" options={{
        headerTitle: "Contacts"
      }} />
      <Stack.Screen name="messages/message/[uuid]" options={{
        headerTitle: `User: ${route?.params?.uuid}`
      }} />
      <Stack.Screen name="share/index" options={{
        headerTitle: "Add Contact",
        headerStyle: {
          backgroundColor: "red"
        }
      }} />
    </Stack>
  );
}

export default RootLayout;