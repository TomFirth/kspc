// storage/sqlite.js
import SQLite from 'react-native-sqlite-storage';

// Open or create a database
const db = SQLite.openDatabase(
  {
    name: 'userDatabase.db',
    location: 'default',
  },
  () => console.log('Database opened'),
  (error) => console.error('Error opening database', error)
);

// Create a table if it doesn't exist
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT);',
      [],
      () => console.log('Table created successfully'),
      (error) => console.error('Error creating table', error)
    );
  });

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

// Save username
export const saveUsername = (username) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO users (username) VALUES (?);',
      [username],
      () => console.log('Username saved successfully'),
      (error) => console.error('Error saving username', error)
    );
  });
};

// Get username
export const getUsername = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT username FROM users ORDER BY id DESC LIMIT 1;',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            const username = results.rows.item(0).username;
            console.log('Retrieved username:', username);
            resolve(username);
          } else {
            console.log('No username found');
            resolve(null);
          }
        },
        (error) => {
          console.error('Error retrieving username:', error);
          reject(error);
        }
      );
    });
  });
};

// Delete all usernames (optional)
export const deleteAllUsernames = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM users;',
      [],
      () => console.log('All usernames deleted successfully'),
      (error) => console.error('Error deleting usernames', error)
    );
  });
};
