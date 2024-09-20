import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
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
  }
});