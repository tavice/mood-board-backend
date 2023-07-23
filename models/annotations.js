const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  moodboardId: { type: mongoose.Schema.Types.ObjectId, ref: 'MoodBoard' },
  content: String,
  position: {
    x: Number,
    y: Number
  }
});

const Annotation = mongoose.model('Annotation', annotationSchema);
module.exports = Annotation;
