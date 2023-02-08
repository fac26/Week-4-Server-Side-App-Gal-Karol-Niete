
-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS foods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dish_name TEXT,
    food_desc TEXT,
    user_id INTEGER REFERENCES uses(id),
    rating INTEGER,
    image_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

COMMIT;

-- Disable foreign key constraints
PRAGMA foreign_keys = OFF;
