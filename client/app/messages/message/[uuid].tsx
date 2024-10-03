import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from "expo-router";

import { styles } from '@/styles/styles';

const getRandomMessage = () => {
  const messages = [
    "Hey, how are you?",
    "I'm good, thanks!",
    "What are you up to?",
    "Let's meet up later.",
    "Sounds good!",
    "Don't forget to bring the documents.",
    "I'll send them over soon.",
    "Thanks!",
    "See you later.",
    "Take care!"
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

const getRandomTimestamp = () => {
  const now = new Date();
  const randomTime = now.getTime() - Math.floor(Math.random() * 10000000000);
  return new Date(randomTime).toISOString();
};

function generateRandomMessages(numMessages) {
  const messageArray = [];

  for (let i = 0; i < numMessages; i++) {
    messageArray.push({
      timestamp: getRandomTimestamp(),
      message: getRandomMessage(),
      fromUser: Math.random() > 0.5,
    });
  }

  return messageArray;
}

// display unencrypted message thread
// check last message read

const ThreadScreen = () => {
  messageData = generateRandomMessages(20);

  const userMessages = messageData;
  const [messageInput, setMessageInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const MessageBubble = ({ message, fromUser }) => {
    return (
      <View style={[styles.messageContainer, fromUser ? styles.userMessage : styles.receivedMessage]}>
        <Text style={styles.messageText}>{message.message}</Text>
        <Text style={styles.timestampText}>{new Date(message.timestamp).toLocaleString()}</Text>
      </View>
    );
  };

  const { uuid } = useLocalSearchParams();

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        {/* Messages ScrollView */}
        <ScrollView style={styles.messageList}>
          {userMessages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              fromUser={message.fromUser}
            />
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            value={messageInput}
            onChangeText={setMessageInput}
            placeholder="Type a message"
            style={[styles.textInput, { height: Math.max(40, inputHeight) }]} // Adjust the height dynamically
            multiline
            onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)} // Adjust height
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ThreadScreen;