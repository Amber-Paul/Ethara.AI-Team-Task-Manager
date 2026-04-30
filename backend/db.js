const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'taskflow.db');

let _db;
let _wrapper;

async function initDb() {
  const sqlJs = await initSqlJs();
  
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    _db = new sqlJs.Database(fileBuffer);
  } else {
    _db = new sqlJs.Database();
  }

  _db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar_color TEXT DEFAULT '#6366f1',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      color TEXT DEFAULT '#6366f1',
      owner_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS project_members (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'member',
      joined_at TEXT DEFAULT (datetime('now')),
      UNIQUE(project_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'todo',
      priority TEXT NOT NULL DEFAULT 'medium',
      project_id TEXT NOT NULL,
      assignee_id TEXT,
      creator_id TEXT NOT NULL,
      due_date TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      task_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  _save();
  _wrapper = _makeWrapper();
  return _wrapper;
}

function _save() {
  if (!_db) return;
  try {
    const data = _db.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  } catch(e) { console.error('DB save error:', e.message); }
}

setInterval(_save, 3000);
process.on('exit', _save);

function _makeWrapper() {
  return {
    prepare: (sql) => ({
      run: (...params) => {
        _db.run(sql, params.flat());
        _save();
        return { changes: _db.getRowsModified() };
      },
      get: (...params) => {
        const stmt = _db.prepare(sql);
        stmt.bind(params.flat());
        if (stmt.step()) {
          const row = stmt.getAsObject();
          stmt.free();
          return row;
        }
        stmt.free();
        return undefined;
      },
      all: (...params) => {
        const results = [];
        const stmt = _db.prepare(sql);
        stmt.bind(params.flat());
        while (stmt.step()) results.push(stmt.getAsObject());
        stmt.free();
        return results;
      }
    }),
    exec: (sql) => {
      _db.run(sql);
      _save();
    }
  };
}

function getDb() {
  if (!_wrapper) throw new Error('DB not initialized');
  return _wrapper;
}

module.exports = { initDb, getDb };
