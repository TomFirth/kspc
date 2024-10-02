import * as SQLite from 'expo-sqlite';

const dbName = 'kspc.db';
const tableName = 'kspcUser';

export const createUserTable = async (): void => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.execAsync(`CREATE TABLE IF NOT EXISTS ${tableName} (uuid TEXT PRIMARY KEY NOT NULL, username TEXT NOT NULL);`);
};

export const saveUser = async (uuid: string, username: string): void => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.runAsync(`INSERT INTO ${tableName} (uuid, username) VALUES (?, ?)`, uuid, username);
};

export const getUser = async () => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  const row = await db.getFirstAsync(`SELECT * FROM ${tableName}`);
  return { uuid: row.uuid, username: row.username }
};

export const deleteDB = async (): void => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.execAsync(`DROP TABLE IF EXISTS ${tableName};`);
};