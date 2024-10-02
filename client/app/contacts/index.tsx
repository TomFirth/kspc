import React, { useState } from 'react';
import { Modal, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { styles } from '@/styles/styles';

const ContactsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUUID, setSelectedUUID] = useState<string | null>(null);
  const router = useRouter();

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
      <Pressable style={styles.pressable} onPress={() => handlePress('uuid-user-1')}>
        <Text style={styles.pressableText}>User 1</Text>
      </Pressable>

      <Pressable style={styles.pressable} onPress={() => handlePress('uuid-user-2')}>
        <Text style={styles.pressableText}>User 2</Text>
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
              <Text style={styles.modalButtonText}>Edit Contact</Text>
            </Pressable>

            <Pressable style={styles.modalButton} onPress={handleSendMessage}>
              <Text style={styles.modalButtonText}>Send Message</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ContactsScreen;