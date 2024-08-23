const db = require('../config/db');

const findUserByGoogleId = (googleId, callback) => {
  const sql = 'SELECT * FROM users WHERE google_id = ?';
  db.query(sql, [googleId], callback);
};

const createUser = (user, callback) => {
  const sql = 'INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)';
  db.query(sql, [user.googleId, user.name, user.email], callback);
};

module.exports = {
  findUserByGoogleId,
  createUser,
};
