const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Task = mongoose.model('Task', new mongoose.Schema({
  userId: { type: Number, required: true }, // ID del usuario en SQL Server
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
}));

// Leer tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Crear tarea
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(task);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;