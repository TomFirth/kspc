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

// Save username
export const saveUser = (uuid: string, username: string) => {
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
export const getUser = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT username, uuid FROM users LIMIT 1',
      [],
      (tx, results) => {
        if (results.rows.length > 0) {
          const row = results.rows.item(0);
          return {
            username: row.username,
            uuid: row.uuid,
          };
        }
      },
      (error) => {
        throw new Error(error);
      }
    );
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