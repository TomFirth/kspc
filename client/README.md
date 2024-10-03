# Key Signing Party Chat

## What
Kspc is a mobile app with p2p encryption.
Add people to your contacts and share your public rsa key via nfc. Your contacts are encrypted with your public rsa key. All of this is encrypted by a pin and locked to your device.

## How to run for development   
### Android
- Install [Node](https://nodejs.org/en/download/package-manager) & [Android Studio](https://developer.android.com/studio)
- Have Android Studio running with either the emulator or connected to your Android device via wifi.
- `cd client && npm i && npm start`
- `a` opens the app locally in either the Android Studio emulator
- `w` opens the app locally in your browser

### iOS


## Development
You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Design
#### pin
- Authentication for local app (once account has been started - username given and uuid created)
- User's public key is encrypted with pin, securely stored locally `expo-secure-store`
- Create contacts with nfc. Use public key to encrypted shared public key. This is then stored locally.

#### public key
- Only used by this app
- encrypted with user's pin
- not stored unencrypted anywhere

#### shared public key
- encrypted by user's public key
- not stored unencrypted anywhere

#### message format
```
{
  createdAt: 1301090400,
  to: uuid,
  from: uuid,
  message: <encrypted data>
}
```

#### share format
```
{
  createdAt: 1301090400
  uuid: uuid
  username: username
  key: rsa public key
}
```

## TODO
[x] basic codebase and environment setup
[x] create initial form (username & pin)
[x] create initial form (pin)
[x] home form saves username (plain text & uuid)
[x] home form saves pin (secure)
[ ] basic auth for navigation (prevent navigating to any page other than without pin)
[ ] create rsa
[ ] encrypt rsa with user's pin and store securely
[ ] share public key via nfc (send username/uuid/public key && receive same)
[ ] create contacts list
[ ] create messaging server (send/receive)
[ ] display messages and sort by latest
[ ] display individual message thread
[ ] app settings (username, theme)