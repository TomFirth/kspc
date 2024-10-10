import * as SQLite from 'expo-sqlite';

import { UserType }  from '@/util/types';

const dbName = 'kspc.db';
const tableName = 'user';

export const createUserTable = async () => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.execAsync(`CREATE TABLE IF NOT EXISTS ${tableName} (
    uuid TEXT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL
  );`);
};

export const saveUser = async (uuid: string, username: string) => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.runAsync(`INSERT INTO ${tableName} (uuid, username, theme) VALUES (?, ?, ?)`,
    [uuid, username, 'dark']);
};

export const getUser = async (): Promise<UserType> => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  const row = await db.getFirstAsync(`SELECT * FROM ${tableName}`) as UserType;
  console.log('user.ts', row);
  return { uuid: row.uuid, username: row.username }
};

export const deleteDB = async () => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.execAsync(`DROP TABLE IF EXISTS ${tableName};`);
};

export const updateUser = async (uuid: string, username: string, theme: string) => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.runAsync(`UPDATE ${tableName} SET username = ? AND SET theme = ? WHERE uuid = ?`,
    [username, theme, uuid]);
};
