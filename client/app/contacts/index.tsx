import React, { useState } from 'react';
import { Modal, View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

import { styles } from '@/styles/styles';

const ContactsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUUID, setSelectedUUID] = useState<string | null>(null);
  const router = useRouter();

  const data = [
    { username: "Alice", uuid: "uuid-user-1" },
    { username: "Bob", uuid: "uuid-user-2" },
    { username: "Charlie", uuid: "uuid-user-3" },
    { username: "David", uuid: "uuid-user-4" },
  ];

  const sortedData = data.sort((a, b) => a.username.localeCompare(b.username));

  const handlePress = (uuid: string) => {
    setSelectedUUID(uuid);
    setModalVisible(true);
  };

  const handleSendMessage = () => {
    if (selectedUUID) {
      setModalVisible(false);
      router.push({
        pathname: "/messages/message/[uuid]",
        params: { uuid: selectedUUID }
      });
    }
  };

  const handleEditContact = () => {
    if (selectedUUID) {
      setModalVisible(false);
      router.push({
        pathname: "/contacts/edit",
        params: { uuid: selectedUUID }
      });
    }
  };

  return (
    <View style={styles.main}>
      {sortedData.map((user) => (
        <Pressable
          key={user.uuid}
          style={styles.pressable}
          onPress={() => handlePress(user.uuid)}
        >
          <Text style={styles.pressableText}>{user.username}</Text>
        </Pressable>
      ))}

      <Pressable style={styles.floatingButton} onPress={() => router.push("share")}>
        <Image
          source={require('@/assets/user.png')} // Make sure the image path is correct
          style={styles.floatingButtonImage}
        />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable style={styles.modalButton} onPress={handleEditContact}>
              <Text style={styles.modalButtonText}>Edit</Text>
            </Pressable>

            <Pressable style={styles.modalButton} onPress={handleSendMessage}>
              <Text style={styles.modalButtonText}>Message</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ContactsScreen;