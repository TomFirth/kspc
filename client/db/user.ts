import * as SQLite from 'expo-sqlite';

const dbName = 'kspc.db';
const db = SQLite.openDatabaseAsync(dbName);

export const createUserTable = () => {
  db.execAsync(`CREATE TABLE IF NOT EXISTS kspcUser (uuid TEXT PRIMARY KEY NOT NULL, username TEXT NOT NULL);`);
};

export const saveUser = async (uuid: string, username: string) => {
const db = SQLite.openDatabaseAsync(dbName);
  const result = await db.runAsync('INSERT INTO kspcUser (uuid, username) VALUES (?, ?)', uuid, username);
  console.log(result.lastInsertRowId, result.changes);
};

export const getUser = async () => {
  const row = await db.getFirstAsync('SELECT * FROM kspcUser');
  return { uuid: row.uuid, username: row.username }
}