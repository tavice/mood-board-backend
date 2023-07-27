const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['image', 'text'] },
    content: { type: String, required: true },
    position: {
      x: Number,
      y: Number
    },
    size: {
      width: Number,
      height: Number
    },
    rotation: Number
  });
  
  const moodBoardSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
  });

const MoodBoard = mongoose.model('MoodBoard', moodBoardSchema);
module.exports = MoodBoard;