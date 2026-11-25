const express = require('express');
const router = express.Router();
const { dbSQLite } = require('../config/db');

// Leer usuarios
router.get('/', (req, res) => {
  try {
    const rows = dbSQLite.prepare('SELECT * FROM Users').all();
    res.status(200).json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Crear usuario
router.post('/', (req, res) => {
  const { name, email } = req.body;
  try {
    const info = dbSQLite.prepare('INSERT INTO Users (name, email) VALUES (?, ?)').run(name, email);
    res.status(201).json({ message: 'Usuario creado', id: Number(info.lastInsertRowid) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Actualizar usuario
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  try {
    dbSQLite.prepare('UPDATE Users SET name = ?, email = ? WHERE id = ?').run(name, email, req.params.id);
    res.status(200).json({ message: 'Usuario actualizado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
  try {
    dbSQLite.prepare('DELETE FROM Users WHERE id = ?').run(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;