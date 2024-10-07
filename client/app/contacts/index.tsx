import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

import { createContactsTable, getAllContacts } from '@/db/contacts';
import { styles } from '@/styles/styles';

const ContactsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUUID, setSelectedUUID] = useState<string | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [contacts, setContacts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getContacts = async () => {
      await createContactsTable();
      const allContacts = await getAllContacts();
      setContacts(allContacts);
    }
    getContacts();
  }, [])

  const handlePress = (selectedUUID: string, selectedUsername: string) => {
    setSelectedUUID(selectedUUID);
    setSelectedUsername(selectedUsername);
    setModalVisible(true);
  };

  const handleSendMessage = () => {
    if (selectedUUID) {
      setModalVisible(false);
      router.push({
        pathname: "/messages/thread/[uuid]",
        params: { selectedUUID, selectedUsername }
      });
    }
  };

  const handleEditContact = () => {
    if (selectedUUID && selectedUsername) {
      setModalVisible(false);
      router.push({
        pathname: "/contacts/edit",
        params: { selectedUUID: selectedUUID, selectedUsername: selectedUsername }
      });
    }
  };

  return (
    <View style={styles.listMain}>
      {contacts.length > 0 ? (
        contacts.map(user => (
          <Pressable
            key={user.uuid}
            style={styles.pressableDark}
            onPress={() => handlePress(user.uuid, user.username)}
          >
            <Text style={styles.pressableText}>{user.username}</Text>
          </Pressable>
        ))
      ) : (
        <Text style={styles.noContactsText}>There are currently no contacts</Text>
      )}

      <Pressable style={styles.floatingButton} onPress={() => router.push("share")}>
        <Image
          source={require('@/assets/share/qr-code.png')}
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