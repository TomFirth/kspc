import * as SQLite from 'expo-sqlite';

export const createUserTable = async () => {
  const db = await SQLite.openDatabaseAsync('kspc.db', { useNewConnection: true });
  await db.execAsync(`CREATE TABLE IF NOT EXISTS kspcUser (uuid TEXT PRIMARY KEY NOT NULL, username TEXT NOT NULL);`);
};

export const saveUser = async (uuid: string, username: string) => {
  const db = await SQLite.openDatabaseAsync('kspc.db', { useNewConnection: true });
  const result = await db.runAsync('INSERT INTO kspcUser (uuid, username) VALUES (?, ?)', uuid, username);
  console.log(result.lastInsertRowId, result.changes);
};

export const getUser = async () => {
  const db = await SQLite.openDatabaseAsync('kspc.db', { useNewConnection: true });
  const row = await db.getFirstAsync('SELECT * FROM kspcUser');
  return { uuid: row.uuid, username: row.username }
}