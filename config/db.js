const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',    // substitua com seu usuário MySQL
  password: 'root',  // substitua com sua senha MySQL
  database: 'insect_db'  // substitua com o nome do seu banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados MySQL.');
  }
});

module.exports = db;
