import { Text, View, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { v4 as uuidv4 } from 'uuid';

import { saveContact } from '@/db/contacts';
import { styles } from '@/styles/styles';
import { getTimestamp } from '@/util/utilities';
import { generateKeyPair } from '@/util/encrypt';

// QR code for users to share the app's download page

// open nfc
// decrypt public key
// send/receive:
/* {
  uuid
  username
  public key
} */

const firstNames = ['Adam', 'Bob', 'Charlie', 'David', 'Edward', 'Frank', 'George', 'Harry', 'Ian', 'Jack'];
const surnames = ['Anderson', 'Brown', 'Clark', 'Davis', 'Evans', 'Fisher', 'Green', 'Harris', 'Ingram', 'Jones'];

const ShareScreen = () => {
  function generateRandomName() {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];

    const uuid = uuidv4();
    const fullName = `${randomFirstName} ${randomSurname}`;

    return { fullName, uuid };
  }

  const handlePress = () => {
    const { uuid, username } = generateRandomName();
    const key = generateKeyPair(uuid);
    saveContact(uuid, username, key, true, getTimestamp());
    router.push({
      pathname: "/contacts/edit",
      params: { selectedUUID: uuid, selectedUsername: username }
    });
  };

  return (
    <View>
      <Image
        source={require('@/assets/share/mobile.png')}
        style={styles.image_mobile}
      />
      <Image
        source={require('@/assets/share/qr-code.png')}
        style={styles.image_mobile}
      />
      <Pressable
        style={styles.button}
        onPress={() => handlePress()}
      >
        <Text style={styles.buttonText}>Add Contact</Text>
      </Pressable>
    </View>
  )
}

export default ShareScreen;