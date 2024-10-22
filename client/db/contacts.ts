import * as SQLite from 'expo-sqlite';

import { getTimestamp } from '@/util/utilities';
import { RowType, UserType }  from '@/util/types';

const dbName = 'kspc.db';
const tableName = 'contacts';

export const createContactsTable = async () => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.execAsync(`CREATE TABLE IF NOT EXISTS ${tableName} (
    uuid TEXT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    key TEXT NOT NULL,
    read BOOLEAN NOT NULL,
    createAt DATETIME NOT NULL
  );`);
};

export const saveContact = async (uuid: string, username: string, key: string) => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.runAsync(`INSERT INTO ${tableName} (uuid, username, key, read, createAt) VALUES (?, ?, ?, ?, ?)`,
    [uuid, username, key, true, getTimestamp()]);
};

export const getContact = async (uuid: string): Promise<RowType> => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  const row = await db.getFirstAsync(`SELECT * FROM ${tableName} WHERE uuid = ?`, [ uuid ]) as RowType;
  return { uuid: row.uuid, username: row.username, key: row.key, read: row.read, createdAt: row.createdAt };
};

export const getAllContacts = async (): Promise<UserType[]> => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  const allRows = await db.getAllAsync(`SELECT * FROM ${tableName} ORDER BY username ASC`) as UserType[];
  let contacts: UserType[] = [];
  for (const row of allRows) {
    contacts.push({ uuid: row.uuid, username: row.username, read: row.read });
  }
  return contacts;
};

export const deleteContact = async (uuid: string) => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.runAsync(`DELETE FROM ${tableName} WHERE uuid = ?`, [uuid]);
};

export const deleteDB = async () => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.execAsync(`DROP TABLE IF EXISTS ${tableName};`);
};

export const updateContact = async (uuid: string, username: string) => {
  const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
  await db.runAsync(`UPDATE ${tableName} SET username = ? WHERE uuid = ?`,
    [username, uuid]);
};
