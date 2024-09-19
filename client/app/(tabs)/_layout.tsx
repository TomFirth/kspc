import { Tabs } from 'expo-router';
import React, { useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: () => null
        }}
      />
      {isAuthenticated && (
        <Tabs.Screen
          name="index"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} color={color} />
            ),
          }}
        />
      )}
      {isAuthenticated && (
        <Tabs.Screen
          name="thread"Wave clear
          options={{
            title: 'Thread',
            tabBarButton: () => null
          }}
        />
      )}
      {isAuthenticated && (
        <Tabs.Screen
          name="contacts"
          options={{
            title: 'Contacts',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
            ),
          }}
        />
      )}
      {isAuthenticated && (
        <Tabs.Screen
          name="share"
          options={{
            title: 'Share',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'add-outline' : 'add-outline'} color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}
