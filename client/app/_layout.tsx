import { Stack } from "expo-router";
import { RouteProp } from '@react-navigation/native';

import { AuthProvider } from '../AuthContext';

const RootLayout = () => {
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
        <Stack.Screen name="contacts/edit" />
        <Stack.Screen name="messages/thread/[uuid]" />
        <Stack.Screen name="share/index" options={{
          headerTitle: "Share",
          headerStyle: {
            backgroundColor: "red"
          }
        }} />
        <Stack.Screen name="settings/index" options={{
          headerTitle: "Settings"
        }} />
      </Stack>
    </AuthProvider>
  );
}

export default RootLayout;