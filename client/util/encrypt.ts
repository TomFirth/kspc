import { RSAKeychain } from 'react-native-rsa-native';

interface KeyPair {
  public: string;
  private: string;
}

export const encrypt = async (input: string, keys: KeyPair): Promise<void> => {
  RSAKeychain.encrypt(input, keys.public)
    .then(encodedMessage => {
      console.log(`the encoded message is ${encodedMessage}`);
      return encodedMessage;
    });
}

export const decrypt = async (input: string, keys: KeyPair): Promise<void> => {
  RSAKeychain.decrypt(input, keys.private)
    .then(decryptedMessage => {
      console.log(`The original message was ${decryptedMessage}`);
      return decryptedMessage;
    });
    await RSAKeychain.deletePrivateKey(keys.private);
}

export const signInput = async (input: string, keyTag: string): Promise<void> => {
  let messageSignature = await RSAKeychain.sign(input, keyTag);

  if (await RSAKeychain.verify(messageSignature, input, keyTag)) {
    // The signature matches: trust this message.
  } else {
    console.error('Keys do not match')
  }
  await RSAKeychain.deletePrivateKey(keyTag);
}

export const generateKeyPair = async (keyTag: string): Promise<string> => {
  console.log('RSAKeychain', RSAKeychain);
  let keys = await RSAKeychain.generate(keyTag);
  await RSAKeychain.deletePrivateKey(keyTag);
  return keys.public;
}