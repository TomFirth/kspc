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

const ShareScreen = () => {
  return (
    <View>
      <Image
        source={require('@/assets/mobile.png')}
        style={styles.image_mobile}
      />
      <Image
        source={require('@/assets/qr-code.png')}
        style={styles.image_mobile}
      />
    </View>
  )
}

export default ShareScreen;