const express = require('express');
const router = express.Router();
const MoodBoard = require('../models/moodboards.js');

// CREATE a new mood board
router.post('/', async (req, res) => {
  const newMoodBoard = new MoodBoard(req.body);
  try {
    const moodBoard = await newMoodBoard.save();
    res.status(200).send(moodBoard);
  } catch (err) {
    res.status(500).json({message: err.message});;
  }
});

// READ all mood boards
router.get('/', async (req, res) => {
  try {
    const moodBoards = await MoodBoard.find({});
    console.log('here is the moodBoards');
    res.status(200).send(moodBoards);
  } catch (err) {
    res.status(500).json({message: err.message});;
  }
});

// READ a specific mood board
router.get('/:id', async (req, res) => {
  try {
    const moodBoard = await MoodBoard.findById(req.params.id);
    res.status(200).send(moodBoard);
  } catch (err) {
    res.status(500).json({message: err.message});;
  }
});

// UPDATE a specific mood board
router.put('/:id', async (req, res) => {
  try {
    const moodBoard = await MoodBoard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(moodBoard);
  } catch (err) {
    res.status(500).json({message: err.message});;
  }
});

// DELETE a specific mood board
router.delete('/:id', async (req, res) => {
  try {
    const moodBoard = await MoodBoard.findByIdAndRemove(req.params.id);
    res.status(200).send(moodBoard);
  } catch (err) {
    res.status(500).json({message: err.message});;
  }
});

//export router
module.exports = router;