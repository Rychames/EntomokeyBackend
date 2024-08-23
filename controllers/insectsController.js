const db = require('../config/db');

exports.getAllInsects = (req, res) => {
  db.query('SELECT * FROM insetos', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.getInsectById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM insetos WHERE id = ?', [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Inseto não encontrado' });
    }
    res.json(rows[0]);
  });
};

exports.createInsect = (req, res) => {
  const { especie, numero_pernas, asas, cor, tamanho, habitat, padrao_de_voo, tipo_de_alimentacao, atividade_diaria, padrao_de_antenas } = req.body;
  const sql = `INSERT INTO insetos (especie, numero_pernas, asas, cor, tamanho, habitat, padrao_de_voo, tipo_de_alimentacao, atividade_diaria, padrao_de_antenas)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [especie, numero_pernas, asas, cor, tamanho, habitat, padrao_de_voo, tipo_de_alimentacao, atividade_diaria, padrao_de_antenas], 
    function(err, results) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId });
    });
};

exports.updateInsect = (req, res) => {
  const id = req.params.id;
  const { especie, numero_pernas, asas, cor, tamanho, habitat, padrao_de_voo, tipo_de_alimentacao, atividade_diaria, padrao_de_antenas } = req.body;
  const sql = `UPDATE insetos 
               SET especie = ?, numero_pernas = ?, asas = ?, cor = ?, tamanho = ?, habitat = ?, padrao_de_voo = ?, tipo_de_alimentacao = ?, atividade_diaria = ?, padrao_de_antenas = ? 
               WHERE id = ?`;
  db.query(sql, [especie, numero_pernas, asas, cor, tamanho, habitat, padrao_de_voo, tipo_de_alimentacao, atividade_diaria, padrao_de_antenas, id], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.sendStatus(200);
    });
};

exports.deleteInsect = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM insetos WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.sendStatus(204);
  });
};
