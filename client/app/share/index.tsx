import { Text, View, Image, Pressable } from "react-native";

import { styles } from '@/styles/styles';

// QR code for users to share the app's download page

// open nfc
// decrypt public key
// send/receive:
/* {
  uuid
  username
  public key
} */
// open edit contact

// pre sharing:
// add contact to send random data
// contact design:
/*
{
  username: username,
  uuid: uuid,
  lastRead: 1301090400
  key: ''
}
*/

const ShareScreen = () => {
  const handlePress = (selectedUUID: string, selectedUsername: string, selectedKey: string) => {
    console.warn("Added contact (not really)");
    router.push({
      pathname: "/contacts/edit",
      params: { selectedUUID, selectedUsername, selectedKey }
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
        onPress={() => handlePress('', '', '')}
      >
        <Text style={styles.buttonText}>Add Contact</Text>
      </Pressable>
    </View>
  )
}

export default ShareScreen;