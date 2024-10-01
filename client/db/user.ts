import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';

const dbName = 'kspc.db';
const db = SQLite.openDatabaseAsync(dbName);

export const createUserTable = () => {
  db.execAsync(`CREATE TABLE IF NOT EXISTS kspcUser (uuid TEXT PRIMARY KEY NOT NULL, username TEXT NOT NULL);`);
  console.log('table created');
};

export const saveUser = async (uuid: string, username: string) => {
  const result = await db.runAsync(`INSERT INTO kspcUser (id, username) VALUES (?, ?)`,
    id, username);
  db.execAsync(
    `INSERT INTO kspcUser (id, username) VALUES (?, ?)`,
    [id, username],
    (txObj, resultSet) => {
      console.log('User inserted successfully');
      callback(id);
    },
    (txObj, error) => {
      console.error('Error inserting user', error);
    }
  );
};

export const getUser = async () => {
  const row = await db.getFirstAsync('SELECT * FROM kspcUser');
  console.log(row.uuid, row.username);
  return { uuid: row.uuid, username: row.username }
}