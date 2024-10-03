import { Stack } from "expo-router";
import { RouteProp } from '@react-navigation/native';

import { AuthProvider } from '../AuthContext';

type MessageRouteParams = {
  'messages/message/[uuid]': { uuid: string };
};

const RootLayout = ({ route }: { route: RouteProp<MessageRouteParams, 'messages/message/[uuid]'> }) => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          headerTitle: "KSPChat"
        }} />
        <Stack.Screen name="messages/index" options={{
          headerTitle: "Messages"
        }} />
        <Stack.Screen name="contacts/index" options={{
          headerTitle: "Contacts"
        }} />
        <Stack.Screen name="contacts/edit" options={{
          headerTitle: "Edit Contact"
        }} />
        <Stack.Screen name="messages/message/[uuid]" options={{
          headerTitle: "User: "
        }} />
        <Stack.Screen name="share/index" options={{
          headerTitle: "Share",
          headerStyle: {
            backgroundColor: "red"
          }
        }} />
      </Stack>
    </AuthProvider>
  );
}

export default RootLayout;