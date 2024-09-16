import { Image, StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ChatScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Messages</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
