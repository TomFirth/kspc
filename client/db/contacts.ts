import * as SQLite from 'expo-sqlite';

import { getTimestamp } from '@/util/utilities'

const dbName = 'kspc.db';
const tableName = 'contacts';


export const createContactsTable = async (): void => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.execAsync(`CREATE TABLE IF NOT EXISTS ${tableName} (
    uuid TEXT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    key TEXT NOT NULL,
    read BOOLEAN NOT NULL,
    createAT DATETIME NOT NULL
    );`);
};

export const saveContact = async (uuid: string, username: string): void => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.runAsync(`INSERT INTO ${tableName} (uuid, username, key, read, createAT) VALUES (?, ?, ?, ?, ?)`,
    [uuid, username, key, true, getTimestamp()]);
};

export const getContact = async () => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  const row = await db.getFirstAsync(`SELECT * FROM ${tableName}`);
  return { uuid: row.uuid, username: row.username, key, read, createdAt }
};

export const getAllContacts = async () => {
  const allRows = await result.getAllAsync();
  for (const row of allRows) {
    console.log(row.value, row.intValue);
  }
};

export const deleteDB = async (): void => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.execAsync(`DROP TABLE IF EXISTS ${tableName};`);
};

export const updateContact = async (uuid: string, username: string): void => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.runAsync(`UPDATE ${tableName} SET username = ? AND SET theme = ? WHERE uuid = ?`,
    [username, uuid]);
};
