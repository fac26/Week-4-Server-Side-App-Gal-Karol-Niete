const db = require('../database/db.js');

const insert_user = db.prepare(/*sql*/ `
  INSERT INTO users (username, email, hash)
  VALUES ($username, $email, $hash)
  RETURNING id
`);

function createUser(username, email, hash) {
  return insert_user.get({ username, email, hash });
}

const select_user_by_name = db.prepare(/*sql*/ `
  SELECT id, username, email, hash, created_at
  FROM users
  WHERE email = ?
`);

function getUserByEmail(email) {
  return select_user_by_name.get(email);
}

module.exports = { createUser, getUserByEmail };
