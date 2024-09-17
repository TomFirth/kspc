import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { checkLoggedInState, logout } from '../auth';

const savedContacts = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

const activeChats = [
  { id: '1', name: 'Alice', newMessage: true },
  { id: '2', name: 'Bob', newMessage: false },
];

export default function ChatScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // If app was inactive/backgrounded and now is active, check login state
        const isLoggedIn = await checkLoggedInState();
        if (!isLoggedIn) {
          // If the user is not logged in, redirect to Home for PIN re-entry
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // When the app goes into the background, invalidate login state
        await invalidateLoginState();
      }

      setAppState(nextAppState);
    };

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();  // Clean up event listener
    };
  }, [appState, navigation]);

  // Open the modal to display saved contacts
  const openModal = () => {
    setModalVisible(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Render each contact in the modal
  const renderContact = ({ item }) => (
    <TouchableOpacity style={styles.contactItem}>
      <Text style={styles.contactText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render each active chat
  const renderChatItem = ({ item }) => (
    <View style={styles.chatRow}>
      <Text style={styles.chatText}>{item.name}</Text>
      {item.newMessage && <View style={styles.newMessageDot} />}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top bar with + and # buttons */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={openModal} style={styles.topBarButton}>
          <Text style={styles.topBarButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Share')} style={styles.topBarButton}>
          <Text style={styles.topBarButtonText}>#</Text>
        </TouchableOpacity>
      </View>

      {/* Active chat messages */}
      <FlatList
        data={activeChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
      />

      {/* Modal for saved contacts */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Saved Contacts</Text>
            <FlatList
              data={savedContacts}
              renderItem={renderContact}
              keyExtractor={(item) => item.id}
            />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#1c1c1c',
  },
  topBarButton: {
    marginLeft: 15,
    padding: 10,
  },
  topBarButtonText: {
    color: 'white',
    fontSize: 24,
  },
  chatList: {
    padding: 10,
  },
  chatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
  },
  chatText: {
    color: 'black',
    fontSize: 18,
  },
  newMessageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 18,
    color: 'black',
  },
});