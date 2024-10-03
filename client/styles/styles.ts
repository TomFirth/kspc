import { Dimensions, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    height: Dimensions.get("window").height
  },
  listMain: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    height: Dimensions.get("window").height
  },
  input: {
    backgroundColor: 'black',
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
    backgroundColor: 'black',
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
    backgroundColor: 'black',
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
  pressable: {
    width: '100%',
    padding: 15,
    backgroundColor: '#25D366',
    alignItems: 'left',
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
    backgroundColor: '#25D366',
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
  text: {
    fontSize: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,  // Positioning from the bottom
    right: 30,   // Positioning from the right
    width: 60,   // Button size
    height: 60,
    backgroundColor: '#25D366',  // WhatsApp green color
    borderRadius: 30,  // Half of width and height for circular shape
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,  // Add shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },  // Add shadow on iOS
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  floatingButtonImage: {
    width: 30,  // Adjust size to fit inside the button
    height: 30,
  },
  deleteButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  image_mobile: {
    width: 200,  // Define image width
    height: 200, // Define image height
    resizeMode: 'contain', // Ensures the image fits within the dimensions
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
    backgroundColor: '#25D366', // Light green for user messages (WhatsApp style)
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF', // White for received messages
  },
  messageText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 10,
    marginTop: 5,
    color: '#888',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
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
  }
});