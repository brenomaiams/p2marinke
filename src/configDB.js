import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export async function openDb () {
  return open({
    filename: './database.db', 
    driver: sqlite3.Database
  });
}


export async function createTable() {
  openDb().then(async (db) => {
    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Pessoa (
        id INTEGER PRIMARY KEY,
        firstname TEXT,
        lastname TEXT,
        profession TEXT,
        balance REAL,
        type TEXT
      );
    `);

    
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Contract (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        profileId INTEGER,
        FOREIGN KEY (profileId) REFERENCES Pessoa (id)
      );
    `);
  });
}
export async function createJobTable() {
  openDb().then(async (db) => {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Job (
        id INTEGER PRIMARY KEY,
        description TEXT,
        operationdate TEXT,
        paymentdate TEXT,
        price REAL,
        paid BOOLEAN,
        contractId INTEGER,
        FOREIGN KEY (contractId) REFERENCES Contract(id)
      );
    `);
  });
}



