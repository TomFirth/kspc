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
- Authentication for local app
- User public key is encrypted with pin
- Stored locally

#### public key
- Only used by this app
- encrypted with user's pin
- not stored unencrypted anywhere

#### shared public key
- encruypted by user's public key
- not stored unencrypted anywhere


## TODO
[x] basic codebase and environment setup
[x] create initial form (username & pin)
[ ] home form saves username (plain text & uuid) and pin (secure)
[ ] basic auth for tab navigation and pages (prevent navigating to any page other than without pin)
[ ] share public key via nfc (send username/uuid/public key && receive same)
[ ] encryption
[ ] create contacts list
[ ] create messaging server (send/receive)
[ ] display messages and sort by latest
[ ] display individual message thread
