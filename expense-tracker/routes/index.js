
const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const authMiddleware = require('../middleware/auth');

router.post('/transactions',authMiddleware, async (req, res) => {
  const { type, category, amount, date, description } = req.body;
  try {
    const transaction = new Transaction({ type, category, amount, date, description });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/transactions/:id',authMiddleware,  async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/transactions/:id',authMiddleware,  async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/transactions/:id',authMiddleware,  async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    res.json({ totalIncome, totalExpense, balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/transactions',authMiddleware,  async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;

  try {
    const transactions = await Transaction.find().limit(limit).skip(skip);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
