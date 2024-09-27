import SQLite from 'react-native-sqlite-storage';
// Open or create a database
const db = SQLite.openDatabase(
  {
    name: 'userDatabase.db',
    location: 'default',
  },
  () => console.log('Database opened'),
  (error: any) => console.error('Error opening database', error)
);
// Create a table if it doesn't exist
export const createTable = () => {
  db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: () => void, arg3: (error: any) => void) => void; }) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, uuid TEXT, username TEXT);',
      [],
      () => console.log('Table created successfully'),
      (error: any) => console.error('Error creating table', error)
    );
  });
  db.transaction((tx: { executeSql: (arg0: string, arg1: never[]) => void; }) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, uuid TEXT, username TEXT, publicKey TEXT)',
      []
    );
  });
};
// Save username
export const saveUser = (uuid: string, username: string) => {
  db.transaction((tx: { executeSql: (arg0: string, arg1: string[], arg2: (tx: any, results: any) => void, arg3: (error: any) => void) => void; }) => {
    tx.executeSql(
      'INSERT INTO users (uuid, username) VALUES (?, ?);',
      [uuid, username],
      (tx: any, results: { rowsAffected: number; }) => {
        if (results.rowsAffected > 0) {
          console.log('Success', `User saved with UUID: ${uuid}`);
        } else {
          console.error('Error', 'Failed to save user');
        }
      },
      (error: any) => console.error('Error saving username', error)
    );
  });
};
// Get username
export const getUser = () => {
  db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (tx: any, results: any) => { uuid: any; username: any; } | undefined, arg3: (error: any) => never) => void; }) => {
    tx.executeSql(
      'SELECT uuid, username FROM users LIMIT 1',
      [],
      (tx: any, results: { rows: { length: number; item: (arg0: number) => any; }; }) => {
        if (results.rows.length > 0) {
          const row = results.rows.item(0);
          return {
            uuid: row.uuid,
            username: row.username
          };
        }
      },
      (error: string | undefined) => {
        throw new Error(error);
      }
    );
  });
};
// Delete all usernames (optional)
export const deleteAllUsernames = () => {
  db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: () => void, arg3: (error: any) => void) => void; }) => {
    tx.executeSql(
      'DELETE FROM users;',
      [],
      () => console.log('All usernames deleted successfully'),
      (error: any) => console.error('Error deleting usernames', error)
    );
  });
};