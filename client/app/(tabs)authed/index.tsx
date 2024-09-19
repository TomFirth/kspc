import { Image, Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

import { styles } from '@/styles/styles';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ChatScreen() {
  // const navigation = useNavigation();

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Messages</ThemedText>
        {/*<Button
          title="Go to Chat"
          onPress={() => navigation.navigate('chat', { userId: 'ofdfgvbhn-fvgbhbnj' })}
        />*/}
      </ThemedView>
    </>
  );
}