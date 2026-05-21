import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'gununnotu.db', location: 'default' });
};

export const createTable = async (db) => {
  const query = `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      isCompleted INTEGER DEFAULT 0
  );`;
  await db.executeSql(query);
};

export const getNotes = async (db) => {
  const notes = [];
  const results = await db.executeSql(`SELECT * FROM notes ORDER BY id DESC`);
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      notes.push(result.rows.item(index));
    }
  });
  return notes;
};

export const addNote = async (db, content) => {
  const query = `INSERT INTO notes (content, isCompleted) VALUES (?, 0)`;
  await db.executeSql(query, [content]);
};

export const deleteNote = async (db, id) => {
  const query = `DELETE FROM notes WHERE id = ?`;
  await db.executeSql(query, [id]);
};

export const updateNoteContent = async (db, id, content) => {
  const query = `UPDATE notes SET content = ? WHERE id = ?`;
  await db.executeSql(query, [content, id]);
};

export const toggleNoteCompletion = async (db, id, currentStatus) => {
  const newStatus = currentStatus === 1 ? 0 : 1;
  const query = `UPDATE notes SET isCompleted = ? WHERE id = ?`;
  await db.executeSql(query, [newStatus, id]);
};