import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const darkGrey = '#4D4D4D';
const lightGrey = '#B3B3B3';
const black = '#000000';

const darkGreen = '#25D366';
const lightGreen = '#B4D5C0';

const red = '#FF0000';

const warningColour = '#FF0000';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    height: height,
  },
  listMain: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    height: height
  },
  input: {
    backgroundColor: black,
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '80%',
    alignSelf: 'center',
  },
  pinInput: {
    backgroundColor: black,
    color: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    width: 45,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    backgroundColor: black,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  pressableDark: {
    width: '100%',
    padding: 15,
    backgroundColor: darkGreen,
    // alignItems: 'left',
    justifyContent: 'center',
  },
  pressable: {
    width: '100%',
    padding: 15,
    backgroundColor: lightGreen,
    // alignItems: 'left',
    justifyContent: 'center',
  },
  pressableText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: darkGreen,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  modalButtonRed: {
    width: '100%',
    padding: 15,
    backgroundColor: red,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: darkGreen,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  floatingButtonImage: {
    width: 30,
    height: 30,
  },
  deleteButton: {
    width: '100%',
    padding: 15,
    backgroundColor: warningColour,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  image_mobile: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    width: '100%'
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
    margin: 0,
    maxWidth: '100%',
    width: '100%',
  },
  messageContainer: {
    maxWidth: '100%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: darkGreen,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 10,
    marginTop: 5,
    color: '#000',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  settingsSelected: {
    width: width * 0.45, // 45% of screen width
    height: width * 0.45, // Square container
    backgroundColor: darkGrey, // Use the dark grey variable
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  settingsUnselected: {
    width: width * 0.45,
    height: width * 0.45,
    backgroundColor: lightGrey, // Use the light grey variable
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  settingsIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  noContactsText: {
    marginVertical: 10
  },
  lastMessageText: {}
});