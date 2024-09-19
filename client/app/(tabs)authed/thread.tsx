import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Platform } from 'react-native';

import { styles } from '@/styles/styles';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ThreadScreen({ route }) {
  // const { userId } = route.params;

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Thread</ThemedText>
      </ThemedView>
    </>
  );
}