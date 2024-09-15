// storage/sqlite.js
import SQLite from 'react-native-sqlite-storage';

// Open or create a database
const db = SQLite.openDatabase(
  {
    name: 'contactsDatabase.db',
    location: 'default',
  },
  () => console.log('Database opened'),
  (error) => console.error('Error opening database', error)
);

// Create a table if it doesn't exist
export const createTable = () => { 
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, publicKey TEXT)',
      []
    );
  });
};

// Save the received contact (username and public key)
export const saveReceivedContact = (username, publicKey) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO contacts (username, publicKey) VALUES (?, ?)',
      [username, publicKey],
      (txObj, resultSet) => {
        console.log('Contact saved successfully');
      },
      (txObj, error) => {
        console.error('Error saving contact:', error);
      }
    );
  });
};