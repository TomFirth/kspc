import { Text, View, Image } from "react-native";

import { styles } from '@/styles/styles';

// QR code for users to share the app's download page

// open nfc
// decrypt public key
// send/recieve:
/* {
  uuid
  username
  public key
} */
// open edit contact

// pre sharing:
// have button that creates new contact

const ShareScreen = () => {
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
    </View>
  )
}

export default ShareScreen;